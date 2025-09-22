"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const [products] = await queryInterface.sequelize.query(
            "SELECT id FROM ecom_products WHERE deleted_at IS NULL LIMIT 100"
        );

        const [registries] = await queryInterface.sequelize.query(
            "SELECT id FROM ecom_registries WHERE deleted_at IS NULL ORDER BY id DESC LIMIT 1"
        );

        const data = products?.map((product) => {
            return {
                product_id: product.id,
                registry_id: registries[0].id,
            };
        });

        await queryInterface.bulkInsert("ecom_registry_details", data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
