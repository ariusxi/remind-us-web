import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit{

    @Input() alignTabs: string = 'start';

    @ViewChild("parent") children: ElementRef<HTMLElement>;

    ngOnInit(): void {
        console.log(this.alignTabs)
        console.log(this.children)
    }

}
