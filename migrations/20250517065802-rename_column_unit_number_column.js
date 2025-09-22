"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.renameColumn("ecom_address_books", "unit_number", "address_line2");
        await queryInterface.renameColumn("ecom_registries", "unit_number", "address_line2");
        await queryInterface.addColumn("ecom_address_books", "address_line1", {
            type: Sequelize.STRING(255),
            allowNull: true,
        });
        await queryInterface.addColumn("ecom_registries", "address_line1", {
            type: Sequelize.STRING(255),
            allowNull: true,
        });
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
