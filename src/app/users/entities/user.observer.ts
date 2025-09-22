import User from "@src/app/users/entities/user.entity";

export const UserObserver = {
    afterFind: (values: User[] | User, options) => {
        if (Array.isArray(values)) {
            values.forEach((item) => {
                const first = item?.firstName ?? "";
                const last = item?.lastName ?? "";
                const fullName = `${first} ${last}`.trim() || null;
                item?.setDataValue("fullName", fullName);

                if (options?.hideColumns) {
                    item?.setDataValue("password", undefined);
                }
            });
        } else {
            if (options?.hideColumns) {
                values?.setDataValue("password", undefined);
            }
        }
    },
};
