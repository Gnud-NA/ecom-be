"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        // await queryInterface.addColumn("wf_categories", "content", {
        //     type: Sequelize.TEXT,
        //     allowNull: true,
        //     defaultValue: null,
        // });
        // await queryInterface.addColumn("wf_categories", "wf_code", {
        //     type: Sequelize.TEXT,
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
        // await queryInterface.removeColumn("wf_categories", "content");
        // await queryInterface.removeColumn("wf_categories", "wf_code");
    },
};
