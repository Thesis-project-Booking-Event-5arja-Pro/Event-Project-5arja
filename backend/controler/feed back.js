
const feedback=require("../database/model/feed back")
module.exports = {
    getAllfeedback: function(req, res) {
        feedback.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    addfeedback: function(req, res) {
        feedback.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },req.body)
    },
    getOnefeedback: function(req, res) {
        feedback.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    },

 deleteOnefeedback: function(req, res) {
    console.log(req.params.idfeedback);
        feedback.deleteOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    }
}