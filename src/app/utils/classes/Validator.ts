'use strict'

export interface InputField {
    inputName: string;
    inputValue: string;
    compare?: string;
    min?: number;
    max?: number;
    functions: string[];
}

export interface FieldProperty {
    required?: boolean;
    compare?: boolean;
    minLength?: LengthProperty;
    maxLength?: LengthProperty;
}

export interface LengthProperty {
    requiredLength: number;
    actualLength: number;
}

export interface NonValidInput {
    fieldName: string;
    fieldProperty: FieldProperty;
}

export interface ResultValidator {
    isValid: boolean;
    nonValidFields: NonValidInput[];
}

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


export class Validator {

    private fieldsGroup: InputField[] = [];
    private errorsFields: NonValidInput[] = [];

    constructor(fieldsGroup: InputField[]) {
        Object.assign(this, {
            fieldsGroup,
        });
    }

    isEmptyInputValue(value: string): boolean {
        return value == null || value.length === 0;
    }

    hasValidLength({inputValue}): boolean {
        return inputValue !== null && typeof inputValue.length === 'number';
    }

    required({inputValue}): object {
        return this.isEmptyInputValue(inputValue) ? { required: true } : null;
    }

    compare({inputValue, compare}): object {
        if (this.isEmptyInputValue(inputValue)) {
            return { compare: true };
        }
        return inputValue === compare ? null : { compare: true };
    }

    requiredTrue({inputValue}): object {
        return inputValue === true ? null : { required: true };
    }

    email({inputValue}): object {
        if (this.isEmptyInputValue(inputValue)) {
            return { email: true };
        }
        return EMAIL_REGEXP.test(inputValue) ? null : { email: true };
    }

    minLength({inputValue, min}): FieldProperty {
        if (this.isEmptyInputValue(inputValue) || !this.hasValidLength(inputValue)) {
            return null;
        }
        return inputValue.length < min ?
            { minLength: { requiredLength: min, actualLength: inputValue.length } } :
            null;
    }

    maxLength({inputValue, max}): object {
        return this.hasValidLength(inputValue) && inputValue.length > max ?
            { maxLength: { requiredLength: max, actualLength: inputValue.length } } :
            null;
    }

    hasError(inputName: string): NonValidInput {
        return this.errorsFields.find((currentError) => currentError.fieldName === inputName);
    }

    validate(): ResultValidator {
        let validate: ResultValidator = {
            isValid: true,
            nonValidFields: [],
        };

        // Validando todos os campos enviados
        this.fieldsGroup.forEach((currentField) => {
            currentField.functions.forEach((currentFunction) => {
                // Validando a operação atual e se ela já existe na pilha de erros
                const fieldProperty = this[currentFunction](currentField);
                const fieldErrorIndex = validate.nonValidFields.findIndex((currentErrorField) =>
                    currentErrorField.fieldName === currentField.inputName
                )

                // Caso o erro não exista na pilha, ele será adicionado
                if (fieldProperty && fieldErrorIndex === -1) {
                    validate.nonValidFields.push({
                        fieldName: currentField.inputName,
                        fieldProperty,
                    });
                }

                // Caso o erro já esteja empilhado ele só irá concatenar
                if (fieldErrorIndex !== -1) {
                    validate.nonValidFields[fieldErrorIndex].fieldProperty = {
                        ...validate.nonValidFields[fieldErrorIndex].fieldProperty,
                        ...fieldProperty,
                    }
                }
            });
        });

        // Adicionado ao cache de lista de erros
        this.errorsFields = validate.nonValidFields;

        return ({
            ...validate,
            isValid: validate.nonValidFields.length > 0 ? false : true,
        })
    }

}
