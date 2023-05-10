
const client=require("../database/model/client")
module.exports = {
    getAllclient: function(req, res) {
        client.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    addclient: function(req, res) {
        client.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },req.body)
    },
    getOneclient: function(req, res) {
        client.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    },

 deleteOneclient: function(req, res) {
    console.log(req.params.id);
        client.deleteOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    }
}