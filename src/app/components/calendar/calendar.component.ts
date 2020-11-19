import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
    selector: 'calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {

    @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

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
      },
      {
        label: '<i class="fas fa-fw fa-trash-alt"></i>',
        a11yLabel: 'Delete',
        onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter((iEvent) => iEvent !== event);
            this.handleEvent('Deleted', event);
        },
    }];

    public refresh: Subject<any> = new Subject();

    public events: CalendarEvent[] = [{
        start: subDays(startOfDay(new Date()), 1),
        end: addDays(new Date(), 1),
        title: 'A 3 day event',
        actions: this.actions,
        allDay: true,
        resizable: {
            beforeStart: true,
            afterEnd: true,
        },
        draggable: true,
    }]

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
        this.modalData = { event, action };
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
