const sanitizeInput = (userPrompt) => async (req, res, next) => {
  const sanitisedText = userPrompt.trim().replace(/[<>]/g, "");
  console.log("userPrompt:", userPrompt);
  if (sanitisedText.length < 5) {
    console.error("Prompt is too short! Please provide more detail.");
    return res.status(400).json({
      error: true,
      message: "Prompt is too short! Please provide more detail.",
    });
  }
  if (sanitisedText.length > 2000) {
    console.error("Prompt is too long! Please limit it to 2000 characters.");
    return res.status(400).json({
      error: true,
      message: "Prompt is too long! Please limit it to 2000 characters.",
    });
  }
  console.log("Text sanitized successfully:", sanitisedText);
  return sanitisedText;
};

module.exports = sanitizeInput;
