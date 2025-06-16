import { useState, useEffect } from "react";
import Publicite from "./Publicite"; // ✅ Import du composant publicité

export default function App() {
  const [language, setLanguage] = useState("ar");
  const [activeTab, setActiveTab] = useState("accueil");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les données via l’API serverless
  useEffect(() => {
    fetch("/api/scrape")
      .then((res) => res.json())
      .then((data) => {
        setNewsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setNewsData([
          {
            title: {
              ar: "فشل في تحميل الأخبار",
              fr: "Échec du chargement des actualités",
              en: "Failed to load news",
            },
            summary: {
              ar: "حاول مرة أخرى لاحقًا.",
              fr: "Veuillez réessayer plus tard.",
              en: "Please try again later.",
            },
            category: {
              ar: "خطأ",
              fr: "Erreur",
              en: "Error",
            },
          },
        ]);
        setLoading(false);
      });
  }, []);

  const translations = {
    ar: {
      title: "أخبار العرب",
      home: "الرئيسية",
      news: "الأخبار",
      about: "عن الموقع",
      contact: "اتصل بنا",
      latestNews: "آخر الأخبار",
      loading: "جاري التحميل...",
      readMore: "اقرأ المزيد",
      copyright: "© 2025 أخبار العرب. جميع الحقوق محفوظة.",
    },
    fr: {
      title: "Arab News",
      home: "Accueil",
      news: "Actualités",
      about: "À propos",
      contact: "Contact",
      latestNews: "Dernières actualités",
      loading: "Chargement...",
      readMore: "En savoir plus",
      copyright: "© 2025 Arab News. Tous droits réservés.",
    },
    en: {
      title: "Arab News",
      home: "Home",
      news: "News",
      about: "About",
      contact: "Contact",
      latestNews: "Latest News",
      loading: "Loading...",
      readMore: "Read more",
      copyright: "© 2025 Arab News. All rights reserved.",
    },
  };

  const t = translations[language];

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Language Switcher */}
      <div className="text-right px-6 py-2 bg-blue-600 text-white">
        <span className="font-semibold">Langue / اللغة:</span>
        <button onClick={() => setLanguage("ar")} className={`mx-1 ${language === 'ar' ? 'underline font-bold' : ''}`}>عربي</button>
        <button onClick={() => setLanguage("fr")} className={`mx-1 ${language === 'fr' ? 'underline font-bold' : ''}`}>Français</button>
        <button onClick={() => setLanguage("en")} className={`mx-1 ${language === 'en' ? 'underline font-bold' : ''}`}>English</button>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t.title}</h1>
          <nav className="hidden md:flex space-x-6 rtl:space-x-reverse">
            <button onClick={() => setActiveTab("accueil")} className={`${activeTab === "accueil" ? "font-bold underline" : ""}`}>
              {t.home}
            </button>
            <button onClick={() => setActiveTab("اخبار")} className={`${activeTab === "اخبار" ? "font-bold underline" : ""}`}>
              {t.news}
            </button>
            <button onClick={() => setActiveTab("من-نحن")} className={`${activeTab === "من-نحن" ? "font-bold underline" : ""}`}>
              {t.about}
            </button>
            <button onClick={() => setActiveTab("اتصل-بنا")} className={`${activeTab === "اتصل-بنا" ? "font-bold underline" : ""}`}>
              {t.contact}
            </button>
          </nav>
          <button className="md:hidden">
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* ✅ Bannière publicitaire Google Ads */}
      <Publicite />

      {/* Hero Section */}
      {activeTab === "accueil" && (
        <section className="relative bg-cover bg-center h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center text-white"
          style={{ backgroundImage: "url('https://picsum.photos/1600/900')"  }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 text-center max-w-xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              {t.heroTitle}
            </h2>
            <p className="text-lg sm:text-xl mb-6">
              {t.heroDesc}
            </p>
            <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transform hover:scale-105 transition">
              {t.readMore}
            </button>
          </div>
        </section>
      )}

      {/* News Section */}
      {activeTab === "اخبار" && (
        <>
          {/* ✅ Autre bannière optionnelle au-dessus des news */}
          {/* <Publicite /> */}

          <main className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{t.latestNews}</h2>

            {loading ? (
              <p className="text-center text-xl">{t.loading}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsData.map((article, index) => (
                  <article key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <div className="p-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full mb-2">
                        {article.category?.[language] || "غير مصنف"}
                      </span>
                      <h3 className="text-lg font-bold mb-2">{article.title?.[language]}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{article.summary?.[language]}</p>
                      <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                        {t.readMore} →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {/* ✅ Bannière publicitaire avant le footer */}
      <Publicite />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">{t.title}</h3>
              <p className="text-sm text-gray-400">Plateforme d'actualité arabe</p>
            </div>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-white"><FacebookIcon /></a>
              <a href="#" className="text-gray-400 hover:text-white"><TwitterIcon /></a>
              <a href="#" className="text-gray-400 hover:text-white"><InstagramIcon /></a>
              <a href="#" className="text-gray-400 hover:text-white"><YoutubeIcon /></a>
            </div>
          </div>
          <hr className="my-6 border-gray-700" />
          <div className="text-center text-sm text-gray-500">{t.copyright}</div>
        </div>
      </footer>
    </div>
  );
}