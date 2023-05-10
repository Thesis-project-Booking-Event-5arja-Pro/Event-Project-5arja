
const conn=require("../../database/index")

module.exports = {
    
    getAll: function (callback) {
      const sql = 'SELECT * FROM `post`'
      conn.query(sql, function (error, results) {
        callback(error, results);
      });
    },
      
      getOne: function(callback,id) {
        const sql = 'SELECT * FROM post where id =?'
      conn.query(sql,id,function (error, results) {
        callback(error, results);
      });
        
      },
      
      add: function(callback,postInfo) {
        const sql = 'INSERT INTO post set  ?' 
        conn.query(sql,postInfo,function (error, results) {
          callback(error, results);
        });  
      },
      deleteOne: function(callback,idpost) {
        const sql = 'DELETE FROM post WHERE id = ?' 
        conn.query(sql,idevent,function (error, results ) {
          callback(error, results);
        });
      }
    }