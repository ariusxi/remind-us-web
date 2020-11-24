import { format, addHours } from 'date-fns';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class RemindersComponent {

    @Output() loadContent: EventEmitter<string> = new EventEmitter();

    @Input() isLoading: boolean = true;
    @Input() reminderList: Paginate<Reminder>;
    @Input() reminderListOfWeek: Reminder[];

    public userProfile: User = Storage.get('user');

    public iconRemind: string ='/assets/images/iconRemind.png';

    constructor(
        private dialog: MatDialog,
    ) { }

    public detectUrL(textString: string): string {
        let retVal = textString;
        if (retVal) {
            const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            retVal = textString.replace(urlRegex, (url) => {
                return `<a href="${url}" target="_blank" class="url-reminder">${url}</a>`;
            })
        }

        return retVal;
    }

    public formatDateTime(dateString: string): string {
        return format(addHours(new Date(dateString), 3), 'dd/MM/yyyy HH:ii:ss');
    }

    public showReminderForm(): void {
        const createDialog = this.dialog.open(ReminderFormComponent, {
            data: {
                isNew: true,
            },
            panelClass: 'my-dialog',
        });

        createDialog.afterClosed().subscribe(() => {
            this.loadContent.emit();
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
                categoryReminder: reminder.category ? reminder.category._id : '',
            },
            panelClass: 'my-dialog',
        });

        editDialog.afterClosed().subscribe(() => {
            this.loadContent.emit();
        })
    }

    public removeReminder(reminder: Reminder): void {
        const removeDialog = this.dialog.open(ReminderRemoveComponent, {
            data: {
                idReminder: reminder._id,
                nameReminder: reminder.name,
            },
        });

        removeDialog.afterClosed().subscribe(() => {
            this.loadContent.emit();
        })
    }

}
