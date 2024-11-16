import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsNumberOrIsNumberString(validationOptions?: ValidationOptions) {
    return function (Object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsNumberOrIsNumberString',
            target: Object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    //verifica se é um numero ou uma string que pode ser convertida em número
                    return typeof value === 'number' || (!isNaN(value) && typeof value === 'string');
                },
                defaultMessage(args: ValidationArguments) {
                    return `O valor de ${args.property} deve ser um número ou uma string que represente um número`
                }
            }

        });
    }
}
