import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    public title: string = 'remind-us';

    constructor(
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute,
    ) {}

    setDocTitle(title: string): void {
        this.titleService.setTitle(title);
    }

    ngOnInit() {
        const appTitle = this.titleService.getTitle();
        this.router.events.pipe(filter(event => event instanceof NavigationEnd), map(() => {
            let child = this.activatedRoute.firstChild;
            while (child.firstChild) {
                child = child.firstChild;
            }
            if (child.snapshot.data['title']) {
                return child.snapshot.data['title'];
            }
            return appTitle;
        })).subscribe((ttl: string) => {
            this.titleService.setTitle(ttl);
        });
    }

}
