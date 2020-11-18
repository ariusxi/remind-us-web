import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.css'],
})
export class TextComponent {

    @ViewChild("parent") children: ElementRef<HTMLElement>;

    @Input() className: string;
    @Input() tag: string = 'p';
    @Input() textValue: string;

}
