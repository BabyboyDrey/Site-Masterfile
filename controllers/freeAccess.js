const router = require("express").Router();
const rateLimit = require("../middlewares/rateLimit.js");
const asyncErrCatcher = require("../middlewares/asyncErrCatcher.js");
const userAuth = require("../middlewares/userAuth.js");
const getChaptGptResponse = require("../utils/openai.js");
const sanitizeInput = require("../utils/sanitizeText.js");
require("dotenv").config();

router.post(
  "/not-signed-in",
  rateLimit,
  asyncErrCatcher(async (req, res, next) => {
    try {
      let { prompt } = req.body;
      prompt = sanitizeInput(prompt);
      if (!prompt) {
        return res.status(400).json({
          error: true,
          message: "No prompt provided!",
        });
      }

      const response = await getChaptGptResponse(prompt);

      res.status(200).json({
        success: true,
        result: response,
      });
    } catch (err) {
      console.error(err);
      next(err.message);
    }
  })
);
router.post(
  "/signed-in",
  userAuth,
  rateLimit,

  asyncErrCatcher(async (req, res, next) => {
    try {
      let { prompt } = req.body;
      prompt = sanitizeInput(prompt);
      if (!prompt) {
        return res.status(400).json({
          error: true,
          message: "No prompt provided!",
        });
      }

      const response = await getChaptGptResponse(prompt);

      res.status(200).json({
        success: true,
        result: response,
      });
    } catch (err) {
      console.error(err);
      next(err.message);
    }
  })
);

module.exports = router;
