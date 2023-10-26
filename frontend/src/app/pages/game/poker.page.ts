import { Component, OnInit } from '@angular/core';
import { getGroup, Group, isModerator } from '../../models/group';
import { ActivatedRoute, Router } from '@angular/router';
import {Card, EMPTY_STATE, EMPTY_STATE_NUMERIC, GET_CARD} from '../../models/card';
import { SocketService } from '../../services/socket.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { LOCAL_STORAGE_INDEX } from '../../models/localStorage.enum';

@Component({
  selector: 'app-poker-page',
  templateUrl: './poker.page.html',
  styleUrls: ['./poker.page.scss'],
})
export class PokerPage implements OnInit {
  private userName: string = '';
  private userList$!: Observable<User[]>;
  private hiddenState$!: Observable<boolean>;
  private accessDeniedMessage$!: Observable<string>;

  protected userGroup?: Group = undefined;
  protected currentList: User[] = [];
  protected user: User = { name: '', groupName: '', sort: EMPTY_STATE_NUMERIC };
  protected currentHiddenState: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem(LOCAL_STORAGE_INDEX.NAME) || '';
    let groupName: string =
      localStorage.getItem(LOCAL_STORAGE_INDEX.GROUP) || '';

    let card1: Card | undefined = GET_CARD(
      parseFloat(localStorage.getItem(LOCAL_STORAGE_INDEX.CARD1) || EMPTY_STATE)
    );
    let card2: Card | undefined = GET_CARD(
      parseFloat(localStorage.getItem(LOCAL_STORAGE_INDEX.CARD2) || EMPTY_STATE)
    );

    this.userGroup = getGroup(groupName);
    if (this.userGroup === undefined || this.userName === '') {
      this.quit();
      return;
    }

    this.user = {
      name: this.userName,
      groupName: groupName,
      card: card1 || undefined,
      cardEdited: card2 || undefined,
      sort: this.userGroup?.sortPoker ?? 0,
    };
    this.socketService.reconnect();

    this.userList$ = this.socketService.currentUserList;
    this.userList$.subscribe({
      next: (li: User[]) => {
        this.currentList = li;
        this.checkForReset();
      },
    });

    this.accessDeniedMessage$ = this.socketService.accessDeniedMessages;
    this.accessDeniedMessage$.subscribe({
      next: (message: string) => {
        alert('Zugang verweigert!\n' + message);
        this.quit();
      },
    });

    this.hiddenState$ = this.socketService.currentHiddenState;
    this.hiddenState$.subscribe({
      next: (state: boolean) => {
        this.currentHiddenState = state;
      },
    });

    this.socketService.update(this.user);
    this.socketService.sendHiddenStateRequest();
  }

  protected quit() {
    localStorage.removeItem(LOCAL_STORAGE_INDEX.NAME);
    localStorage.removeItem(LOCAL_STORAGE_INDEX.GROUP);
    localStorage.removeItem(LOCAL_STORAGE_INDEX.CARD1);
    localStorage.removeItem(LOCAL_STORAGE_INDEX.CARD2);
    this.socketService.closeSocket();
    this.router.navigate([''], { relativeTo: this.route });
  }

  protected selectCard($event: Card) {
    if (this.currentHiddenState) {
      this.user.card = $event;
      localStorage.setItem(LOCAL_STORAGE_INDEX.CARD1, '' + $event.sort);
    } else {
      this.user.cardEdited = $event;
      localStorage.setItem(LOCAL_STORAGE_INDEX.CARD2, '' + $event.sort);
    }
    this.socketService.update(this.user);
  }

  protected toggleHiddenState(): void {
    this.socketService.sendHiddenState(!this.currentHiddenState);
  }

  protected readonly isModerator = isModerator;

  private checkForReset(): void {
    const user: User | undefined = this.currentList.find(
      (val: User): boolean => {
        return val.name === this.userName;
      }
    );
    if (user === undefined) {
      return;
    }
    if (!user.card) {
      this.resetCard(false);
    }
    if (!user.cardEdited) {
      this.resetCard(true);
    }
  }

  resetCard(isSecond: boolean): void {
    if (isSecond) {
      this.user.cardEdited = undefined;
      localStorage.removeItem(LOCAL_STORAGE_INDEX.CARD2);
      return;
    }

    this.user.card = undefined;
    localStorage.removeItem(LOCAL_STORAGE_INDEX.CARD1);
  }
}
