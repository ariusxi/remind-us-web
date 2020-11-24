import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from 'src/app/models/User';
import { Reminder } from 'src/app/models/Reminder';

import { Paginate } from 'src/app/services/abstract.service';
import { ReminderService } from 'src/app/services/reminder.service';

import Storage from 'src/app/utils/classes/Storage';

import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { ReminderRemoveComponent } from '../reminder-remove/reminder-remove.component';
@Component({
    selector: 'reminders',
    templateUrl: './reminders.component.html',
    styleUrls: ['./reminders.component.css'],
})
export class RemindersComponent implements OnInit{

    public userProfile: User = Storage.get('user');

    public isLoading: boolean = true;
    public reminderList: Paginate<Reminder>;
    public reminderListOfWeek: Reminder[];

    public iconRemind: string ='/assets/images/iconRemind.png';

    constructor(
        private reminderService: ReminderService,
        private dialog: MatDialog,
    ) { }

    async ngOnInit(): Promise<void> {
        await this.loadReminders();
        await this.loadRemindersOfTheWeek();
    }

    public async loadReminders(): Promise<void> {
        this.reminderService.getAll()
            .then((response) => {
                if (response.success) {
                    this.reminderList = response.data;
                }
                this.isLoading = false;
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
            this.isLoading = false;
        })
        .catch((err) => console.error(err))
    }

    public showReminderForm(): void {
        const createDialog = this.dialog.open(ReminderFormComponent, {
            data: {
                isNew: true,
            },
            panelClass: 'my-dialog',
        });

        createDialog.afterClosed().subscribe(async () => {
            await this.loadReminders();
        });
    }

    public editReminder(reminder: Reminder): void {
        const editDialog = this.dialog.open(ReminderFormComponent, {
            data: {
                isNew: false,
                idReminder: reminder._id,
                nameReminder: reminder.name,
                scheduledReminder: reminder.scheduled,
                descriptionReminder: reminder.description,
                categoryReminder: reminder.category._id,
            },
            panelClass: 'my-dialog',
        });

        editDialog.afterClosed().subscribe(async () => {
            await this.loadReminders();
        })
    }

    public removeReminder(reminder: Reminder): void {
        const removeDialog = this.dialog.open(ReminderRemoveComponent, {
            data: {
                idReminder: reminder._id,
                nameReminder: reminder.name,
            },
        });

        removeDialog.afterClosed().subscribe(async () => {
            await this.loadReminders();
        })
    }

}
