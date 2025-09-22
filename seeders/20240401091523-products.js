"use strict";

const fs = require("fs");
const path = require("path");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        // await queryInterface.bulkDelete("ecom_products", null, {});
        await queryInterface.bulkInsert(
            "ecom_products",
            [
                {
                    slug: "product-1",
                    product_code: "P001",
                    product_name: "Product 1",
                    brand_name: "Brand A",
                    icon: "icon1.png",
                    image: "https://wfweb.s3.ap-southeast-1.amazonaws.com/remember_nguyen/white.webp",
                    video: "video1.mp4",
                    base_price: 100.0,
                    show_price: 95.0,
                    discount_type: "percentage",
                    discount_amount: 5.0,
                    rating: 4.5,
                    status: true,
                    description: "Description for Product 1",
                    content: "Content for Product 1",
                    priority: 1,
                    stock_quantity: 50,
                    tags: "tag1, tag2",
                    seo_title: "SEO Title for Product 1",
                    seo_description: "SEO Description for Product 1",
                    seo_keyword: "SEO Keyword for Product 1",
                    seo_location: "SEO Location for Product 1",
                    view: 100,
                    user_id: 1,
                    last_updated: new Date(),
                    deleted_at: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    slug: "product-2",
                    product_code: "P002",
                    product_name: "Product 2",
                    brand_name: "Brand B",
                    icon: "icon2.png",
                    image: "https://wfweb.s3.ap-southeast-1.amazonaws.com/remember_nguyen/blue.jpg",
                    video: "video2.mp4",
                    base_price: 200.0,
                    show_price: 180.0,
                    discount_type: "fixed",
                    discount_amount: 20.0,
                    rating: 4.0,
                    status: true,
                    description: "Description for Product 2",
                    content: "Content for Product 2",
                    priority: 2,
                    stock_quantity: 30,
                    tags: "tag3, tag4",
                    seo_title: "SEO Title for Product 2",
                    seo_description: "SEO Description for Product 2",
                    seo_keyword: "SEO Keyword for Product 2",
                    seo_location: "SEO Location for Product 2",
                    view: 200,
                    user_id: 1,
                    last_updated: new Date(),
                    deleted_at: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    slug: "product-3",
                    product_code: "P003",
                    product_name: "Product 3",
                    brand_name: "Brand B",
                    icon: "icon2.png",
                    image: "https://wfweb.s3.ap-southeast-1.amazonaws.com/remember_nguyen/red.webp",
                    video: "video2.mp4",
                    base_price: 200.0,
                    show_price: 180.0,
                    discount_type: "fixed",
                    discount_amount: 20.0,
                    rating: 4.0,
                    status: true,
                    description: "Description for Product 2",
                    content: "Content for Product 2",
                    priority: 2,
                    stock_quantity: 30,
                    tags: "tag3, tag4",
                    seo_title: "SEO Title for Product 2",
                    seo_description: "SEO Description for Product 2",
                    seo_keyword: "SEO Keyword for Product 2",
                    seo_location: "SEO Location for Product 2",
                    view: 200,
                    user_id: 1,
                    last_updated: new Date(),
                    deleted_at: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    slug: "product-4",
                    product_code: "P004",
                    product_name: "Product 4",
                    brand_name: "Brand B",
                    icon: "icon2.png",
                    image: "https://wfweb.s3.ap-southeast-1.amazonaws.com/remember_nguyen/navy.webp",
                    video: "video2.mp4",
                    base_price: 200.0,
                    show_price: 180.0,
                    discount_type: "fixed",
                    discount_amount: 20.0,
                    rating: 4.0,
                    status: true,
                    description: "Description for Product 2",
                    content: "Content for Product 2",
                    priority: 2,
                    stock_quantity: 30,
                    tags: "tag3, tag4",
                    seo_title: "SEO Title for Product 2",
                    seo_description: "SEO Description for Product 2",
                    seo_keyword: "SEO Keyword for Product 2",
                    seo_location: "SEO Location for Product 2",
                    view: 200,
                    user_id: 1,
                    last_updated: new Date(),
                    deleted_at: null,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                // Thêm các sản phẩm khác ở đây nếu cần
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        // await queryInterface.bulkDelete("ecom_products", null, {});
    },
};
