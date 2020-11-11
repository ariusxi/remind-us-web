import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ComponentUtils } from 'src/app/utils/classes/ComponentUtils';
import { NonValidInput } from 'src/app/utils/classes/Validator';

interface SelectOption {
    label: string;
    value: string;
}

@Component({
    selector: 'input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.css'],
})
export class InputFieldComponent extends ComponentUtils {

    @Output() onChangeValue: EventEmitter<string> = new EventEmitter();

    @Input() labelText: string;
    @Input() placeholderText: string;
    @Input() isRequired: boolean = false;

    @Input() errorField: NonValidInput;
    @Input() hintText: string;
    @Input() hintPosition: string = 'start';

    @Input() inputName: string;
    @Input() inputType: string = 'text';
    @Input() options: SelectOption[];
    @Input() inputValue: string = '';
    @Input() className: string;

    @Input() iconType: string;
    @Input() disabled: boolean;

    public onChangeInput(): void {
        this.onChangeValue.emit(this.inputValue);
    }

    public isInputType(): boolean {
        return ['text', 'number', 'email', 'telephone', 'password', 'date'].includes(this.inputType);
    }

    public isTextArea(): boolean {
        return this.inputType === 'textarea';
    }

    public isSelect(): boolean {
        return this.inputType === 'select';
    }

}
