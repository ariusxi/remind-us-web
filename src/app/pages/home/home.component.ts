import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    @Output() onPageChange: EventEmitter<Object> = new EventEmitter();

    public buttonType: string = 'button';

    constructor() { }

    onChangeValue(props: Object): void {
        console.log(props);
    }

}
