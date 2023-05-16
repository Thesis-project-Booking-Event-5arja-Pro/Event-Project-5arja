
const conn=require("../../database/index")

module.exports = {
    
    getAll: function (callback) {
      const sql = 'SELECT * FROM `event_attendance`'
      conn.query(sql, function (error, results) {
        callback(error, results);
      });
    },
      
      getOne: function(callback,id) {
        const sql = 'SELECT * FROM event_attendance where id =?'
      conn.query(sql,id,function (error, results) {
        callback(error, results);
      });
        
      },
      
      add: function(callback,event_attendanceInfo) {
        const sql = 'INSERT INTO  `event_attendance` SET ?' 
        conn.query(sql,event_attendanceInfo,function (error, results) {
          callback(error, results);
        });  
      },
      deleteOne: function(callback,idevent_attendance) {
        const sql = 'DELETE FROM event_attendance WHERE id = ?' 
        conn.query(sql,idevent_attendance,function (error, results ) {
          callback(error, results);
        });
      }
    }