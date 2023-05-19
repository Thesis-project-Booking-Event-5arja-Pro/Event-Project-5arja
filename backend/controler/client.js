const client = require("../database/model/client");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const validator = require("email-validator");
const { google } = require("googleapis");
const AccessToken="ya29.a0AWY7CknJA7MAiH7qf573yoVkzdHE8zm75ElI1mWd0NjWKrapuwGL_baXPC7fFyM7MOYsXpzxMgO72hh5bUPd9U_Q03kwbo6VUjoAe3USmrBcbS_GQxz9bjK7TAgQnYmT4GdVB5HRpUJ4y670mUY3zjh6gSrRaCgYKAScSARASFQG1tDrpA4sgjalTUKBVrILCiD_Jtg0163"
const refreshToken="1//04VPp5gGdZbT_CgYIARAAGAQSNgF-L9IrCQUIGpqzss356QVLSScItBDdrpE7GAyqxL6_HQ89rxoPK9Qvn3WFNU0SS-R6OqXNtg"
module.exports = {
  getAllClients(req, res) {
    client.getAll((err, results) => {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  },
  addClient(req, res) {
    const { email, password, img } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        res.status(500).send("Error adding client");
        return;
      }

      if (!validator.validate(email)) {
        console.log("Email is invalid.");
        res.status(400).send("nvalid email address");
        return;
        }admin
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
            img: req.body.img,
          };
    
          const temporaryPassword = generateTemporaryPassword();
          sendPasswordResetEmail(email, temporaryPassword);
    
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
                })
                .catch((error) => {
                  console.error("Error creating custom token:", error);
                  res.status(500).send("Error creating custom token");
                });
            }
          }, clientInfo);
        })
        .catch((error) => {
          console.error("Error registering:", error);
          res.status(500).send("Error registering user");
        });
    })
  },
  signIn(req, res) {
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

  resetPassword: (req, res) => {
    const { email } = req.body;

    if (!validator.validate(email)) {
      console.log("Email is invalid.");
      res.status(400).send("Invalid email address");
      return;
    }

    const temporaryPassword = generateTemporaryPassword();

    bcrypt.hash(temporaryPassword, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing temporary password:", err);
        res.status(500).send("Error resetting password");
        return;
      }

      client.updatePassword(email, hashedPassword, (error, results) => {
        if (error) {
          console.error("Error updating password:", error);
          res.status(500).send("Error resetting password");
        } else {
          // Send password reset email
          sendPasswordResetEmail(email, temporaryPassword);
          res.status(200).send("Password reset email sent");
        }
      });
    });
  },
  sendPasswordResetEmail: function (email, temporaryPassword) {
    const mailOptions = {
      from: "kharja666@gmail.com",
      to: email,
      subject: "New Password",
      text: `Your new password is: ${temporaryPassword}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending password reset email:", error);
      } else {
        console.log("Password reset email sent:", mailOptions);
      }
    });
  },
  getOneClient(req, res) {
    client.getOne(
      (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      [req.params.id]
    );
  },

  deleteOneClient(req, res) {
    console.log(req.params.id);
    client.deleteOne(
      (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      [req.params.id]
    );
  },

  updateClient(req, res) {
    const { password, email, firstName, phoneNumber } = req.body;

    client.getOneClientByEmail(email, (error, user) => {
      if (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "no client found" });
        return;
      }

      if (!user) {
        console.error("canont update user not found");
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(401).send(err);
        } else if (!result) {
          res.status(401).send("Incorrect password");
        } else {
          client.updateOne(email, firstName, phoneNumber, (err, results) => {
            if (err) {
              console.error("Error updating client:", err);
              res.status(500).send("Error updating client");
            } else {
              res.json(results);
            }
          });
        }
      });
    });
  },
};

async function sendPasswordResetEmail(email, temporaryPassword) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      "597493550999-s1ibkpjismj67uvmh6oupto9602rgn2t.apps.googleusercontent.com",
      "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",
      "https://mail.google.com"
    );
    

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });
    
const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "kharja666@gmail.com",
        clientId: "597493550999-s1ibkpjismj67uvmh6oupto9602rgn2t.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: refreshToken,
        accessToken: AccessToken,
      },
    });

    const mailOptions = {
      from: "kharja666@gmail.com",
      to: email,
      subject: "New Password",
      text: `Your new password is: ${temporaryPassword}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", temporaryPassword);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
}


function generateTemporaryPassword() {
  const length = 8;
  const chara =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let temporaryPassword = "";

  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * chara.length);
    temporaryPassword += chara[rand];
  }

  return temporaryPassword;
}
