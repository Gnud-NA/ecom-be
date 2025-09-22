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
        await queryInterface.createTable("wf_media", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            media_type: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },

            mime_type: {
                allowNull: false,
                type: Sequelize.STRING,
            },

            mediaable_type: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            mediaable_id: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },

            url: {
                allowNull: false,
                type: Sequelize.STRING,
            },

            content: {
                allowNull: true,
                type: Sequelize.STRING,
            },

            type: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            code: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            origin: {
                allowNull: true,
                type: Sequelize.STRING,
                defaultValue: "S3",
            },

            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            collection_id: {
                allowNull: true,
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("wf_media");
    },
};
