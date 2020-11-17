import { Component, Input } from '@angular/core';

@Component({
    selector: 'icon-response',
    templateUrl: './icon-response.component.html',
    styleUrls: ['./icon-response.component.css'],
})
export class IconResponseComponent {

    @Input() iconType: string = 'success';

}
