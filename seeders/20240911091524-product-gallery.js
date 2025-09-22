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
            "ecom_product_galleries",
            [
                {
                    ecom_product_id: 1,
                    ecom_color_id: 1,
                    media_id: 1,
                    url: "https://wfweb.s3.ap-southeast-1.amazonaws.com/remember_nguyen/white.webp",
                },
                {
                    ecom_product_id: 1,
                    ecom_color_id: 2,
                    media_id: 1,
                    url: "https://wfweb.s3.ap-southeast-1.amazonaws.com/remember_nguyen/blue.jpg",
                },
                {
                    ecom_product_id: 1,
                    ecom_color_id: 3,
                    media_id: 1,
                    url: "https://wfweb.s3.ap-southeast-1.amazonaws.com/remember_nguyen/red.webp",
                },
                {
                    ecom_product_id: 2,
                    ecom_color_id: 1,
                    media_id: 1,
                    url: "https://wfweb.s3.ap-southeast-1.amazonaws.com/remember_nguyen/white.webp",
                },
                {
                    ecom_product_id: 2,
                    ecom_color_id: 2,
                    media_id: 1,
                    url: "https://wfweb.s3.ap-southeast-1.amazonaws.com/remember_nguyen/blue.jpg",
                },
                {
                    ecom_product_id: 3,
                    ecom_color_id: 3,
                    media_id: 1,
                    url: "https://wfweb.s3.ap-southeast-1.amazonaws.com/remember_nguyen/white.webp",
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
        // await queryInterface.bulkDelete("ecom_shipping_methods", null, {});
    },
};
