"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        // await queryInterface.addColumn("wf_posts", "phone", {
        //     type: Sequelize.TEXT,
        //     allowNull: true,
        //     defaultValue: null,
        // });
        // await queryInterface.addColumn("wf_posts", "email", {
        //     type: Sequelize.TEXT,
        //     allowNull: true,
        //     defaultValue: null,
        // });
        // await queryInterface.addColumn("wf_posts", "contact_type", {
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
        // await queryInterface.removeColumn("wf_posts", "phone");
        // await queryInterface.removeColumn("wf_posts", "email");
        // await queryInterface.removeColumn("wf_posts", "contact_type");
    },
};
