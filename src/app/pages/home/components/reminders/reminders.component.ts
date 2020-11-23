import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Reminder } from 'src/app/models/Reminder';
import { Paginate } from 'src/app/services/abstract.service';
import { ReminderService } from 'src/app/services/reminder.service';

import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { ReminderRemoveComponent } from '../reminder-remove/reminder-remove.component';
@Component({
    selector: 'reminders',
    templateUrl: './reminders.component.html',
    styleUrls: ['./reminders.component.css'],
})
export class RemindersComponent {
    public isLoading: boolean = true;
    public reminderList: Paginate<Reminder>;

    public iconRemind: string ='/assets/images/iconRemind.png';

    constructor(
        private reminderService: ReminderService,
        private dialog: MatDialog,
       )  { }
       async ngOnInit(): Promise<void> {
        await this.loadReminders();
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

    public showReminderForm(): void {
        const createDialog = this.dialog.open(ReminderFormComponent, {
            data: {
                isNew: true,
            },
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
                categoryReminder: reminder.category,
            },
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
