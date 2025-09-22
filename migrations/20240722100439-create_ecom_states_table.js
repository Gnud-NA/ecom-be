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
        await queryInterface.createTable("ecom_states", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            tax_amount: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false,
                defaultValue: 0,
            },
            shipping_amount: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: true,
                defaultValue: 0,
            },

            is_default: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
            country_id: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            country_code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: false,
            },
            fips_code: {
                type: Sequelize.STRING(255),
            },
            iso2: {
                type: Sequelize.STRING(255),
            },
            type: {
                type: Sequelize.STRING(191),
            },
            latitude: {
                type: Sequelize.DECIMAL(10, 8),
            },
            longitude: {
                type: Sequelize.DECIMAL(11, 8),
            },
            flag: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 1,
            },
            wiki_data_id: {
                type: Sequelize.STRING(255),
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
        await queryInterface.dropTable("ecom_states");
    },
};
