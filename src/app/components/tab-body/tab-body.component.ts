import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'tab-body',
    templateUrl: './tab-body.component.html',
    styleUrls: ['./tab-body.component.css'],
})
export class TabBodyComponent {

    @Input() labelText: string;

    @ViewChild("parent") children: ElementRef<HTMLElement>;

}
