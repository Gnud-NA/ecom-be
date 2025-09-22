"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const [tiers] = await queryInterface.sequelize.query(
            "SELECT id, type, level FROM ecom_tiers WHERE deleted_at IS NULL ORDER BY level ASC"
        );

        await Promise.all(
            tiers?.map(async (tier) => {
                if (tier?.level === 1) {
                    await queryInterface.bulkInsert(
                        "ecom_tier_benefits",
                        [
                            {
                                tier_id: tier.id,
                                name: "50 Points for Creating Account",
                                description: "",
                                priority: 1,
                                point: 50,
                                type: "CREATE_AN_ACCOUNT",
                            },
                            {
                                tier_id: tier.id,
                                name: "100 Points for Birthday Gift",
                                description: "",
                                priority: 2,
                                point: 100,
                                type: "POINTS_FOR_BIRTHDAY_GIFT",
                            },
                        ],
                        {}
                    );
                }
                if (tier?.level === 2) {
                    await queryInterface.bulkInsert(
                        "ecom_tier_benefits",
                        [
                            {
                                tier_id: tier.id,
                                name: "200 Points for Birthday Gift",
                                description: "",
                                priority: 1,
                                point: 200,
                                type: "POINTS_FOR_BIRTHDAY_GIFT",
                            },
                            {
                                tier_id: tier.id,
                                name: "Early Access to All Sales",
                                description: "",
                                priority: 2,
                                point: 0,
                                type: "EARLY_ACCESS_TO_ALL_SALES",
                            },
                            {
                                tier_id: tier.id,
                                name: "100 Points for Birthday Gift",
                                description: "",
                                priority: 3,
                                point: 100,
                                type: "POINTS_FOR_BIRTHDAY_GIFT",
                            },
                        ],
                        {}
                    );
                }
                if (tier?.level === 3) {
                    await queryInterface.bulkInsert(
                        "ecom_tier_benefits",
                        [
                            {
                                tier_id: tier.id,
                                name: "300 Points for Birthday Gift",
                                description: "",
                                priority: 1,
                                point: 300,
                                type: "POINTS_FOR_BIRTHDAY_GIFT",
                            },
                            {
                                tier_id: tier.id,
                                name: "Early Access to All Sales",
                                description: "",
                                priority: 2,
                                point: 0,
                                type: "EARLY_ACCESS_TO_ALL_SALES",
                            },
                            {
                                tier_id: tier.id,
                                name: "First Look at New Collection Drops",
                                description: "",
                                priority: 3,
                                point: 0,
                                type: "FIRST_LOOK_AT_NEW_COLLECTION_DROPS",
                            },
                            {
                                tier_id: tier.id,
                                name: "100 Points for Birthday Gift",
                                description: "",
                                priority: 4,
                                point: 100,
                                type: "POINTS_FOR_BIRTHDAY_GIFT",
                            },
                        ],
                        {}
                    );
                }
                if (tier?.level === 4) {
                    await queryInterface.bulkInsert(
                        "ecom_tier_benefits",
                        [
                            {
                                tier_id: tier.id,
                                name: "300 Points for Birthday Gift",
                                description: "",
                                priority: 1,
                                point: 300,
                                type: "POINTS_FOR_BIRTHDAY_GIFT",
                            },
                            {
                                tier_id: tier.id,
                                name: "Early Access to All Sales",
                                description: "",
                                priority: 2,
                                point: 0,
                                type: "EARLY_ACCESS_TO_ALL_SALES",
                            },
                            {
                                tier_id: tier.id,
                                name: "First Look at New Collection Drops",
                                description: "",
                                priority: 3,
                                point: 0,
                                type: "FIRST_LOOK_AT_NEW_COLLECTION_DROPS",
                            },
                            {
                                tier_id: tier.id,
                                name: "Free Expedited Shipping Over $1000",
                                description: "",
                                priority: 4,
                                point: 0,
                                type: "FREE_EXPEDITED_SHIPPING_OVER_1000",
                            },
                            {
                                tier_id: tier.id,
                                name: "Free Gift Warpping",
                                description: "",
                                priority: 5,
                                point: 0,
                                type: "FREE_GIFT_WRAPPING",
                            },
                        ],
                        {}
                    );
                }
            })
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
