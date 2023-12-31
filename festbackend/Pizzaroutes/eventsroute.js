const express = require('express');
const router = express.Router();/// This Router object of express with the help of that we can create different route
const multer = require("multer");
const path = require("path");

const festmodel = require('../eventmodel/festmodel');
const participationmodel = require('../eventmodel/participationmodel')

//GET ALL PIZZA || GET REQUEST

router.get('/getallevent', async (req, res) => {
    try {
        const events = await festmodel.find({});
        console.log("hellooo event...", events)
        res.send(events)
    }


    catch (error) {
        res.json({ message: error })
    }
})

router.post('/addevent', async (req, res) => {

    try {
        const new_event = await festmodel.create(req.body)
        res.status(201).json({
            message: "Event Created",
            data: new_event
        })
    }
    catch (err) {
        res.status(400).json({
            message: err
        })
    }

})

router.get('/getallparticipant', async (req, res) => {
    try {
        const participant = await participationmodel.find();
        res.send(participant)


    } catch (error) {
        res.json({ message: error })

    }
})

router.get('/events/:org', async (req, res) => {

    try {
        var org = req.params.org;
        const events = await festmodel.find({ Organizedby: org }).populate('enrolled_students')
        console.log("events ", events)
        res.status(200).json({
            message: "Events",
            data: events
        })

    } catch (e) {
        res.json({ message: e })
    }
})

router.get('/event/:id', async (req, res) => {

    try {
        var id = req.params.id
        var eventData = await festmodel.findById(id).populate('enrolled_students').exec()
        res.status(200).json({
            message: "Event Fecthed",
            data: eventData
        })
    }
    catch (e) {
        res.status(401).json({
            message: e
        })
    }

})

router.delete('/:id', async (req, res) => {

    var id = req.params.id
    festmodel.findByIdAndDelete(id, (success, err) => {

        if (success) {
            res.status(200).json({
                message: "Event deleted"
            })
        }
        else {
            res.status(500).send()
        }

    })
})

router.post('/addparticipant/:eid/:sid', async (req, res) => {

    try {
        var eventId = req.params.eid
        var id = req.params.sid
        var add_participant = await festmodel.findByIdAndUpdate(eventId, { $push: { enrolled_students: id } })
        console.log('---', add_participant)
        res.status(200).json({
            message: "Student Added To Event",
        })
    }
    catch (err) {
        res.status(401).json({
            message: "Error"
        })
    }

})

router.put('/update/:eid', async (req, res) => {

    try {
        var eventId = req.params.eid
        var updated_event = await festmodel.findByIdAndUpdate(eventId, req.body, { new: true })
        res.status(201).json({
            message: "Event Updated",
            data: updated_event
        })
    } catch (e) {
        res.status('401').json({
            message: "Error"
        })
    }

})

const storage = multer.diskStorage({
    destination: '../src/Images',
    filename: (req, file, ab) => {
        ab(null, file.originalname);
    },
});

const upload = multer(
    {
        storage: storage,
        limits: { fileSize: 9000000 },

    }).single("file");

router.post('/addeventimage', (req, res) => {

    upload(req, res, (err) => {

        if (err) {
            return res.status(400).json({ error: err.message });
        }
        else {
            res.json({
                file: req.file,
                message: "File uploaded successfully",
            })
        }
    });
});


module.exports = router;