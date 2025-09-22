"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "wf_roles",
            [
                {
                    name: "Super Admin",
                    status: true,
                    user_id: 1,
                },
                {
                    name: "Admin",
                    status: true,
                    user_id: 1,
                },
                {
                    name: "User",
                    status: true,
                    user_id: 1,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("wf_roles", null, {});
    },
};
