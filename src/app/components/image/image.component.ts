import { Component, Input } from '@angular/core';

@Component({
    selector: 'image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css'],
})
export class ImageComponent{

    @Input() className: string;
    @Input() url: string;

}
