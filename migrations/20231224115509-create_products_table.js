"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable("ecom_products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            product_code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            product_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            brand_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            icon: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            video: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            base_price: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: true,
            },
            show_price: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false,
            },
            discount_type: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            discount_amount: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: true,
            },
            rating: {
                type: Sequelize.DECIMAL(3, 1),
                allowNull: true,
            },
            status: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            priority: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            // quantity of storages
            stock_quantity: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },

            tags: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            seo_title: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            seo_description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            seo_keyword: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            seo_location: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            view: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            last_updated: {
                allowNull: true,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
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
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("ecom_products");
    },
};
