export namespace AuthConstants {
    export const JWT_SECRET = process.env.JWT_SECRET;
    export const JWT_EXPIRED_IN = Number(process.env.JWT_EXPIRED_IN ?? 604800);
    export const JWT_ACCESS_TOKEN_EXPIRED_IN = Number(process.env.JWT_ACCESS_TOKEN_EXPIRED_IN ?? 604000000);
    export const SALT_OR_ROUNDS = Number(process.env.SALT_OR_ROUNDS ?? 12);
}

export enum LoginTypeEnum {
    LOCAL = "LOCAL",
    WEB = "WEB",
    MOBILE = "MOBILE",
}

export enum RoleEnum {
    SUPPER_ADMIN = "1",
    ADMIN = "2",
    USER = "3",
}

export enum DomainEnum {
    REMEMBER_NGUYEN = "REMEMBER_NGUYEN",
    BABYSEN = "BABYSEN",
    PHEONIX_REN = "PHEONIX_REN",
    SOUTHERN_SATUDAY = "SOUTHERN_SATUDAY",
}
