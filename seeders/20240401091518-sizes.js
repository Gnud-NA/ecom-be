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

        return queryInterface.bulkInsert("ecom_sizes", [
            {
                name: "SM",
                description: "",
            },
            {
                name: "M",
                description: "",
            },
            {
                name: "3M",
                description: "",
            },
            {
                name: "6M",
                description: "",
            },
            {
                name: "L",
                description: "",
            },
            {
                name: "XL",
                description: "",
            },
            {
                name: "2XL",
                description: "",
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
