import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { getGroup, Group, isModerator } from '../../../../models/group';
import {Card, EMPTY_STATE_NUMERIC} from '../../../../models/card';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user!: User;
  @Input() hiddenState: boolean = true;

  protected group?: Group;
  protected card: Card = { sort: EMPTY_STATE_NUMERIC };
  protected card2?: Card = undefined;
  protected readonly isModerator = isModerator;

  ngOnInit(): void {
    this.group = getGroup(this.user.groupName);
    this.card = this.user.card ?? { sort: EMPTY_STATE_NUMERIC };
    this.card2 = this.user.cardEdited;
  }
}
