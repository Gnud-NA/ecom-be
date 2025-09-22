"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "ecom_tiers",
            [
                {
                    name: "Tier 1",
                    description: "Create an Account",
                    type: "CREATED_ACCOUNT",
                    level: 1,
                    spend_required: 0,
                },
                {
                    name: "Tier 2",
                    description: "",
                    type: "SPEND",
                    level: 2,
                    spend_required: 400,
                },
                {
                    name: "Tier 3",
                    description: "",
                    type: "SPEND",
                    level: 3,
                    spend_required: 1000,
                },
                {
                    name: "Tier 4",
                    description: "",
                    type: "SPEND",
                    level: 4,
                    spend_required: 3000,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {},
};
