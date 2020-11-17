import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Category } from 'src/app/models/Category';
import { Paginate } from 'src/app/services/abstract.service';
import { CategoryService } from 'src/app/services/category.service';

import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
    selector: 'categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit{

    public isLoading: boolean = true;
    public categoriesList: Paginate<Category>;

    public iconCategory: string ='/assets/images/icon-category.png';

    constructor(
        private categoryService: CategoryService,
        private dialog: MatDialog,
    ) { }


    async ngOnInit(): Promise<void> {
        this.categoryService.getAll()
            .then((response) => {
                if (response.success) {
                    this.categoriesList = response.data;
                }
                this.isLoading = false;
            })
            .catch((err) => console.error(err))

    }

    public showCategoryForm(): void {
        this.dialog.open(CategoryFormComponent, {
            data: {
                isNew: true,
            },
        });
    }

}
