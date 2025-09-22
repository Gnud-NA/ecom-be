import { ProductCodePrefix } from "@src/config";
import { parseStringPromise } from "xml2js";
import moment = require("moment");

export const generateProductCode = (id?: string | number) => {
    let code = process.env.PRODUCT_CODE_PREFIX ?? ProductCodePrefix;
    if (id) {
        code += `-${id}`;
    } else {
        const uid = moment().valueOf();
        code += `-${uid}`;
    }
    return code;
};

export const parseXMLtoJSON = async (xmlData: string): Promise<any> => {
    try {
        const result = await parseStringPromise(xmlData, {
            explicitArray: false, // Loại bỏ mảng nếu không cần thiết
            trim: true, // Loại bỏ khoảng trắng
        });
        return result;
    } catch (error) {
        throw new Error(`Error parsing XML: ${error.message}`);
    }
};

export function parseBoolean(value?: string | boolean): boolean | undefined {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    return undefined;
}
