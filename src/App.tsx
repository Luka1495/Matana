import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaWineGlassAlt } from "react-icons/fa";

interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode; // za emoji
  logo?: string; // za sliku
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Lista slika za slideshow
  const slides = [
    "/images/slika01.jpg",
    "/images/slika02.jpg",
    "/images/slika03.jpg",
    "/images/slika04.jpg",
    "/images/slika05.jpg",
    "/images/slika06.jpg",
    "/images/slika07.jpg",
    "/images/slika08.jpg",
    "/images/slika09.jpg",
  ];

  // Preload slike za bolju performansu
  useEffect(() => {
    slides.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Automatski slideshow - mijenja sliku svake 4 sekunde
  useEffect(() => {
    if (activeSection === "home") {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [activeSection, slides.length]);

  const navigationItems: NavigationItem[] = [
    { id: "lokacija", label: "LOKACIJA", icon: "📌" },
    { id: "ponuda", label: "PONUDA", icon: <FaWineGlassAlt size={20} /> },
    { id: "home", label: "", logo: "/images/LOGO_MATANA.png" },
    { id: "o-nama", label: "O NAMA", icon: "👥" },
    { id: "kontakt", label: "KONTAKT", icon: "📞" },
  ];

  const cardStyle =
    "bg-gradient-to-br from-white via-gray-50 to-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl";

  const renderContent = () => {
    switch (activeSection) {
      case "lokacija":
        return (
          <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 font-[Playfair Display] mb-6 sm:mb-12">
              LOKACIJA
            </h2>

            <div
              className={`${cardStyle} border border-gray-200 max-w-4xl mx-auto p-4 sm:p-8`}
            >
              {/* Naslov s ikonom */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl">📌</span>
                <h3 className="text-2xl sm:text-3xl font-[Dancing Script] text-gray-700">
                  Pronađite nas
                </h3>
              </div>

              {/* Opis */}
              <p className="text-base sm:text-xl leading-relaxed font-serif text-gray-700 mb-4 sm:mb-6">
                Pronađite nas u Slavoniji, Brodsko-posavskoj županiji u mjestu
                Gornji Crnogovci.
              </p>

              {/* Karta */}
              <div className="mb-4 sm:mb-6 rounded-xl overflow-hidden shadow-sm h-56 sm:h-64 md:h-80">
                <iframe
                  title="Lokacija - Sala Matana"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2744.6529964664356!2d17.4919137!3d45.2087507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475d8b0042cfe8c3%3A0xfaa6f3270977ffa2!2sMatana!5e0!3m2!1shr!2shr!4v1724160000000!5m2!1shr!2shr"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Dugme */}
              <div className="text-center">
                <a
                  href="https://www.google.com/maps/place/Matana/@45.2082341,17.490116,17z/data=!3m1!4b1!4m6!3m5!1s0x475d8b0042cfe8c3:0xfaa6f3270977ffa2!8m2!3d45.2082303!4d17.4926909!16s%2Fg%2F11vk47vny5?entry=ttu&g_ep=EgoyMDI1MDgxNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 text-base sm:text-lg md:text-xl bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition-all w-full sm:w-auto"
                >
                  🗺️ Otvori u Google Maps
                </a>
              </div>
            </div>
          </div>
        );

      case "ponuda":
        return (
          <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 font-[Playfair Display] mb-6 sm:mb-12">
              PONUDA
            </h2>
            <p className="mt-4 sm:mt-8 text-lg sm:text-2xl font-semibold text-gray-800 max-w-2xl mx-auto">
              Dobrodošli u naš svijet – svijet gdje priroda, tradicija i strast
              postaju jedno.
            </p>

            {/* Restoran */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              <img
                src="/images/slika1.jpeg"
                alt="Restoran"
                className="w-full rounded-2xl shadow-lg object-cover h-60 sm:h-80"
                loading="lazy"
              />
              <div>
                <h3 className="text-2xl sm:text-3xl font-[Dancing Script] text-gray-700 mb-4 sm:mb-6">
                  Restoran
                </h3>
                <ul className="list-disc list-inside space-y-2 sm:space-y-4 text-base sm:text-xl leading-relaxed font-serif text-gray-700 text-left">
                  <li>
                    <strong>Kapacitet:</strong> 80 mjesta
                  </li>
                  <li>
                    Uživajte u autentičnim specijalitetima pripremljenim od
                    svježih i lokalnih sastojaka iz vlastite proizvodnje u
                    ugodnom ambijentu našeg restorana.
                  </li>
                </ul>
              </div>
            </div>

            {/* Svečana dvorana */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              <img
                src="/images/slika2.jpeg"
                alt="Svečana dvorana"
                className="w-full rounded-2xl shadow-lg object-cover h-60 sm:h-80"
                loading="lazy"
              />
              <div>
                <h3 className="text-2xl sm:text-3xl font-[Dancing Script] text-gray-700 mb-4 sm:mb-6">
                  Svečana dvorana
                </h3>
                <ul className="list-disc list-inside space-y-2 sm:space-y-4 text-base sm:text-xl leading-relaxed font-serif text-gray-700 text-left">
                  <li>
                    <strong>Kapacitet:</strong> 150 mjesta
                  </li>
                  <li>
                    Idealna za vjenčanja, prezentacije, team buildinge i druge
                    svečanosti, ova moderna, zatvorena dvorana osigurava
                    nezaboravno iskustvo.
                  </li>
                </ul>
              </div>
            </div>

            {/* Poluotvorena terasa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
              <img
                src="/images/slika3.jpeg"
                alt="Poluotvorena terasa"
                className="w-full rounded-2xl shadow-lg object-cover h-60 sm:h-80"
                loading="lazy"
              />
              <div>
                <h3 className="text-2xl sm:text-3xl font-[Dancing Script] text-gray-700 mb-4 sm:mb-6">
                  Poluotvorena terasa s pogledom na jezero
                </h3>
                <ul className="list-disc list-inside space-y-2 sm:space-y-4 text-base sm:text-xl leading-relaxed font-serif text-gray-700 text-left">
                  <li>
                    <strong>Kapacitet:</strong> 100 mjesta
                  </li>
                  <li>
                    Savršena za uživanje na svježem zraku, uz roštilj i
                    mogućnost aktivnog sudjelovanja u pripremi jela.
                  </li>
                </ul>
              </div>
            </div>

            {/* Imanje i dodatni sadržaji */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-8 shadow-inner text-left sm:text-left space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl font-[Dancing Script] text-gray-700 mb-4 text-center sm:text-center">
                Imanje i dodatni sadržaji
              </h3>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-base sm:text-lg font-serif text-gray-700">
                <li>
                  Djeca će obožavati našu ponudu – mogućnost postavljanja
                  napuhanaca u sigurnom okruženju omogućava im bezbrižnu igru na
                  svježem zraku. Uz obilje prostora za istraživanje, ovo je
                  mjesto gdje će mališani doživjeti radost boravka u prirodi.
                </li>
                <li>
                  Uživajte u šetnjama uz jezero, istražite voćnjake ili
                  pronađite mir u sjenama naše šume. Priroda ovdje pruža ne samo
                  opuštanje već i priliku za povezivanje sa samim sobom i
                  najbližima.
                </li>
                <li>
                  Naše jezero s otokom nudi mogućnost pecanja – savršen izbor za
                  ljubitelje prirode i avanturističkog duha.
                </li>
                <li>
                  Za potpuni doživljaj, smjestite se u jednoj od naših četiri
                  dvokrevetne sobe s vlastitim kupaonicama, smještenim u
                  tradicionalnoj slavonskoj kući. Spoj autentičnog šarma i
                  modernog uređenja osigurava udobnost i jedinstveno iskustvo.
                </li>
              </ul>
            </div>
          </div>
        );

      case "o-nama":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 font-[Playfair Display] mb-8 sm:mb-12 text-center">
              O NAMA
            </h2>

            {/* Uvod */}
            <section className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
                Naša priča
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Od slavonskih polja do dalmatinskog mora, svaki kutak nudi
                jedinstvenu priču i iskustvo. Naša priča temelji se na
                dugogodišnjoj predanosti kvaliteti, održivosti i domaćoj
                proizvodnji.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Spoj iskustva i ljubavi prema prirodi rezultirao je stvaranjem
                jedinstvenog kompleksa koji objedinjuje odmor, zabavu i vrhunsku
                gastronomiju.
              </p>
            </section>

            {/* Proizvodi */}
            <section className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
                Naši proizvodi
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Bavimo se ratarskom i stočarskom proizvodnjom, a svi naši
                proizvodi dolaze s vlastitih polja i farmi, uzgojeni ekološki i
                na održiv način.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Ponosni smo na naš pogon za preradu suhomesnatih proizvoda, čije
                delicije možete pronaći u našoj mesnici. Svaki proizvod nosi
                pečat kvalitete i tradicije, pružajući autentičan okus domaće
                hrane.
              </p>
            </section>

            {/* Ugostiteljstvo i smještaj */}
            <section className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
                Ugostiteljstvo i smještaj
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Restoran Dukat i fast food Dukat u Novoj Gradiški omiljena su
                mjesta za uživanje u ukusnim jelima. Na našem imanju Anin i
                Matin stan u Gornjim Crnogovcima nudimo jedinstveni bijeg u
                prirodu.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Za one koji žele spojiti odmor uz more i vrhunsku uslugu,
                smještaj u Biogradu na Moru idealan je izbor. S opcijama
                polupansiona i punog pansiona, osigurali smo savršen boravak na
                obali.
              </p>
            </section>

            {/* Misija */}
            <section className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700">
                Naša misija
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Naša misija je stvoriti iskustvo koje se pamti – bilo da se radi
                o obroku pripremljenom od svježih, domaćih sastojaka,
                opuštajućoj šetnji prirodom ili nezaboravnom odmoru na moru.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-gray-700">
                Sa svakim korakom težimo očuvanju tradicije, promociji
                održivosti i stvaranju mjesta gdje se svatko osjeća dobrodošlim.
              </p>
            </section>
          </div>
        );

      case "kontakt":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-10 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 font-[Playfair Display] mb-8 sm:mb-12">
              KONTAKT
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-xl leading-relaxed font-serif text-gray-700">
                <strong>Telefon:</strong> 091 440 4002 – 091 440 4003
              </p>
              <p className="text-base sm:text-xl leading-relaxed font-serif text-gray-700">
                <strong>Email:</strong> ari.agro.az@gmail.com
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex justify-center">
              <a
                href="https://www.instagram.com/matin_i_anin_stan/profilecard/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500 transition-colors"
              >
                <FaInstagram size={40} className="sm:size-48" />
              </a>
            </div>
          </div>
        );
      case "home":
        return (
          <div className="relative w-full h-screen overflow-hidden bg-gray-900">
            {/* Slideshow Container */}
            <div className="relative w-full h-screen overflow-hidden bg-gray-900">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={slide}
                    alt={`Slika ${index + 1}`}
                    className="w-full h-full"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>

            {/* Sadržaj preko slike */}
            <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
              {/* Tamna poluprovidna overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Tekst i dugmad */}
              <div className="relative text-center max-w-4xl text-white">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-[Playfair Display] mb-6 drop-shadow-lg">
                  Dobrodošli na imanje u prirodi
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl font-serif mb-8 drop-shadow-md leading-relaxed">
                  vaše savršeno odredište za opuštanje, proslave i poslovna
                  okupljanja!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => setActiveSection("ponuda")}
                    className="cursor-pointer border-2 border-white text-white px-6 sm:px-8 py-3 rounded-full font-semibold font-serif hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105"
                  >
                    Pogledajte našu ponudu
                  </button>
                  <button
                    onClick={() => setActiveSection("kontakt")}
                    className="cursor-pointer border-2 border-white text-white px-6 sm:px-8 py-3 rounded-full font-semibold font-serif hover:bg-white hover:text-gray-800 transition-all duration-300 transform hover:scale-105"
                  >
                    Kontaktirajte nas
                  </button>
                </div>
              </div>
            </div>

            {/* Slideshow indikatori */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                />
              ))}
            </div>

            {/* Navigacijske strelice */}
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? slides.length - 1 : prev - 1
                )
              }
              className="cursor-pointer absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl sm:text-3xl bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 z-10"
            >
              ‹
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % slides.length)
              }
              className="cursor-pointer absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl sm:text-3xl bg-black bg-opacity-30 hover:bg-opacity-50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-300 z-10"
            >
              ›
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow sticky top-0 z-50">
        <ul className="flex justify-center flex-wrap gap-1 sm:gap-3 px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base">
          {navigationItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer px-2 py-1 sm:px-3 sm:py-2 rounded-md ${
                activeSection === item.id
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-100"
              } transition-colors flex items-center`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.label}
                  className="w-6 h-6 sm:w-10 sm:h-10"
                />
              ) : (
                <span className="mr-1">{item.icon}</span>
              )}
              <span className="hidden sm:inline">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <main className={activeSection === "home" ? "" : "p-6 flex-1"}>
        {renderContent()}
      </main>

      {/* Footer - samo ako nije home sekcija */}
      {activeSection !== "home" && activeSection !== "kontakt" && (
        <footer className="bg-white shadow-inner py-4 flex justify-center">
          <a
            href="https://www.instagram.com/matin_i_anin_stan/profilecard/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={48} />
          </a>
        </footer>
      )}
    </div>
  );
};

export default App;
