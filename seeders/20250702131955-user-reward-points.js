"use strict";

const { range } = require("lodash");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const [users] = await queryInterface.sequelize.query(
            "SELECT id FROM wf_users WHERE email = 'phamthanhtuan90.it@gmail.com'"
        );

        if (!users[0]) {
            throw new Error("User not found");
        }

        const data = range(1, 10).map((item, index) => ({
            user_id: users[0]?.id ?? 0,
            point: index === 2 ? -324 : item + 300,
            metadata: "{}",
            reward_event_id: 1,
        }));

        await queryInterface.bulkInsert("ecom_user_reward_points", data);
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
