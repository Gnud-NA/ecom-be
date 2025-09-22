"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn("ecom_categories", "brand_name", {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: "REMEMBER_NGUYEN",
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn("ecom_categories", "brand_name");
    },
};
