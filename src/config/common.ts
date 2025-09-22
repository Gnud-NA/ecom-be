export const BASE_FILTER = {
    LIMIT_DEFAULT: 10,
    OFFSET_DEFAULT: 0,
};

export enum ErrorCodeEnum {
    UNAUTHORIZED = "UNAUTHORIZED",
    BAD_REQUEST = "BAD_REQUEST",
}

export enum CoinNameEnum {
    ETHUSDT = "ETHUSDT",
    BTCUSDT = "BTCUSDT",
    BNBUSDT = "BNBUSDT",
    NEARUSDT = "NEARUSDT",
}

export enum ContractType {
    PERPETUAL = "PERPETUAL",
    CURRENT_MONTH = "CURRENT_MONTH",
    NEXT_MONTH = "NEXT_MONTH",
    CURRENT_QUARTER = "CURRENT_QUARTER",
    NEXT_QUARTER = "NEXT_QUARTER",
}

export enum OrderSideEnum {
    BUY = "BUY",
    SELL = "SELL",
}
export enum OrderTypeEnum {
    LIMIT = "LIMIT",
    STOP = "STOP",
    TAKE_PROFIT = "TAKE_PROFIT",
}

export enum WorkingTypeEnum {
    CONTRACT_PRICE = "CONTRACT_PRICE",
    MARK_PRICE = "MARK_PRICE",
}

export enum OrderConstantDefaultEnum {
    QUANTITY = 1,
    LEVERAGE = 20,
}

export enum CacheRedisKeyEnum {
    API_AWAIT = "API_AWAIT",
    API_TIMES = "API_TIMES",
    ORDER_TIME = "ORDER_TIME",
    POSITION_TIME = "POSITION_TIME",
    IS_RESET = "IS_RESET",
    CHANGE_PRICE_AWAIT_TIME = "CHANGE_PRICE_AWAIT_TIME",
    TAKE_PROFIT_FLAG = "TAKE_PROFIT_FLAG",
    LONG_SHORT_FLAG = "LONG_SHORT_FLAG",
}

export enum AwaitTimeDefaultEnum {
    CHANGE_PRICE = 1,
}

export enum PostTypeEnum {
    BLOG = "BLOG",
    SERVICE = "SERVICE",
    PROJECT = "PROJECT",
    CONTACT = "CONTACT",
    PAGE = "PAGE",
    QNA = "QNA",
    PARTNER = "PARTNER",
}

export enum MediaAbleTypeEnum {
    POST = "POST",
    CATEGORY = "CATEGORY",
    SLIDE = "SLIDE",
    ECOM_PRODUCT = "ECOM_PRODUCT",
    ECOM_CATEGORY = "ECOM_CATEGORY",
}

export enum MediaSeviceTypeEnum {
    POST = "POST",
    CATEGORY = "CATEGORY",
    GALLERY = "GALLERY",
    PRODUCT = "PRODUCT",
    AVATAR = "AVATAR",
    SLIDE = "SLIDE",
}
export enum MediaOrigineEnum {
    S3 = "S3",
    SERVER = "SERVER",
}

export enum MediaTypeEnum {
    VIDEO = "VIDEO",
    IMAGE = "IMAGE",
}

export enum MediaMimeTypeEnum {
    PNG = "image/png",
    JPG = "image/jpeg",
    SVG = "image/svg+xml",
    AVIF = "image/avif",
    WEBP = "image/webp",
    GIF = "image/gif",
    BMP = "image/bmp",
    X_ICON = "image/x-icon",
    TIFF = "image/tiff",
}

export enum MediaSizeEnum {
    SMALL = 150,
    MEDIUM = 450,
    LARGE = 960,
}
export enum MediaSizeNameEnum {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
    FULL = "full",
}

export enum MediaQualityEnum {
    MAX = 100,
    MEDIUM = 90,
    LOW = 80,
}

export const STORAGE_PATH = process.env.HOST ?? "uploads";

export const PUBLIC_PATH = ["auth/login"];

export enum OrderByEnum {
    ASC = "ASC",
    DESC = "DESC",
}

export enum ContactTypeEnum {
    CONTACT = "CONTACT",
    SUBSCRIBE = "SUBSCRIBE",
    QNA = "QNA",
}
