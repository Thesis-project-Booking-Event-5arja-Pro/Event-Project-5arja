
const events=require("../database/model/event")
module.exports = {
    getAllEvent: function(req, res) {
        events.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    addEvent: function(req, res) {
        events.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },req.body)
    },
    getOneEvent: function(req, res) {
        events.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    },

 deleteOneEvent: function(req, res) {
    console.log(req.params.idevent);
        events.deleteOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.idevent])
    
    }
}