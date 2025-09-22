// is-unique.validator.ts
import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from "class-validator";
import { ModelCtor, Sequelize } from "sequelize-typescript";

@ValidatorConstraint({ name: "isUnique", async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly sequelize: Sequelize) {}

    async validate(value: any, args: ValidationArguments) {
        if (value) {
            const [columnName, modelClass] = args.constraints;
            const count = await modelClass.count({ where: { [columnName]: value } });
            return count === 0;
        }
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        const [columnName, modelClass] = args.constraints;
        return `${columnName} must be unique in ${modelClass.name}.`;
    }
}

export function IsUnique(columnName: string, modelClass: ModelCtor, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [columnName, modelClass],
            validator: IsUniqueConstraint,
        });
    };
}
