import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User } from 'src/app/models/User';
import { Category } from 'src/app/models/Category';
import { Reminder } from 'src/app/models/Reminder';

import Storage from 'src/app/utils/classes/Storage';

import { Paginate } from 'src/app/services/abstract.service';
import { CategoryService } from 'src/app/services/category.service';
import { ReminderService } from 'src/app/services/reminder.service';

import { ProfileDialogComponent } from './components/profile-dialog/profile-dialog.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public categoriesList: Paginate<Category>;
    public reminderList: Paginate<Reminder>;
    public reminderListOfWeek: Reminder[];

    public isLoadingCategory: boolean = true;
    public isLoadingReminder: boolean = true;
    public isLoadingReminderWeek: boolean = true;

    public userProfile: User = Storage.get('user');
    public userProfilePhoto: string;

    constructor(
        private route: Router,
        private dialog: MatDialog,
        private categoryService: CategoryService,
        private reminderService: ReminderService,
    ) {
        Object.assign(this, {
            userProfilePhoto: this.userProfile.photo && this.userProfile.photo !== '' ? `/assets/images/user-icons/${this.userProfile.photo}.png` : ``,
        });
    }

    async ngOnInit(): Promise<void> {
        await this.loadContent();
    }

    public async loadContent(): Promise<void> {
        await this.loadCategories();
        await this.loadReminders();
        await this.loadRemindersOfTheWeek();
    }

    public async loadCategories(): Promise<void> {
        this.isLoadingCategory = true;

        this.categoryService.getAll()
            .then((response) => {
                if (response.success) {
                    this.categoriesList = response.data;
                }
                this.isLoadingCategory = false;
            })
            .catch((err) => console.error(err))
    }

    public async loadReminders(): Promise<void> {
        this.isLoadingReminder = true;

        this.reminderService.getAll()
            .then((response) => {
                if (response.success) {
                    this.reminderList = response.data;
                }
                this.isLoadingReminder = false;
            })
            .catch((err) => console.error(err))
    }

    public async loadRemindersOfTheWeek(): Promise<void> {
        this.reminderService.getAllByPeriod(
            this.userProfile._id,
            'week',
        ).then((response) => {
            if (response.success) {
                this.reminderListOfWeek = response.data;
            }
            this.isLoadingReminderWeek = false;
        })
        .catch((err) => console.error(err))
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
            this.userProfilePhoto = this.userProfile.photo && this.userProfile.photo !== '' ? `/assets/images/user-icons/${this.userProfile.photo}.png` : ``;
        })
    }

    public logout(): void {
        // Limpando as informações de sessão
        Storage.clear();

        this.route.navigate(['/login']);
    }

}
