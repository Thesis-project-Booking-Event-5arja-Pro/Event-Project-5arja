const conn = require("../../database/index");

module.exports = {
  getAll: function (callback) {
    const sql = "SELECT * FROM `user`";
    conn.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getOne: function (callback, id) {
    const sql = "SELECT * FROM user where id =?";
    conn.query(sql, id, function (error, results) {
      callback(error, results);
    });
  },
  getOneClientByEmail: function (email, callback) {
    const sql = "SELECT * FROM user WHERE email = ? LIMIT 1";
    conn.query(sql, [email], (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        if (results.length === 0) {
          callback(null, null);
        } else {
          const user = results[0];
          callback(null, user);
        }
      }
    });
  },

  add: function (callback, userInfo) {
    const sql = "INSERT INTO  `user` SET ?";
    conn.query(sql, userInfo, function (error, results) {
      callback(error, results);
    });
  },
  deleteOne: function (callback, user_id) {
    const sql = "DELETE FROM user WHERE user_id = ?";
    conn.query(sql, user_id, function (error, results) {
      callback(error, results);
    });
  },
  updateOne: function (email, username, phoneNumber, hashedPassword, callback) {
    const sql = "UPDATE `user` SET username = ?, phone_number = ?, password = ? WHERE email = ?";
    conn.query(sql, [username, phoneNumber, hashedPassword, email], function (err, results) {
      callback(err, results);
    });
  },
  
  
  updatePassword: function (email, hashedPassword, callback) {
    const sql = "UPDATE `user` SET password = ? WHERE email = ?";
    conn.query(sql, [hashedPassword, email], function (err, results) {
      callback(err, results);
    });
  },

};




