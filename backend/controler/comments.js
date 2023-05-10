
const comments=require("../database/model/comments")
module.exports = {
    getAllcomments: function(req, res) {
        comments.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    addcomments: function(req, res) {
        comments.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },req.body)
    },
    getOnecomments: function(req, res) {
        comments.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    },

 deleteOnecomments: function(req, res) {
    console.log(req.params.id);
        comments.deleteOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    }
}