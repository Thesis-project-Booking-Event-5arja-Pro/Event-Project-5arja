
const liked=require("../database/model/likes")
module.exports = {
    getAlliked: function(req, res) {
        liked.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    addliked: function(req, res) {
        liked.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },req.body)
    },
    getOneliked: function(req, res) {
        liked.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.email])
    
    },

 deleteOneliked: function(req, res) {
    console.log(req.params.idliked);
        liked.deleteOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    }
}