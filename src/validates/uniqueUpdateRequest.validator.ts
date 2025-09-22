// is-unique.validator.ts
import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from "class-validator";
import { Op } from "sequelize";
import { ModelCtor, Sequelize } from "sequelize-typescript";

@ValidatorConstraint({ name: "IsUniqueUpdateRequest", async: true })
export class IsUniqueUpdateRequestConstraint implements ValidatorConstraintInterface {
    constructor(private readonly sequelize: Sequelize) {}

    async validate(value: any, args: ValidationArguments) {
        const [columnName, modelClass] = args.constraints;
        const { id: pId } = args.object?.["requestContext"];
        if (!pId) {
            return false;
        }
        const count = await modelClass.count({ where: { [columnName]: value, id: { [Op.ne]: pId } } });
        return count === 0;
    }

    defaultMessage(args: ValidationArguments) {
        const [columnName, modelClass] = args.constraints;
        return `${columnName} must be unique in ${modelClass.name}.`;
    }
}

export function IsUniqueUpdateRequest(
    columnName: string,
    modelClass: ModelCtor,
    validationOptions?: ValidationOptions
) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [columnName, modelClass],
            validator: IsUniqueUpdateRequestConstraint,
        });
    };
}
