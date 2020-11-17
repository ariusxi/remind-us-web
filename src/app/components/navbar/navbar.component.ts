import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    @Input() color: string;
    @Input() navbarText: string;
    @Input() hasToggleButton: boolean = false;

    @ViewChild("parent") children: ElementRef<HTMLElement>;

}
