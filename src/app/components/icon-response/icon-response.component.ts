import { Component, Input } from '@angular/core';

@Component({
    selector: 'icon-response',
    templateUrl: './icon-response.component.html',
    styleUrls: [
        './icon-response-classes.component.css',
        './icon-response-classes-2.component.css',
        './icon-response-classes-3.component.css',
        './icon-response-classes-4.component.css',
    ],
})
export class IconResponseComponent {

    @Input() iconType: string = 'success';

}
