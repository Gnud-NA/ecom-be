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
        await queryInterface.createTable("ecom_countries", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            iso3: {
                type: Sequelize.CHAR(3),
            },
            numeric_code: {
                type: Sequelize.CHAR(3),
            },
            iso2: {
                type: Sequelize.CHAR(2),
            },
            phonecode: {
                type: Sequelize.STRING(255),
            },
            capital: {
                type: Sequelize.STRING(255),
            },
            currency: {
                type: Sequelize.STRING(255),
            },
            currency_name: {
                type: Sequelize.STRING(255),
            },
            currency_symbol: {
                type: Sequelize.STRING(255),
            },
            tld: {
                type: Sequelize.STRING(255),
            },
            native: {
                type: Sequelize.STRING(255),
            },
            region: {
                type: Sequelize.STRING(255),
            },
            region_id: {
                type: Sequelize.BIGINT,
            },
            subregion: {
                type: Sequelize.STRING(255),
            },
            subregion_id: {
                type: Sequelize.BIGINT,
            },
            nationality: {
                type: Sequelize.STRING(255),
            },
            timezones: {
                type: Sequelize.TEXT,
            },
            translations: {
                type: Sequelize.TEXT,
            },
            latitude: {
                type: Sequelize.DECIMAL(10, 8),
            },
            longitude: {
                type: Sequelize.DECIMAL(11, 8),
            },
            emoji: {
                type: Sequelize.STRING(191),
            },
            emojiU: {
                type: Sequelize.STRING(191),
            },
            flag: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 1,
            },
            wiki_data_id: {
                type: Sequelize.STRING(255),
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
        await queryInterface.dropTable("ecom_countries");
    },
};
