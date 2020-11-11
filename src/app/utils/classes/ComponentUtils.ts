import { ValidationErrors } from '@angular/forms';

export class ComponentUtils {

    isAttributeExists(attribute: string | ValidationErrors): boolean {
        return attribute ? true : false;
    }

}
