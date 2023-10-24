import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LOCAL_STORAGE_INDEX } from '../../models/localStorage.enum';

@Component({
  selector: 'app-user-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public username?: string;
  public selectedGroup?: string;

  public formGroup = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
    }),
  });

  constructor(private route: ActivatedRoute, private router: Router) {}

  public submit(): void {
    this.username = this.formGroup.value.name ?? undefined;
    if (this.username === undefined || this.selectedGroup === undefined) {
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_INDEX.NAME, this.username);
    localStorage.setItem(LOCAL_STORAGE_INDEX.GROUP, this.selectedGroup);
    this.router.navigate(['poker'], { relativeTo: this.route });
  }

  public onGroupSelected(groupName: string): void {
    this.selectedGroup = groupName;
  }
}
