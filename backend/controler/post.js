
const post=require("../database/model/post")
module.exports = {
    getAllpost: function(req, res) {
        post.getAll(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        })
    },
    addpost: function(req, res) {
        post.add(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },req.body)
    },
    getOnepost: function(req, res) {
        post.getOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    },

 deleteOnepost: function(req, res) {
    console.log(req.params.id);
        post.deleteOne(function(err, results) {
            if(err) res.status(500).send(err);
            else res.json(results)
        },[req.params.id])
    
    }
}