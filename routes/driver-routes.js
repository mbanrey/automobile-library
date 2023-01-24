const express = require('express')

const Campaign = require('../models/campaign')
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')

const router = express.Router()

// CREATE
// POST /notes
router.post('/notes', requireToken, (req, res, next) => {
    const campaignId = req.body.note.campaignId

    console.log(req.user)

    const note = req.body.note
    // adding an `owner` field
    note.owner = req.user._id

    // find the Campaign that I want to add the note too
    // once found `push` the note into the Mongoose Array
    // send status of 201 created if success
    // next if failure
    Campaign.findById(campaignId)
        .then(handle404)
        .then(campaign => {
            campaign.notes.push(note)

            // have to save the doc when modified
            return campaign.save()
        })
        .then(campaign => {
            res.status(201).json({ campaign: campaign })
        })
        .catch(next)
})

// UPDATE
// PATCH /notes/:id
router.patch('/notes/:noteId', (req, res, next) => {
    const campaignId = req.body.note.campaignId

    const noteBody = req.body.note

    Campaign.findById(campaignId)
        .then(handle404)
        .then(campaign => {
            // finding the note by it's id
            const note = campaign.notes.id(req.params.noteId)

            // setting the new note content to be the content passed in
            note.set(noteBody)

            // saving it
            // I have modified the doc I need to save it
            return campaign.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE /notes/:noteId
router.delete('/notes/:noteId', (req, res, next) => {
    const campaignId = req.body.note.campaignId

    Campaign.findById(campaignId)
        .then(handle404)
        .then(campaign => {
            //finding the correct note to remove
            //.remove() we delete it
            campaign.notes.id(req.params.noteId).remove()

            // since I've modified I have to save
            return campaign.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router