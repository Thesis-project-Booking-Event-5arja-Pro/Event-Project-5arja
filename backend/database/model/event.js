
const conn=require("../../database/index")

module.exports = {
    
    getAll: function (callback) {
      const sql = 'SELECT * FROM `event`'
      conn.query(sql, function (error, results) {
        callback(error, results);
      });
    },
      
      getOne: function(callback,id) {
        const sql = 'SELECT * FROM event where id =?'
      conn.query(sql,id,function (error, results) {
        callback(error, results);
      });
        
      },
      
      add: function(callback,eventInfo) {
     
        const sql = 'INSERT INTO  `event` SET ?' 
        conn.query(sql,eventInfo,function (error, results) {
          callback(error, results);
        });  
      },
      deleteOne: function(callback,idevent) {
        const sql = 'DELETE FROM event WHERE id = ?' 
        conn.query(sql,idevent,function (error, results ) {
          callback(error, results);
        });
      }
    }