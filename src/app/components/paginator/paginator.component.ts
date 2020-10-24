import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {

    @Output() onPageChange: EventEmitter<Object> = new EventEmitter();

    @Input() length: number;
    @Input() pageSize: number;
    @Input() pageSizeOptions: number[];

    onHandleChangePage(props: Object): void {
        this.onPageChange.emit(props);
    }

}
