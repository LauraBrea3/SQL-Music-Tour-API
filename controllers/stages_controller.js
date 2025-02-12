const stages = require("express").Router();
const db = require ("../models");
const { Stage, Event } = db;
const { Op } = require("sequelize");

//Find all stages
stages.get('/', async (req,res) => {
    try {
        const foundStages = await Stage.findAll({
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
});

//Find a specific stage 
stages.get('/:name', async (req,res) => {
    try {
        const foundStages = await Stage.findOne({
            where: { name: req.params.name },
            include: {
                model:Event,
                as: "events",
                through: { attributes: [] }
            },
            order: [
                [{model: Event, as: "events"}, 'date', 'ASC'],
            ]
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
});

//Create a stage
stages.post('/', async (req,res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage
        })
    } catch (error) {
        res.status(500).json(error)
    }
});

//Update a stage
stages.put('/:id', async (req,res) => {
    try {
        const updateStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updateStages} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
});

//Delete a stage 
stages.delete('/:id', async (req,res) => {
    try {
        const deleteStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deleteStages} stage(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = stages