"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         *
         */
        await queryInterface.createTable("wf_posts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },

            status: {
                type: Sequelize.BOOLEAN,
            },
            title: {
                type: Sequelize.STRING,
            },
            slug: {
                type: Sequelize.TEXT,
                unique: true,
            },
            thumbnail: {
                type: Sequelize.TEXT,
            },
            description: {
                type: Sequelize.TEXT,
            },
            content: {
                type: Sequelize.TEXT,
            },
            post_type: {
                type: Sequelize.TEXT,
            },
            tags: {
                type: Sequelize.TEXT,
            },
            video: {
                type: Sequelize.TEXT,
            },
            priority: {
                type: Sequelize.FLOAT,
            },
            seo_title: {
                type: Sequelize.TEXT,
            },
            seo_description: {
                type: Sequelize.TEXT,
            },
            seo_keyword: {
                type: Sequelize.TEXT,
            },
            seo_location: {
                type: Sequelize.TEXT,
            },
            view: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            phone: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null,
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null,
            },
            contact_type: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null,
            },
            user_id: {
                type: Sequelize.BIGINT,
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
        await queryInterface.dropTable("wf_posts");
    },
};
