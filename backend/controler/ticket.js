
const ticket=require("../database/model/ticket")
module.exports = {
    getAllticket: function(req, res) {
        ticket.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    addticket: function(req, res) {
        ticket.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },req.body)
    },
    getOneticket: function(req, res) {
        ticket.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    },

 deleteOneticket: function(req, res) {
    console.log(req.params.idticket);
        ticket.deleteOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    }
}