import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.css'],
})
export class CheckboxComponent {

    @Output() onChangeValue: EventEmitter<string> = new EventEmitter();
    @Output() onIndeterminate: EventEmitter<string> = new EventEmitter();

    @Input() disabled: boolean;
    @Input() labelPosition: string = 'after';
    @Input() checkboxText: string;

    public inputValue: string = '';
    public indeterminate: boolean = false;

    public onChangeInput($event): void {
        this.onChangeValue.emit($event.checked);
    }

    public onIndeterminateChange($event): void {
        this.onIndeterminate.emit($event.indeterminate);
    }

}
