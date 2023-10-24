import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';
import { debounceTime, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public currentUserList: Observable<Array<User>> = this.socket.fromEvent('userlist');

  public currentHiddenState: Observable<boolean> =
    this.socket.fromEvent('hiddenState');

  public accessDeniedMessages: Observable<string> =
    this.socket.fromEvent('denyAccess');

  private updateSender: Subject<User> = new Subject();

  public constructor(private socket: Socket) {
    this.updateSender.pipe(debounceTime(250)).subscribe((value: User): void => {
      this.socket.emit('update', value);
    });
  }

  public update(user: User): void {
    this.updateSender.next(user);
  }

  public sendHiddenState(newState: boolean): void {
    this.socket.emit('changeHiddenState', newState);
  }

  sendHiddenStateRequest(): void {
    this.socket.emit('requestHiddenState');
  }

  closeSocket(): void {
    this.socket.disconnect();
  }

  reconnect(): void {
    this.socket.connect();
  }
}
