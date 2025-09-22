"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn("wf_posts", "subcribe_date", {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn("wf_posts", "subcribe_date");
    },
};
