
const conn=require("../index")

module.exports = {
    
    getAll: function (callback) {
      const sql = 'SELECT * FROM `liked`'
      conn.query(sql, function (error, results) {
        callback(error, results);
      });
    },
      
      getOne: function(callback,email) {
        const sql =
      "SELECT Event.* FROM Event JOIN liked ON Event.event_id = liked.event_id JOIN User ON User.user_id = liked.user_id WHERE User.email = ?";
      conn.query(sql,[email],function (error, results) {
        callback(error, results);
      });
        
      },
      
      add: function(callback,likedInfo) {
        const { user_id, event_id } = likedInfo;
        const sql = 'INSERT INTO liked (user_id, event_id) VALUES (?, ?)' 
        conn.query(sql,[user_id, event_id],function (error, results) {
          callback(error, results);
        });  
      },
      deleteOne: function(callback,liked_id) {
        const sql = 'DELETE FROM liked WHERE id = ?' 
        conn.query(sql,liked_id,function (error, results ) {
          callback(error, results);
        });
      }
    }