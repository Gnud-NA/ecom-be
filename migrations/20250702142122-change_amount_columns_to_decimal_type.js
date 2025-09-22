"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("ecom_wallet_transactions", "amount", {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        });

        await queryInterface.changeColumn("ecom_wallets", "total_amount", {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
