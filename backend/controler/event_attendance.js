
const event_attendance=require("../database/model/event_attendance")
module.exports = {
    getAllevent_attendance: function(req, res) {
        event_attendance.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    addevent_attendance: function(req, res) {
        event_attendance.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },req.body)
    },
    getOneevent_attendance: function(req, res) {
        event_attendance.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    },

 deleteOneevent_attendance: function(req, res) {
    console.log(req.params.id);
        event_attendance.deleteOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    }
}