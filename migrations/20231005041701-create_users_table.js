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
        await queryInterface.createTable("wf_users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            username: {
                allowNull: true,
                unique: true,
                type: Sequelize.STRING,
            },
            email: {
                allowNull: true,
                unique: true,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            phone: {
                allowNull: true,
                unique: true,
                type: Sequelize.STRING,
            },
            first_name: {
                allowNull: true,

                type: Sequelize.STRING,
            },
            last_name: {
                allowNull: true,

                type: Sequelize.STRING,
            },
            is_verify: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            remember_token: {
                allowNull: true,
                type: Sequelize.STRING,
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
        await queryInterface.removeColumn("wf_users", "thumbnail_id");
    },
};
