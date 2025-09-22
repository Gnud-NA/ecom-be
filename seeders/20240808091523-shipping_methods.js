"use strict";

const fs = require("fs");
const path = require("path");

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
        // await queryInterface.bulkDelete("ecom_shipping_methods", null, {});
        await queryInterface.bulkInsert(
            "ecom_shipping_methods",
            [
                {
                    code: "STANDARD",
                    name: "Standard Shipping",
                    note: "",
                    is_default: false,
                    is_free: false,
                    amount: 10,
                    status: true,
                    user_id: 1,
                    deleted_at: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    code: "FREE",
                    name: "Free Shipping",
                    note: "",
                    is_default: true,
                    is_free: false,
                    amount: 10,
                    status: true,
                    user_id: 1,
                    deleted_at: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    code: "USPS",
                    name: "U.S.P.S Priority Mail ExpressTM",
                    note: "",
                    is_default: false,
                    is_free: false,
                    amount: 10,
                    status: true,
                    user_id: 1,
                    deleted_at: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    code: "PRIORITY",
                    name: "Priority(if placed before 2pm EST, order will ship same day)",
                    note: "",
                    is_default: false,
                    is_free: false,
                    amount: 35,
                    status: true,
                    user_id: 1,
                    deleted_at: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                },

                // Thêm các sản phẩm khác ở đây nếu cần
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
        // await queryInterface.bulkDelete("ecom_shipping_methods", null, {});
    },
};
