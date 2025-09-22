"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("wf_settings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },

            isMaintain: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            domain: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            keyword: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            logo: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            sub_logo: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            favicon: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            google_analytic: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            fanpage: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            footer_description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            google_link: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            facebook_link: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            pinterest_link: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            twitter_link: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            slogan: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            mobile: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            phone: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            youtube_link: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            youtube_chanel: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            zalo: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            skype: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            telegram_bot_token: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            telegram_chat_id: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            updated_at: {
                type: "TIMESTAMP",
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                allowNull: false,
            },
            deleted_at: {
                type: "TIMESTAMP",
                defaultValue: null,
                allowNull: true,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("wf_settings");
    },
};
