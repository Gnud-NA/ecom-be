"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn("ecom_sizes", "length", {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_sizes", "chest", {
            type: Sequelize.STRING,
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
        await queryInterface.removeColumn("ecom_sizes", "length");
        await queryInterface.removeColumn("ecom_sizes", "chest");
    },
};
