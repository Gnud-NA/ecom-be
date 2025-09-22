"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("ecom_registries", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            registry_event_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            full_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            event_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            recipient_first_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            recipient_last_name: {
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
            door_code: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            zipcode: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            is_private: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            pin_code: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            question_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            question_message: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            is_receive_egift_card: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
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
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
