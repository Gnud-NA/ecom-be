export class CSVProductDto {
    "Product SKU": string;
    "Stock Level": string;
    "Product Width": string;
    "Product Height": string;
    "Product Depth": string;
    "Free Shipping": string;
    "Fixed Shipping Cost": string;
    "Product Name": string;
    "Product Description": string;
    "TITLE": string;
    "PRICE": string;
    "BASE PRICE": string;
    "SHOW PRICE": string;
}

export class CSVProductMapingedDto {
    [key: string]: {
        sizes?: string[];
        quantity?: number;
        productName?: string;
        productDescription?: string;
        title?: string;
        price?: string;
        basePrice?: string;
        showPrice?: string;
    };
}
