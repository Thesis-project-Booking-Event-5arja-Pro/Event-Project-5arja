
const conn=require("../index")

module.exports = {
    
    getAll: function (callback) {
      const sql = 'SELECT * FROM `admin`'
      conn.query(sql, function (error, results) {
        callback(error, results);
      });
    },
      
      getOne: function(callback,id) {
        const sql = 'SELECT * FROM admin where admin =?'
      conn.query(sql,id,function (error, results) {
        callback(error, results);
      });
        
      },
      
      add: function(callback,eventInfo) {
        const sql ='INSERT INTO  `admin` SET ?' 
        conn.query(sql,eventInfo,function (error, results) {
          callback(error, results);
        });  
      },
      deleteOne: function(callback,event_planer) {
        const sql = 'DELETE FROM admin  WHERE id = ?' 
        conn.query(sql,event_planer,function (error, results ) {
          callback(error, results);
        });
      }
    }