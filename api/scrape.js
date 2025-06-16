const axios = require("axios");
const cheerio = require("cheerio");
const { translate } = require("../utils/translate");

// Liste des sites à scraper
const SOURCES = [
  {
    name: "cnn",
    url: "https://edition.cnn.com/world/middle-east", 
    selector: ".container__headline", // Sélecteur CSS pour titres d'articles
  },
  {
    name: "france24",
    url: "https://www.france24.com/fr/info-en-continu/", 
    selector: ".article__title",
  },
  {
    name: "rfi",
    url: "https://www.rfi.fr/fr/international/", 
    selector: ".item__title-link",
  },
];

export default async function handler(req, res) {
  try {
    const results = [];

    for (const source of SOURCES) {
      const response = await axios.get(source.url);
      const $ = cheerio.load(response.data);

      $(source.selector).each((index, element) => {
        if (index < 5) {
          const title = $(element).text().trim();
          const link = $(element).attr("href");

          results.push({
            title: {
              ar: translate(title, "fr", "ar"),
              fr: title,
              en: translate(title, "fr", "en"),
            },
            summary: {
              ar: "مُلخّص تلقائي للخبر.",
              fr: "Résumé automatique de l'article.",
              en: "Automated article summary.",
            },
            source: source.name.toUpperCase(),
            category: {
              ar: "عالمي",
              fr: "International",
              en: "World",
            },
          });
        }
      });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors du scraping." });
  }
}