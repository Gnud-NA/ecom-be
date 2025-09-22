"use strict";

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
        // await queryInterface.bulkDelete("ecom_shipping_methods", null, {});
        await queryInterface.bulkInsert(
            "ecom_registry_events",
            [
                {
                    name: "Birthday",
                    description: "A common occasion to give gifts to friends and family to celebrate their birth.",
                },
                {
                    name: "Christmas",
                    description: "Major holiday in December when people exchange gifts with loved ones and coworkers.",
                },
                {
                    name: "Valentine's Day",
                    description: "February 14th, a romantic holiday to give gifts to a partner or spouse.",
                },
                {
                    name: "Mother's Day",
                    description: "Celebrated on the second Sunday of May to honor and give gifts to mothers.",
                },
                {
                    name: "Father's Day",
                    description: "Celebrated on the third Sunday of June to appreciate and give gifts to fathers.",
                },
                {
                    name: "Thanksgiving",
                    description: "Fourth Thursday in November; gifts or shared meals show gratitude and care.",
                },
                {
                    name: "Wedding",
                    description: "Gifts are given to congratulate the bride and groom on their marriage.",
                },
                {
                    name: "Baby Shower",
                    description: "A celebration before a baby is born; people give baby-related gifts to the parents.",
                },
                {
                    name: "Anniversary",
                    description: "A gift-giving occasion to celebrate a couple’s years of marriage or partnership.",
                },
                {
                    name: "Graduation",
                    description: "Marks academic achievements; gifts are given to recognize this milestone.",
                },
                {
                    name: "Housewarming",
                    description: "A time to give gifts to someone who just moved into a new home.",
                },
                {
                    name: "Engagement",
                    description: "A celebration of a couple’s promise to marry; gifts may be given to wish them well.",
                },
                {
                    name: "New Year's Day",
                    description: "A fresh start to the year, often celebrated with small gifts or greetings.",
                },
                {
                    name: "Easter",
                    description: "A spring holiday; children often receive candy or small toys.",
                },
                {
                    name: "Halloween",
                    description: "October 31st; children go trick-or-treating and receive candy.",
                },
                {
                    name: "Retirement",
                    description:
                        "Celebrating someone’s end of their career; gifts express appreciation and congratulations.",
                },
                {
                    name: "Promotion",
                    description: "A time to give congratulatory gifts when someone advances in their job.",
                },
                {
                    name: "Get Well Soon",
                    description: "Gifts or cards are given to wish someone a speedy recovery.",
                },
                {
                    name: "Sympathy",
                    description: "Flowers or cards are given to express condolences for someone’s loss.",
                },
                {
                    name: "Just Because",
                    description: "Giving a gift with no specific reason, simply to show you care.",
                },
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
    },
};
