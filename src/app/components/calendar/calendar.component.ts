import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';

import { Reminder } from 'src/app/models/Reminder';

@Component({
    selector: 'calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

    @Output() editReminder: EventEmitter<string> = new EventEmitter();
    @Output() removeReminder: EventEmitter<string> = new EventEmitter();

    @Input() eventReminders: Reminder[];

    public CalendarView = CalendarView;

    public view: CalendarView = CalendarView.Month;
    public viewDate: Date = new Date();
    public activeDayIsOpen: boolean = true;

    public modalData: {
        action: string;
        event: CalendarEvent;
    };

    public actions: CalendarEventAction[] = [{
        label: '<i class="fas fa-fw fa-pencil-alt"></i>',
        a11yLabel: 'Edit',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            this.handleEvent('Edited', event);
        },
    }, {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        a11yLabel: 'Delete',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            this.handleEvent('Deleted', event);
        },
    }];

    public refresh: Subject<any> = new Subject();

    public events: CalendarEvent[] = [];

    public dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || events.length === 0) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
            this.viewDate = date;
        }
    }

    ngOnInit(): void {
        this.events = this.eventReminders.map((currentReminder) => ({
            ...currentReminder,
            start: startOfDay(new Date(currentReminder.scheduled)),
            end: endOfDay(new Date(currentReminder.scheduled)),
            title: currentReminder.name,
            actions: this.actions,
        }));
    }

    public eventTimesChanged({ event, newStart, newEnd } : CalendarEventTimesChangedEvent) : void {
        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return ({
                    ...event,
                    start: newStart,
                    end: newEnd,
                });
            }
            return iEvent;
        })

        this.handleEvent('Dropped or resized', event);
    }

    public handleEvent(action: string, event: CalendarEvent): void {
        const actionMethodEvent = (methodType: string) => ({
            'Clicked': this.editReminder,
            'Edited': this.editReminder,
            'Deleted': this.removeReminder,
        })[methodType];

        actionMethodEvent(action).emit(event);
    }

    public addEvent(): void {
        this.events = [
            ...this.events,{
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                draggable: true,
                resizable: {
                  beforeStart: true,
                  afterEnd: true,
                },
            }
        ];
    }

    public deleteEvent(eventToDelete: CalendarEvent): void {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }

    public setView(view: CalendarView): void {
        this.view = view;
    }

    public closeOpenMonthViewDay(): void {
        this.activeDayIsOpen = false;
    }

}
