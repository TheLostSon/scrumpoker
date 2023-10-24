import { Component, EventEmitter, Output } from '@angular/core';
import { Group, GROUPS } from '../../../models/group';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
  @Output() groupSelected: EventEmitter<string> = new EventEmitter<string>();

  protected readonly groups: Array<Group> = GROUPS.sort(
    (value1: Group, value2: Group) => (value1.sort > value2.sort ? 1 : -1)
  );

  onClick(groupName: string): void {
    this.groupSelected.emit(groupName);
  }
}
