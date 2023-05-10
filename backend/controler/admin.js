
const eventplaners=require("../database/model/admin")
module.exports = {
    getAllEventplaner: function(req, res) {
        eventplaners.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    addEventplaner: function(req, res) {
        eventplaners.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.body])
    },
    getOneEventplaner: function(req, res) {
        eventplaners.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    },

 deleteOneEventplaner: function(req, res) {
    console.log(req.params.id);
        eventplaners.deleteOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    }
}