import { Component, Input } from '@angular/core';

@Component({
    selector: 'dot',
    templateUrl: './dot.component.html',
    styleUrls: ['./dot.component.css'],
})
export class DotComponent {

    @Input() colorDot: string = '#000000';
    @Input() sizeDot: string = '5px';

}
