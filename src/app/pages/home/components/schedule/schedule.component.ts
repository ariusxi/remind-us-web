import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Reminder } from 'src/app/models/Reminder';
import { Paginate } from 'src/app/services/abstract.service';

import { ReminderService } from 'src/app/services/reminder.service';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { ReminderRemoveComponent } from '../reminder-remove/reminder-remove.component';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {

    @Output() loadContent: EventEmitter<string> = new EventEmitter();

    @Input() isLoading: boolean = true;
    @Input() reminderList: Reminder[];

    constructor(
        public reminderService: ReminderService,
        public dialog: MatDialog,
    ) {
        console.log(this);
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
            this.loadContent.emit();
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
            this.loadContent.emit();
        });
    }

}
