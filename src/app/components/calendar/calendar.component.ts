import { Component, Input } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

export interface EventDay {
    title: string;
    date: string;
}

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {

    @Input() eventDays: EventDay[];
    @Input() initialView: string = 'dayGridMonth';
    @Input() dayMaxEvents: boolean = false;

    public calendarOptions: CalendarOptions;

    constructor() {
        Object.assign(this, {
            calendarOptions: {
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                },
                initialView: this.initialView,
                dayMaxEvents: this.dayMaxEvents,
                events: this.eventDays,
                handleWindowResize: true,
                weekends: true,
                editable: true,
                selectable: true,
                selectMirror: true,
            },
        });
    }

}
