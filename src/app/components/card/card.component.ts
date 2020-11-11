import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent {

    @Input() className: string;

    @ViewChild("parent") children: ElementRef<HTMLElement>;

}
