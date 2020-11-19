import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent {

    @Input() alignTabs: string = 'start';

    @ViewChild("parent") children: ElementRef<HTMLElement>;

}
