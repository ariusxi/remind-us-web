import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent {

    @ViewChild("parent") children: ElementRef<HTMLElement>;

}
