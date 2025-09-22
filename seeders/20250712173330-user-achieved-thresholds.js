"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const [users] = await queryInterface.sequelize.query(
            "SELECT id FROM wf_users WHERE email = 'phamthanhtuan90.it@gmail.com'"
        );

        if (!users[0]) {
            throw new Error("User not found");
        }

        const data = {
            user_id: users[0]?.id ?? 10,
            reward_milestone_setting_id: 1,
            amount: 45,
            metadata: JSON.stringify({ test: true }),
        };

        await queryInterface.bulkInsert("ecom_user_achieved_thresholds", [data]);
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
