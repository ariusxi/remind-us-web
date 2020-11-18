import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'category-remove',
    templateUrl: './category-remove.component.html',
    styleUrls: ['./category-remove.component.css'],
})
export class CategoryRemoveComponent {

    // Category
    public idCategory: string;
    public titleCategory: string;

    public currentIconType: string = 'success';
    public isResponseEnabled: boolean = false;
    public responseLoadingCategory: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<any>,
        public categoryService: CategoryService,
    ) {
        Object.assign(this, {
            idCategory: data.idCategory,
            titleCategory: data.titleCategory,
            refreshCategories: data.refreshCategories,
        });
    }

    public async removeCategory(): Promise<void> {
        // Habilitando loading no botão de remoção
        this.responseLoadingCategory = true;

        this.categoryService.delete(this.idCategory)
            .then((response) => {
                if (response.success) {
                    // Definindo a resposta da requisição
                    this.currentIconType = 'success';

                    // Alternando a aba de resposta
                    this.toggleResponse();
                }
            }).catch((error) => Object.assign({
                errorMessage: error,
                currentIconType: 'failure',
                responseLoadingCategory: false,
            }));
    }

    public toggleResponse(): void {
        this.isResponseEnabled = !this.isResponseEnabled;
    }

    public closeRemoveCategory(): void {
        this.dialogRef.close();
    }

}
