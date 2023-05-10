
const conn=require("../../database/index")

module.exports = {
    
    getAll: function (callback) {
      const sql = 'SELECT * FROM `comments`'
      conn.query(sql, function (error, results) {
        callback(error, results);
      });
    },
      
      getOne: function(callback,id) {
        const sql = 'SELECT * FROM comments where idcomments =?'
      conn.query(sql,id,function (error, results) {
        callback(error, results);
      });
        
      },
      
      add: function(callback,commentsInfo) {
        const sql = 'INSERT INTO comments set ?' 
        conn.query(sql,commentsInfo,function (error, results) {
          callback(error, results);
        });  
      },
      deleteOne: function(callback,idcomments) {
        const sql = 'DELETE FROM comments WHERE id  = ?' 
        conn.query(sql,idcomments,function (error, results ) {
          callback(error, results);
        });
      }
    }