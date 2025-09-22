"use strict";

const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

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
        const saltOrRounds = parseInt(process.env.SALT_OR_ROUNDS);
        const password = await bcrypt.hash("admin@123", saltOrRounds);
        await queryInterface.bulkInsert(
            "wf_users",
            [
                {
                    username: "admin3",
                    email: "admin3@gmail.com",
                    password: password,
                    phone: "0001000000",
                    first_name: "Super",
                    last_name: "Admin",
                    is_verify: true,
                    remember_token: "",
                    verify_code: "",
                    send_code_at: null,
                    country_calling_code: null,
                    phone_number: null,
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
        await queryInterface.bulkDelete("wf_users", null, {});
    },
};
