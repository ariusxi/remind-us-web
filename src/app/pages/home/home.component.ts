import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/User';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

    @Output() onPageChange: EventEmitter<Object> = new EventEmitter();

    public buttonType: string = 'button';

    constructor(
        private userService: UserService,
    ) { }

    async ngOnInit() {

    }

    onChangeValue(props: Object): void {
        console.log(props);
    }

}
