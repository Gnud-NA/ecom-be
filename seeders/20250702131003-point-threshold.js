"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.bulkInsert("ecom_reward_milestone_settings", [
            {
                point_threshold: 1983,
                amount_reward: 20,
                status: "ACTIVE",
                priority: 1,
                description: "1983 point reward $20",
            },
        ]);
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
