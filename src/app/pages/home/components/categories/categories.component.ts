import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Category } from 'src/app/models/Category';
import { Paginate } from 'src/app/services/abstract.service';
import { CategoryService } from 'src/app/services/category.service';

import { CategoryFormComponent } from '../category-form/category-form.component';
import { CategoryRemoveComponent } from '../category-remove/category-remove.component';

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
        await this.loadCategories();
    }

    public async loadCategories(): Promise<void> {
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
        const createDialog = this.dialog.open(CategoryFormComponent, {
            data: {
                isNew: true,
            },
            panelClass: 'my-dialog',
        });

        createDialog.afterClosed().subscribe(async () => {
            await this.loadCategories();
        });
    }

    public editCategory(category: Category): void {
        const editDialog = this.dialog.open(CategoryFormComponent, {
            data: {
                isNew: false,
                idCategory: category._id,
                titleCategory: category.title,
                colorCategory: category.color,
                descriptionCategory: category.description,
            },
            panelClass: 'my-dialog',
        });

        editDialog.afterClosed().subscribe(async () => {
            await this.loadCategories();
        })
    }

    public removeCategory(category: Category): void {
        const removeDialog = this.dialog.open(CategoryRemoveComponent, {
            data: {
                idCategory: category._id,
                titleCategory: category.title,
            },
        });

        removeDialog.afterClosed().subscribe(async () => {
            await this.loadCategories();
        })
    }

}
