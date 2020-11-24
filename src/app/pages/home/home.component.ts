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
    public userProfilePhoto: string;

    constructor(
        private route: Router,
        private dialog: MatDialog,
    ) {
        Object.assign(this, {
            userProfilePhoto: this.userProfile.photo && this.userProfile.photo !== '' ? `/assets/images/user-icons/${this.userProfile.photo}.png` : ``,
        });
    }

    public getFirstName(): string {
        return this.userProfile.name.split(" ")[0];
    }

    public showProfile(): void {
        const profileDialog = this.dialog.open(ProfileDialogComponent, {
            panelClass: 'my-dialog',
            width: '750px',
        });

        profileDialog.afterClosed().subscribe(() => {
            this.userProfile = Storage.get('user');
            this.userProfilePhoto = this.userProfile.photo !== '' ? `/assets/images/user-icons/${this.userProfile.photo}.png` : ``;
        })
    }

    public logout(): void {
        // Limpando as informações de sessão
        Storage.clear();

        this.route.navigate(['/login']);
    }

}
