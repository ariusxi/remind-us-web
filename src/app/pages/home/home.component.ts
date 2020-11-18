import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User } from 'src/app/models/User';
import Storage from 'src/app/utils/classes/Storage';

import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    public userProfile: User = Storage.get('user');

    constructor(
        private route: Router,
        private dialog: MatDialog,
    ) {}

    public getFirstName(): string {
        return this.userProfile.name.split(" ")[0];
    }

    public showProfile(): void {
        this.dialog.open(ProfileDialogComponent);
    }

    public logout(): void {
        // Limpando as informações de sessão
        Storage.clear();

        this.route.navigate(['/login']);
    }

}
