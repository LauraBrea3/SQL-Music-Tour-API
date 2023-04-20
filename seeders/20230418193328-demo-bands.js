'use strict';

const { INTEGER, DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('bands', [{
        name: " Doe-Z-Doe ",
        genre: " Lo-Fi ",
        available_start_time: new Date(),
        end_time: new Date()
      },
      {
        name: " Romeo Santos ",
        genre: " Bachata ",
        available_start_time: new Date(),
        end_time: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /*await queryInterface.bulkDelete('bands', null, {})*/;
  }
};
