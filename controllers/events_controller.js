const events = require("express").Router();
const db = require ("../models");
const { Event } = db;
const { Op } = require("sequelize");

//Find all events
events.get('/', async (req,res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [["date", "ASC"]],
          });
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
});

//FInd a specific event
events.get('/:id', async (req,res) => {
  try {
    const foundEvent = await Event.findOne({
      where: { event_id: req.params.id }
    })
    res.status(200).json(foundEvent)
  } catch (error) {
      res.status(500).json(error)
  }
});

//Create and Event
events.post('/', async (req,res) => {
  try {
    const newEvent = await Event.create(req.body)
    res.status(200).json({
      message: 'Succesfully inserted a new event',
      data: newEvent
    })
  } catch (error) {
    res.status(500).json
  }
});

//Update an Event
events.put('/:id', async (req,res) => {
  try {
    const updateEvents = await Event.update(req.body, {
      where: {
        event_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully updated ${updateEvents} event(s)`
    })
  } catch (error) {
    res.status(500).json(error)
  }
});

//Delete an event
events.delete('/:id', async (req,res) => {
  try {
    const deleteEvents = await Event.destroy({
      where: {
        event_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully deleted ${deleteEvents} event(s)`
    })
  } catch (error) {
    res.status(500).json(error)
  }
})


module.exports = events