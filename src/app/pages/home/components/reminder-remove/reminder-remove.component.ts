import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ReminderService } from 'src/app/services/reminder.service';

@Component({
    selector: 'reminder-remove',
    templateUrl: './reminder-remove.component.html',
    styleUrls: ['./reminder-remove.component.css'],
})
export class ReminderRemoveComponent {

    // Category
    public idReminder: string;
    public nameReminder: string;

    public currentIconType: string = 'success';
    public isResponseEnabled: boolean = false;
    public responseLoadingReminder: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<any>,
        public reminderService: ReminderService,
    ) {
        Object.assign(this, {
            idReminder: data.idReminder,
            nameReminder: data.nameReminder,
        });
    }

    public async removeReminder(): Promise<void> {
        // Habilitando loading no botão de remoção
        this.responseLoadingReminder = true;

        this.reminderService.delete(this.idReminder)
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
                responseLoadingReminder: false,
            }));
    }

    public toggleResponse(): void {
        this.isResponseEnabled = !this.isResponseEnabled;
    }

    public closeRemoveReminder(): void {
        this.dialogRef.close();
    }

}
