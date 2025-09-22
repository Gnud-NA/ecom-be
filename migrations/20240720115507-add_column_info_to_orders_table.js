"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn("ecom_orders", "first_name", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "last_name", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "email", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "apartment", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "city", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "state", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "country", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "shipping_to_address", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "shipping_to_first_name", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "shipping_to_last_name", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "shipping_to_email", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "shipping_to_apartment", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "shipping_to_city", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "shipping_to_state", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        await queryInterface.addColumn("ecom_orders", "shipping_to_country", {
            type: Sequelize.TEXT,
            allowNull: true,
            defaultValue: null,
        });
        // await queryInterface.addColumn("ecom_orders", "shipping_amount", {
        //     type: Sequelize.DECIMAL(15, 2),
        //     allowNull: true,
        //     defaultValue: null,
        // });
        // await queryInterface.addColumn("ecom_orders", "tax_amount", {
        //     type: Sequelize.DECIMAL(15, 2),
        //     allowNull: true,
        //     defaultValue: null,
        // });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn("ecom_orders", "first_name");
        await queryInterface.removeColumn("ecom_orders", "last_name");
        await queryInterface.removeColumn("ecom_orders", "email");
        await queryInterface.removeColumn("ecom_orders", "apartment");
        await queryInterface.removeColumn("ecom_orders", "city");
        await queryInterface.removeColumn("ecom_orders", "state");
        await queryInterface.removeColumn("ecom_orders", "country");
        await queryInterface.removeColumn("ecom_orders", "shipping_to_address");
        await queryInterface.removeColumn("ecom_orders", "shipping_to_first_name");
        await queryInterface.removeColumn("ecom_orders", "shipping_to_last_name");
        await queryInterface.removeColumn("ecom_orders", "shipping_to_email");
        await queryInterface.removeColumn("ecom_orders", "shipping_to_apartment");
        await queryInterface.removeColumn("ecom_orders", "shipping_to_city");
        await queryInterface.removeColumn("ecom_orders", "shipping_to_state");
        await queryInterface.removeColumn("ecom_orders", "shipping_to_country");
        // await queryInterface.removeColumn("ecom_orders", "shipping_amount");
        // await queryInterface.removeColumn("ecom_orders", "tax_amount");
    },
};
