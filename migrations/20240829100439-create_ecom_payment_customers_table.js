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
        await queryInterface.createTable("ecom_payment_customers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            customer_id: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING, // ID là chuỗi ký tự
            },
            object: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            address: {
                type: Sequelize.TEXT, // Địa chỉ có thể là một đối tượng JSON
                allowNull: true,
            },
            created: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            currency: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            // default_source: {
            //     type: Sequelize.STRING,
            //     allowNull: true,
            // },
            delinquent: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            livemode: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            metadata: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            next_invoice_sequence: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            preferred_locales: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            // shipping: {
            //     type: Sequelize.TEXT,
            //     allowNull: true,
            // },
            tax_exempt: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "none",
            },
            test_clock: {
                type: Sequelize.STRING,
                allowNull: true,
            },

            user_id: {
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
        await queryInterface.dropTable("ecom_payment_customers");
    },
};
