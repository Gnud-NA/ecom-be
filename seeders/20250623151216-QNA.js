"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "wf_posts",
            [
                {
                    title: "What is the loyalty program?",
                    content:
                        "Our loyalty program is a rewards system that allows you to earn points for various activities and redeem them for exclusive benefits and discounts.",
                    post_type: "QNA",
                    status: true,
                    priority: 1,
                    slug: "what-is-the-loyalty-program",
                },
                {
                    title: "Who can join the loyalty program?",
                    content:
                        "The LOYALTY Program is available to US residents who are at least 18 years old at the time of enrollment. All communications will be in English and the currency value will be in USD.",
                    post_type: "QNA",
                    status: true,
                    priority: 2,
                    slug: "who-can-join-the-loyalty-program",
                },
                {
                    title: "It is free to join the loyalty program?",
                    content:
                        "Yes, joining our loyalty program is completely free. You can sign up at any time and start earning points immediately.",
                    post_type: "QNA",
                    status: true,
                    priority: 3,
                    slug: "is-it-free-to-join-the-loyalty-program",
                },
                {
                    title: "What is the relationship between my revolve points and forward points?",
                    content:
                        "Revolve points and forward points are part of the same unified loyalty system. All points contribute to your overall rewards balance and tier progression.",
                    post_type: "QNA",
                    status: true,
                    priority: 4,
                    slug: "what-is-the-relationship-between-my-revolve-points-and-forward-points",
                },
                {
                    title: "Where can I earn points?",
                    content:
                        "You can earn points through purchases, account creation, birthday bonuses, referring friends, following us on social media, and participating in special promotions.",
                    post_type: "QNA",
                    status: true,
                    priority: 5,
                    slug: "where-can-i-earn-points",
                },
                {
                    title: "What do I get with my points?",
                    content:
                        "Points can be redeemed for discounts on future purchases, exclusive access to sales, free shipping, and special member-only benefits depending on your tier level.",
                    post_type: "QNA",
                    status: true,
                    priority: 6,
                    slug: "what-do-i-get-with-my-points",
                },
                {
                    title: "Do points expire?",
                    content:
                        "Points expire after 12 months of inactivity. However, any purchase or qualifying activity will extend the expiration date of all your points.",
                    post_type: "QNA",
                    status: true,
                    priority: 7,
                    slug: "do-points-expire",
                },
                {
                    title: "Do rewards expire?",
                    content:
                        "Earned rewards expire 90 days after they are issued to your account. Make sure to use them before the expiration date to take advantage of your savings.",
                    post_type: "QNA",
                    status: true,
                    priority: 8,
                    slug: "do-rewards-expire",
                },
                {
                    title: "How do I use my available rewards?",
                    content:
                        "You can apply your available rewards during checkout. Simply select the rewards you want to use and they will be automatically applied to your order total.",
                    post_type: "QNA",
                    status: true,
                    priority: 9,
                    slug: "how-do-i-use-my-available-rewards",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {},
};
