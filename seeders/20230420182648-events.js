'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('events', [{
      name: " Coachella ",
      date: new Date(),
      start_time: new Date(),
      end_time: new Date()
    },
    {
      name: " Rolling Loud ",
      date: new Date(),
      start_time: new Date(),
      end_time: new Date()
    },
  ], {});
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
