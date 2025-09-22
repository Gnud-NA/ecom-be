"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("ecom_registry_details", "color_id", {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
        await queryInterface.addColumn("ecom_registry_details", "size_id", {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("ecom_registry_details", "color_id");
        await queryInterface.removeColumn("ecom_registry_details", "size_id");
    },
};
