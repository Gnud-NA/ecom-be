"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn("ecom_orders", "security_code", {
            type: Sequelize.STRING,
            allowNull: true,
        });
        await queryInterface.addColumn("ecom_orders", "shipping_to_security_code", {
            type: Sequelize.STRING,
            allowNull: true,
        });
       
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn("ecom_orders", "security_code");
        await queryInterface.removeColumn("ecom_orders", "shipping_to_security_code");
    },
};
