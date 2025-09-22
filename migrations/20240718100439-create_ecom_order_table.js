"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable("ecom_orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            promotion_code: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null,
            },
            promotion_amount: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: true,
                defaultValue: null,
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
            order_status: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            payment_status: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            payment_method: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            payment_transaction_id: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            shipping_status: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            note: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            total_quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            quantity_unit: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            tax_amount: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: true,
                defaultValue: 0,
            },
            shipping_amount: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: true,
                defaultValue: 0,
            },
            total_amount: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false,
                defaultValue: 0,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            employee_id: {
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
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("ecom_orders");
    },
};
