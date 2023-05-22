const booking = require("../database/model/booking");
module.exports = {
  getAllbooking: function (req, res) {
    booking.getAll(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  },
  addbooking: function (req, res) {
    const bookingInfo = {
      user_id: req.body.user_id,
      event_id: req.body.event_id,
    };

    booking.add(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    }, bookingInfo);
  },
  getOnebooking: function (req, res) {
    booking.getOne(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      req.params.email // Use the correct parameter name here (e.g., user_id)
    );
  },

  deleteOnebooking: function (req, res) {
    booking.deleteOne(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      [req.params.id]
    );
  },
};
