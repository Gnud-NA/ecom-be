"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("ecom_address_books", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            unit_number: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            street: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            country: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            state: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            zipcode: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            door_code: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: null,
            },
            is_default: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            is_billing: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
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
        return queryInterface.dropTable("ecom_address_books");
    },
};
