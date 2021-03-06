import { Component, Input } from '@angular/core';

@Component({
    selector: 'input-button',
    templateUrl: './input-button.component.html',
    styleUrls: ['./input-button.component.css'],
})
export class InputButtonComponent {

    @Input() color: string = 'primary';
    @Input() disabled: boolean;
    @Input() loading: boolean;

    @Input() buttonIcon: string;
    @Input() buttonText: string;
    @Input() buttonType: string = 'button';

    @Input() tooltipText: string;

}
