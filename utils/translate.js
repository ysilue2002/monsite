const translate = require("google-translate-api-x");

// Traduction simple
async function translateText(text, fromLang, toLang) {
  try {
    const result = await translate(text, { from: fromLang, to: toLang });
    return result.text;
  } catch (err) {
    console.error("Erreur de traduction:", err);
    return text; // Retourner le texte original si erreur
  }
}

module.exports = {
  translate: translateText,
};