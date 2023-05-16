
const conn=require("../../database/index")

module.exports = {
    
    getAll: function (callback) {
      const sql = 'SELECT * FROM `ticket`'
      conn.query(sql, function (error, results) {
        callback(error, results);
      });
    },
      
      getOne: function(callback,id) {
        const sql = 'SELECT * FROM ticket where id =?'
      conn.query(sql,id,function (error, results) {
        callback(error, results);
      });
        
      },
      
      add: function(callback,ticketInfo) {
        const sql = 'INSERT INTO ticket set  ?' 
        conn.query(sql,ticketInfo,function (error, results) {
          callback(error, results);
        });  
      },
      deleteOne: function(callback,idticket) {
        const sql = 'DELETE FROM ticket WHERE id = ?' 
        conn.query(sql,idevent,function (error, results ) {
          callback(error, results);
        });
      }
    }