import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Reminder } from 'src/app/models/Reminder';

import { ReminderService } from 'src/app/services/reminder.service';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { ReminderRemoveComponent } from '../reminder-remove/reminder-remove.component';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit{

    public isLoadingCalendar: boolean = true;

    public reminderList: Reminder[] = [];

    constructor(
        public reminderService: ReminderService,
        public dialog: MatDialog,
    ) {}

    async ngOnInit(): Promise<void> {
        await this.getAllReminders();
    }

    async getAllReminders(): Promise<void> {
        this.isLoadingCalendar = true;

        this.reminderService.getAll()
            .then((response) => {
                if (response.success) {
                    // Caso tenha algum lembrete do usuário, ele deverá adicionar ao array
                    this.reminderList = response.data.docs;
                }
                this.isLoadingCalendar = false;
            }).catch((error) => console.error(error));
    }

    editReminder(props: Reminder): void {
        const editDialog = this.dialog.open(ReminderFormComponent, {
            data: {
                isNew: false,
                idReminder: props._id,
                nameReminder: props.name,
                scheduledReminder: props.scheduled,
                descriptionReminder: props.description,
                categoryReminder: props.category ? props.category._id : '',
            },
            panelClass: 'my-dialog',
        });

        editDialog.afterClosed().subscribe(async () => {
            await this.getAllReminders();
        });
    }

    removeReminder(props: Reminder): void {
        const removeDialog = this.dialog.open(ReminderRemoveComponent, {
            data: {
                idReminder: props._id,
                nameReminder: props.name,
            },
        })

        removeDialog.afterClosed().subscribe(async () => {
            await this.getAllReminders();
        });
    }

}
