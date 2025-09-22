export enum ProductTypeEnum {}
export enum ProductDiscountTypeEnum {
    AMOUNT = "AMOUNT",
    PERCENT = "PERCENT",
}

export const ProductCodePrefix = "ECOM_PRODUCT";

export enum OrderStatusEnum {
    ACTIVATION = "ACTIVED",
    SHIPPING = "SHIPPING",
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    REFUND = "REFUND",
}

export enum OrderPaymentStatusEnum {
    FAILED = "FAILED",
    CANCELED = "CANCELED",
    SUCCESS = "SUCCESS",
    SUCCESS_UPDATE = "SUCCESS_UPDATE",
    PROCCESSING = "PROCCESSING",
    PENDING = "PENDING",
    REFUND = "REFUND",
}

export enum OrderPaymentMethodEnum {
    CREDIT_CARD = "CREDIT_CARD",
    PAYPAL = "PAYPAL",
    GSHOP = "GSHOP",
    APPLE_PAY = "APPLE_PAY",
}

export enum OrderShippingStatusEnum {
    NONE = "NONE",
    ORDER_RECEIVED = "ORDER_RECEIVED",
    PROCESSING = "PROCESSING",
    PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
    PREPARING_FOR_SHIPMENT = "PREPARING_FOR_SHIPMENT",
    SHIPPED = "SHIPPED",
    IN_TRANSIT = "IN_TRANSIT",
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
    DELIVERED = "DELIVERED",
    DELIVERY_ATTEMPT_FAILED = "DELIVERY_ATTEMPT_FAILED",
    RETURNING = "RETURNING",
    RETURNED = "RETURNED",
    CANCELLED = "CANCELLED",
}

export enum QuantityUnit {
    PIECE = "PIECE",
    KILOGRAM = "KILOGRAM",
    GRAM = "GRAM",
    // LITER = "LITER",
    // MILLILITER = "MILLILITER",
    METER = "METER",
    // CENTIMETER = "CENTIMETER",
    BOX = "BOX",
    // PACKET = "PACKET",
    // DOZEN = "DOZEN",
    // PAIR = "PAIR",
}

export enum VoucherTypeEnum {
    CASH = "CASH",
    PERCENT = "PERCENT",
}

export enum VoucherDefaultEnum {
    REMEMBER_NGUYEN = "REMEMBER_NGUYEN",
}

export enum ShippingMethodEnum {
    FREE = "FREE",
    PRIORITY = "PRIORITY",
    EXPRESS = "EXPRESS",
    STANDARD = "STANDARD",
}

export enum RegistryDetailStatusEnum {
    PURCHASE = "PURCHASE",
    NON_PURCHASE = "NON_PURCHASE",
}

export enum TierTypeEnum {
    SPEND = "SPEND",
    CREATED_ACCOUNT = "CREATED_ACCOUNT",
}

export enum TierBenefitTypeEnum {
    EARLY_ACCESS_TO_ALL_SALES = "EARLY_ACCESS_TO_ALL_SALES",
    FIRST_LOOK_AT_NEW_COLLECTION_DROPS = "FIRST_LOOK_AT_NEW_COLLECTION_DROPS",
    FREE_EXPEDITED_SHIPPING_OVER_1000 = "FREE_EXPEDITED_SHIPPING_OVER_1000",
    FREE_GIFT_WRAPPING = "FREE_GIFT_WRAPPING",
    POINTS_FOR_BIRTHDAY_GIFT = "POINTS_FOR_BIRTHDAY_GIFT",
    POINTS_FOR_CREATING_ACCOUNT = "POINTS_FOR_CREATING_ACCOUNT",
    CREATE_AN_ACCOUNT = "CREATE_AN_ACCOUNT",
}

export enum RewardEventTypeEnum {
    CREATE_AN_ACCOUNT = "CREATE_AN_ACCOUNT",
    MAKE_A_PURCHASE = "MAKE_A_PURCHASE",
    REFER_A_FRIEND = "REFER_A_FRIEND",
    CELEBRATE_YOUR_BIRTHDAY = "CELEBRATE_YOUR_BIRTHDAY",
    FOLLOW_US_ON_INSTAGRAM = "FOLLOW_US_ON_INSTAGRAM",
}

export enum RewardMilestoneStatusEnum {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export enum EcomWalletTypeEnum {
    REWARD = "REWARD",
    RETURN = "RETURN",
}

export enum WalletTransactionTypeEnum {
    EARNED = "EARNED",
    SPENT = "SPENT",
}

export enum WalletTransactionSourceEnum {
    ORDER = "ORDER",
    REWARD = "REWARD",
    REWARD_MILESTONE = "REWARD_MILESTONE",
}

export enum WalletTransactionEventTypeEnum {
    REWARD_MILESTONE = "REWARD_MILESTONE",
    ORDER = "ORDER",
    RETURN = "RETURN",
    EXCHANGE = "EXCHANGE",
}
