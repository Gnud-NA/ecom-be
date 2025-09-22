"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("ecom_cart_details", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            cart_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            color_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            size_id: {
                type: Sequelize.BIGINT,
                allowNull: true,
            },
            product_id: {
                type: Sequelize.BIGINT,
                allowNull: true,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable("ecom_cart_details");
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
