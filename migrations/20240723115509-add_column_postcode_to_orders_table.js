"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn("ecom_orders", "post_code", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "shipping_to_post_code", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn("ecom_orders", "post_code");
        await queryInterface.removeColumn("ecom_orders", "shipping_to_post_code");
    },
};
