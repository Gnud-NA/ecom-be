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
            "ecom_product_colors",
            [
                {
                    ecom_product_id: 1,
                    ecom_color_id: 1,
                },
                {
                    ecom_product_id: 1,
                    ecom_color_id: 2,
                },
                {
                    ecom_product_id: 1,
                    ecom_color_id: 3,
                },
                {
                    ecom_product_id: 2,
                    ecom_color_id: 1,
                },
                {
                    ecom_product_id: 2,
                    ecom_color_id: 2,
                },
                {
                    ecom_product_id: 3,
                    ecom_color_id: 3,
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
