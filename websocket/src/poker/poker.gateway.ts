import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { User } from '../models/user';
import { debounceTime, Subject } from 'rxjs';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
    credentials: false
  }
})
export class PokerGateway
  implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;
  private userMap: Map<String, User> = new Map<String, User>();
  private hidden: boolean = true;
  private listUpdater: Subject<Map<String, User>> = new Subject();

  public onModuleInit(): void {
    this.listUpdater
      .pipe(debounceTime(500))
      .subscribe((value: Map<String, User>) => this.broadcastList(value));
  }

  @SubscribeMessage('requestHiddenState')
  handleRequestHiddenState(
    @MessageBody() data: User,
    @ConnectedSocket() client: Socket
  ): void {
    client.emit('hiddenState', this.hidden);
  }

  @SubscribeMessage('update')
  handleUpdate(
    @MessageBody() data: User,
    @ConnectedSocket() client: Socket
  ): void {
    if (!this.userMap.has(client.id)) {
      if (this.checkName(data.name)) {
        client.emit('denyAccess', 'duplicate Name');
        return;
      }
    }
    this.userMap.set(client.id, data);
    this.listUpdater.next(this.userMap);
  }

  @SubscribeMessage('changeHiddenState')
  handleHiddenChange(
    @MessageBody() data: boolean,
    @ConnectedSocket() client: Socket
  ): void {
    this.hidden = data;
    this.broadcastHiddenState();
    if (this.hidden) {
      this.resetCards();
    }
  }

  handleConnection(@ConnectedSocket() client: Socket): void {}

  handleDisconnect(client: Socket): void {
    if (!this.userMap.has(client.id)) {
      return;
    }
    this.userMap.delete(client.id);
    this.listUpdater.next(this.userMap);
  }

  private broadcastList(list: Map<String, User>): void {
    this.server.emit(
      'userlist',
      Array.from(list.values()).sort((user1: User, user2: User): number =>
        this.compareUsers(user1, user2)
      )
    );
  }

  private broadcastHiddenState(): void {
    this.server.emit('hiddenState', this.hidden);
    this.listUpdater.next(this.userMap);
  }

  private resetCards() {
    this.userMap.forEach((user: User) => {
      user.card = undefined;
      user.cardEdited = undefined;
    });
    this.listUpdater.next(this.userMap);
  }

  private compareUsers(value1: User, value2: User): 1 | -1 {
    const card1: number = value1.card?.sort ?? -10;
    const card2: number = value2.card?.sort ?? -10;
    const cardEdited1: number = value1.cardEdited?.sort ?? card1;
    const cardEdited2: number = value2.cardEdited?.sort ?? card2;

    if (cardEdited1 < cardEdited2) {
      return -1;
    }
    if (cardEdited1 > cardEdited2) {
      return 1;
    }
    if (value1.sort < value2.sort) {
      return -1;
    }
    if (value1.sort > value2.sort) {
      return 1;
    }
    if (value1.name <= value2.name) {
      return -1;
    }
    return 1;
  }

  private checkName(name: string): boolean {
    return (
      Array.from(this.userMap.values()).findIndex((user: User): boolean => {
        return user.name === name;
      }) >= 0
    );
  }
}
