const conn = require("../../database/index");

module.exports = {
  getAll: function (callback) {
    const sql = "SELECT * FROM `booking`";
    conn.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getOne: function (callback, email) {
    const sql =
      "SELECT Event.* FROM Event JOIN Booking ON Event.event_id = Booking.event_id JOIN User ON User.user_id = Booking.user_id WHERE User.email = ?";
    conn.query(sql, [email], function (error, results) {
      callback(error, results);
    });
  },
  add: function (callback, bookingInfo) {
    const { user_id, event_id } = bookingInfo;
    const sql = "INSERT INTO booking (user_id, event_id) VALUES (?, ?)";
    conn.query(sql, [user_id, event_id], function (error, results) {
      callback(error, results);
    });
  },
  deleteOne: function (callback, booking_id) {
    const sql = "DELETE FROM booking WHERE booking_id = ?";
    conn.query(sql, booking_id, function (error, results) {
      callback(error, results);
    });
  },
};
