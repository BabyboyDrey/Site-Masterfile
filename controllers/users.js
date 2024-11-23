const asyncErrCatcher = require("../middlewares/asyncErrCatcher");
const users = require("../models/users");
const bcrypt = require("bcryptjs");
const userAuthToken = require("../utils/userAuthToken");
const router = require("express").Router();

router.post(
  "/sign-up",
  asyncErrCatcher(async (req, res) => {
    const userToken = "Verified Login";

    try {
      const { email, password } = req.body;

      const foundUser = await users.findOne({ email: email });

      if (foundUser) {
        return res.status(400).json("User already exists");
      }
      const salt = await bcrypt.genSalt(12);
      const hashedPass = await bcrypt.hash(password, salt);

      const user = {
        email: email,

        password: hashedPass,
      };

      const newUser = await users.create(user);

      userAuthToken(newUser, 200, res);
    } catch (err) {
      console.error(err);
      next(err.message);
    }
  })
);

router.post(
  "/login",
  asyncErrCatcher(async (req, res) => {
    const userToken = "Verified Login";

    try {
      const userEmail = req.body.email;

      const foundUser = await users
        .findOne({ email: userEmail })
        .maxTimeMS(50000);

      if (foundUser) {
        const validated = await bcrypt.compare(
          req.body.password,
          foundUser.password
        );
        if (!validated) {
          return res.status(400).json("Wrong credentials, try again");
        } else {
          userAuthToken(foundUser, 200, res);
        }
      } else {
        return res.status(400).json("User doesn't exist");
      }
    } catch (err) {
      res.status(500).json(`Err encountered: ${err}`);
    }
  })
);

module.exports = router;
