const sanitizeInput = (userPrompt) => {
  if (!userPrompt) throw new Error("No prompt provided!");

  const sanitizedText = userPrompt.trim().replace(/[<>]/g, "");
  console.log("Sanitized Prompt:", sanitizedText);

  if (sanitizedText.length < 5) {
    throw new Error("Prompt is too short! Please provide more detail.");
  }

  if (sanitizedText.length > 2000) {
    throw new Error("Prompt is too long! Please limit it to 2000 characters.");
  }

  return sanitizedText;
};

module.exports = sanitizeInput;
