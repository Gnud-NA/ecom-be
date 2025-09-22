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
        await queryInterface.addColumn("wf_users", "verify_code", {
            type: Sequelize.TEXT,
            allowNull: true,
        });
        await queryInterface.addColumn("wf_users", "send_code_at", {
            type: Sequelize.DATE,
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn("wf_users", "verify_code");
        await queryInterface.removeColumn("wf_users", "send_code_at");
    },
};
