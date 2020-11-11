import { Component, Input } from '@angular/core';

@Component({
    selector: 'text',
    templateUrl: './text.component.html',
    styleUrls: ['./text.component.css'],
})
export class TextComponent {

    @Input() className: string;
    @Input() tag: string = 'p';
    @Input() textValue: string;

}
