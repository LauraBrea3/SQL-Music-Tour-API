const events = require("express").Router();
const db = require ("../models");
const { Event, Meet_Greet, Set_Time, Stage, Band } = db;
const { Op } = require("sequelize");

//Find all events
events.get('/', async (req,res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [["date", "ASC"]],
            where: {
              name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
          });
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
});

//FInd a specific event
events.get('/:name', async (req,res) => {
  try {
    const foundEvent = await Event.findOne({
      where: { name: req.params.name },
      include: [
        {
        model: Meet_Greet,
        as: "meet_greets",
        attributes: { exclude: [ "event_id", "band_id" ] },
        include: {
          model: Band,
          as: "band",
        }
      },
      {
        model: Set_Time,
        as: "set_times",
        attributes: { exclude: [ "event_id", "stage_id", "band_id" ] },
        include: [
          { model: Band, as: "band"},
          { model: Stage, as: "stage" }
        ]
      },
      {
        model: Stage,
        as: "stages",
        through: { attributes: [] }
      }
    ]
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