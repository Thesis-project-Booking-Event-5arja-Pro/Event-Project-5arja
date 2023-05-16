const client = require("../database/model/client");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");

module.exports = {
  getAllclient: function (req, res) {
    client.getAll(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  },
  addClient: function (req, res) {
    const { email, password } = req.body;

    // Generate a hash of the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        res.status(500).send("Error adding client");
        return;
      }
      admin
        .auth()
        .createUser({
          email: email,
          password: hashedPassword,
        })
        .then((userRecord) => {
          const clientInfo = {
            firstName: req.body.firstName,
            email: req.body.email,
            password: hashedPassword,
            phoneNumber: req.body.phoneNumber,
          };
          client.add((error, results) => {
            if (error) {
              console.error("Error adding client:", error);
              res.status(500).send("Error adding client");
            } else {
              return admin
                .auth()
                .createCustomToken(userRecord.uid)
                .then((customToken) => {
                  console.log(customToken);
                  res.json(customToken);
                });
            }
          }, clientInfo);
        })
        .catch((error) => {
          console.error("Error registering :", error);
          res.status(500).send("Error registering user");
        });
    });
  },
  signIn: function (req, res) {
    const { email, password } = req.body;

    client.getOneClientByEmail(email, (error, user) => {
      if (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "Sign-in failed" });
        return;
      }

      if (!user) {
        console.error("Sign-in failed: User not found");
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          console.error("Sign-in failed: Invalid email or password");
          res.status(401).json({ error: "Invalid email or password" });
        } else {
          // Generate a new token for the user
          admin
            .auth()
            .createCustomToken(user.email)
            .then((token) => {
              res.json({ user, token });
            })
            .catch((error) => {
              console.error("Token generation failed:", error);
              res.status(500).json({ error: "Token generation failed" });
            });
        }
      });
    });
  },
  getOneclient: function (req, res) {
    client.getOne(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      [req.params.id]
    );
  },

  deleteOneclient: function (req, res) {
    console.log(req.params.id);
    client.deleteOne(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      [req.params.id]
    );
  },
  
 
};
