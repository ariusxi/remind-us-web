import { Component, OnInit } from '@angular/core';

import { Reminder } from 'src/app/models/Reminder';

import { ReminderService } from 'src/app/services/reminder.service';

@Component({
    selector: 'schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit{

    public reminderList: Reminder[];

    constructor(
        public reminderService: ReminderService,
    ) {}

    ngOnInit(): void {
        this.getAllReminders();
    }

    getAllReminders(): void {
        this.reminderService.getAll()
            .then((response) => {
                if (response.success) {
                    // Caso tenha algum lembrete do usuário, ele deverá adicionar ao array
                    this.reminderList = response.data.docs;
                }
            }).catch((error) => console.error(error));
    }

}
