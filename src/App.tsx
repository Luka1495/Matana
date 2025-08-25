import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaWineGlassAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  logo?: string;
}

interface GalleryProps {
  title: string;
  description: string;
  capacity: string;
  images: string[];
  reverse?: boolean;
}

interface SimpleGalleryProps {
  images: string[];
}

interface SlideshowProps {
  slides: string[];
  currentSlide: number;
}

const SimpleGallery: React.FC<SimpleGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full mt-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto relative">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slika ${currentIndex + 1}`}
            className="w-full max-h-[80vh] object-contain rounded-2xl shadow-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            loading="lazy"
          />
        </AnimatePresence>

        {/* Strelice lijevo/desno */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="cursor-pointer absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Pagination kružići preko slike */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Gallery: React.FC<GalleryProps> = ({
  title,
  description,
  capacity,
  images,
  reverse = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-6">
      <div className={reverse ? "order-2 lg:order-1 relative" : "relative"}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={title}
            className="w-full rounded-2xl shadow-xl object-cover h-64 sm:h-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            loading="lazy"
          />
        </AnimatePresence>

        {/* Navigacija strelice */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="cursor-pointer absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Pagination strelice ispod slike */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className={reverse ? "order-1 lg:order-2 text-left" : "text-left"}>
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4 sm:mb-6">
          {title}
        </h3>
        <div className="space-y-3 text-base sm:text-lg leading-relaxed text-gray-700">
          <p>
            <strong>Kapacitet:</strong> {capacity}
          </p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlaySlides, setOverlaySlides] = useState<number[]>([]);
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

  // Blokira scroll na pocetnoj
  useEffect(() => {
    if (activeSection === "home") {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
      document.body.style.overflow = "hidden"; // blokira scroll
    } else {
      document.body.style.overflow = "auto"; // dopušta scroll
    }
  }, [activeSection]);

  // Automatski slideshow - mijenja sliku svake 4 sekunde
  useEffect(() => {
    if (activeSection !== "home") return;

    const interval = setInterval(() => {
      // Promijeni slide samo ako se ne animira
      if (!isTransitioning) {
        handleSlideChange((prev) => (prev + 1) % slides.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeSection, isTransitioning, slides.length]);

  const handleSlideChange = (
    newSlideOrFunction: number | ((prev: number) => number)
  ) => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    const nextSlide =
      typeof newSlideOrFunction === "function"
        ? newSlideOrFunction(currentSlide)
        : newSlideOrFunction;

    // Dodaj trenutni slide u overlay
    setOverlaySlides([currentSlide]);

    // Postavi novi slide
    setCurrentSlide(nextSlide);

    // Nakon animacije ukloni overlay
    setTimeout(() => {
      setOverlaySlides([]);
      setIsTransitioning(false);
    }, 800);
  };

  useEffect(() => {
    if (activeSection != "home")
      window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const navigationItems: NavigationItem[] = [
    { id: "lokacija", label: "LOKACIJA", icon: "📌" },
    { id: "ponuda", label: "PONUDA", icon: <FaWineGlassAlt size={20} /> },
    { id: "home", label: "", logo: "/images/LOGO_MATANA.png" },
    { id: "o-nama", label: "O NAMA", icon: "👥" },
    { id: "kontakt", label: "KONTAKT", icon: "📞" },
  ];

  function Slideshow({ slides, currentSlide }: SlideshowProps) {
    return (
      <div className="relative w-full h-screen overflow-hidden">
        {/* Glavna slika */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${slides[currentSlide]})` }}
        />

        {/* Overlay fade */}
        {overlaySlides.length > 0 &&
          overlaySlides.map((slide) => (
            <motion.div
              key={slide}
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slides[slide]})` }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onAnimationComplete={() => setOverlaySlides([])}
            />
          ))}

        {/* Gradijent overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "lokacija":
        return (
          <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 font-serif mb-6 sm:mb-12">
              LOKACIJA
            </h2>

            <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl">📌</span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-gray-700">
                  Pronađite nas
                </h3>
              </div>

              <p className="text-base sm:text-xl leading-relaxed text-gray-700 mb-4 sm:mb-6">
                Pronađite nas u Slavoniji, Brodsko-posavskoj županiji u mjestu
                Gornji Crnogovci.
              </p>

              <div className="mb-4 sm:mb-6 rounded-xl overflow-hidden shadow-lg h-56 sm:h-64 md:h-80 bg-gray-200">
                <iframe
                  title="Lokacija - Sala Matana"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2744.6529964664356!2d17.4919137!3d45.2087507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475d8b0042cfe8c3%3A0xfaa6f3270977ffa2!2sMatana!5e0!3m2!1shr!2shr!4v1724160000000!5m2!1shr!2shr"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="text-center">
                <a
                  href="https://www.google.com/maps/place/Matana/@45.2082341,17.490116,17z/data=!3m1!4b1!4m6!3m5!1s0x475d8b0042cfe8c3:0xfaa6f3270977ffa2!8m2!3d45.2082303!4d17.4926909!16s%2Fg%2F11vk47vny5?entry=ttu&g_ep=EgoyMDI1MDgxNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 text-base sm:text-lg bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-800 transition-all transform hover:scale-105 w-full sm:w-auto"
                >
                  🗺️ Otvori u Google Maps
                </a>
              </div>
            </div>
          </div>
        );

      case "ponuda":
        return (
          <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 font-serif mb-4 sm:mb-6">
              PONUDA
            </h2>
            <p className="text-lg sm:text-2xl font-medium text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Dobrodošli u naš svijet – svijet gdje priroda, tradicija i strast
              postaju jedno.
            </p>

            <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
              {/* Restoran */}
              <Gallery
                title="Restoran"
                description="Uživajte u autentičnim specijalitetima pripremljenim od svježih i lokalnih sastojaka iz vlastite proizvodnje u ugodnom ambijentu našeg restorana."
                capacity="80 mjesta"
                images={["/images/restoran1.jpeg", "/images/restoran2.jpeg"]}
              />

              {/* Svečana dvorana */}
              <Gallery
                title="Svečana dvorana"
                description="Idealna za vjenčanja, prezentacije, team buildinge i druge svečanosti, ova moderna, zatvorena dvorana osigurava nezaboravno iskustvo."
                capacity="150 mjesta"
                images={[
                  "/images/dvorana1.jpeg",
                  "/images/dvorana2.jpeg",
                  "/images/dvorana3.jpeg",
                  "/images/dvorana4.jpeg",
                  "/images/dvorana5.jpeg",
                  "/images/dvorana6.jpeg",
                ]}
              />

              {/* Poluotvorena terasa */}
              <Gallery
                title="Poluotvorena terasa s pogledom na jezero"
                description="Savršena za uživanje na svježem zraku, uz roštilj i mogućnost aktivnog sudjelovanja u pripremi jela."
                capacity="100 mjesta"
                images={[
                  "/images/otvorenaterasa1.jpeg",
                  "/images/otvorenaterasa2.jpeg",
                  "/images/otvorenaterasa3.jpeg",
                  "/images/otvorenaterasa4.jpeg",
                  "/images/otvorenaterasa5.jpeg",
                  "/images/otvorenaterasa6.jpeg",
                ]}
              />

              {/* Kuća za smještaj gostiju */}
              <Gallery
                title="Kuća za smještaj gostiju"
                description="Smjestite se u jednoj od naših četiri dvokrevetne sobe s vlastitim kupaonicama, smještenim u tradicionalnoj slavonskoj kući."
                capacity="8 mjesta"
                images={[
                  "/images/soba1.jpeg",
                  "/images/soba2.jpeg",
                  "/images/soba3.jpeg",
                ]}
              />
            </div>
            {/* Galerija slika */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-10 shadow-xl border border-gray-100 mt-12">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6 text-center">
                Imanje i dodatni sadržaji
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4 text-base sm:text-lg text-gray-700">
                  <p>
                    Djeca će obožavati našu ponudu – mogućnost postavljanja
                    napuhanaca u sigurnom okruženju omogućava im bezbrižnu igru
                    na svježem zraku.
                  </p>
                  <p>
                    Uživajte u šetnjama uz jezero, istražite voćnjake ili
                    pronađite mir u sjenama naše šume.
                  </p>
                </div>
                <div className="space-y-4 text-base sm:text-lg text-gray-700">
                  <p>
                    Naše jezero s otokom nudi mogućnost pecanja – savršen izbor
                    za ljubitelje prirode i avanturističkog duha.
                  </p>
                </div>
              </div>
            </div>
            {/* Imanje i dodatni sadržaji */}
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4 text-base sm:text-lg text-gray-700"></div>
              </div>

              {/* Galerija slika ispod */}
              <div className="mt-8">
                <SimpleGallery
                  images={[
                    "/images/ostalo01.jpeg",
                    "/images/ostalo02.jpeg",
                    "/images/ostalo03.jpeg",
                    "/images/ostalo04.jpeg",
                    "/images/ostalo05.jpeg",
                    "/images/ostalo06.jpeg",
                    "/images/ostalo07.jpeg",
                    "/images/ostalo08.jpeg",
                    "/images/ostalo09.jpeg",
                    "/images/ostalo10.jpeg",
                    "/images/ostalo11.jpeg",
                    "/images/ostalo12.jpeg",
                  ]}
                />
              </div>
            </div>
          </div>
        );

      case "o-nama":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-10">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 font-serif mb-8 sm:mb-12 text-center">
              O NAMA
            </h2>

            <div className="space-y-8">
              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
                  Naša priča
                </h3>
                <div className="space-y-4 text-base sm:text-lg leading-relaxed text-gray-700">
                  <p>
                    Od slavonskih polja do dalmatinskog mora, svaki kutak nudi
                    jedinstvenu priču i iskustvo. Naša priča temelji se na
                    dugogodišnjoj predanosti kvaliteti, održivosti i domaćoj
                    proizvodnji.
                  </p>
                  <p>
                    Spoj iskustva i ljubavi prema prirodi rezultirao je
                    stvaranjem jedinstvenog kompleksa koji objedinjuje odmor,
                    zabavu i vrhunsku gastronomiju.
                  </p>
                </div>
              </section>

              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
                  Naši proizvodi
                </h3>
                <div className="space-y-4 text-base sm:text-lg leading-relaxed text-gray-700">
                  <p>
                    Bavimo se ratarskom i stočarskom proizvodnjom, a svi naši
                    proizvodi dolaze s vlastitih polja i farmi, uzgojeni
                    ekološki i na održiv način.
                  </p>
                  <p>
                    Ponosni smo na naš pogon za preradu suhomesnatih proizvoda,
                    čije delicije možete pronaći u našoj mesnici. Svaki proizvod
                    nosi pečat kvalitete i tradicije.
                  </p>
                </div>
              </section>

              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
                  Naša misija
                </h3>
                <div className="space-y-4 text-base sm:text-lg leading-relaxed text-gray-700">
                  <p>
                    Naša misija je stvoriti iskustvo koje se pamti – bilo da se
                    radi o obroku pripremljenom od svježih, domaćih sastojaka,
                    opuštajućoj šetnji prirodom ili nezaboravnom odmoru na moru.
                  </p>
                  <p>
                    Sa svakim korakom težimo očuvanju tradicije, promociji
                    održivosti i stvaranju mjesta gdje se svatko osjeća
                    dobrodošlim.
                  </p>
                </div>
              </section>
            </div>
          </div>
        );

      case "kontakt":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-10 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 font-serif mb-8 sm:mb-12">
              KONTAKT
            </h2>

            <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-xl border border-gray-100 space-y-6">
              <div className="space-y-4">
                <p className="text-base sm:text-xl text-gray-700">
                  <strong>Telefon:</strong> 091 440 4002 – 091 440 4003
                </p>
                <p className="text-base sm:text-xl text-gray-700">
                  <strong>Email:</strong> ari.agro.az@gmail.com
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-base sm:text-xl text-gray-700">
                  Pratite nas na društvenim mrežama:
                </p>
                <a
                  href="https://www.instagram.com/matin_i_anin_stan/profilecard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-16 h-16 text-gray-600 hover:text-pink-500 transition-colors transform hover:scale-110"
                >
                  <FaInstagram size={40} />
                </a>
              </div>
            </div>
          </div>
        );

      case "home":
        return (
          <div className="relative w-full h-screen overflow-hidden">
            {/* Slideshow Container */}
            <Slideshow slides={slides} currentSlide={currentSlide} />

            {/* Crni overlay */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            {/* Sadržaj preko slike */}
            <div className="absolute inset-0 flex items-center justify-center z-20 px-4">
              <div className="text-center max-w-5xl text-white">
                <motion.h1
                  className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif mb-6 drop-shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Dobrodošli na imanje u prirodi
                </motion.h1>
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl mb-8 drop-shadow-md leading-relaxed font-light"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  vaše savršeno odredište za opuštanje, proslave i poslovna
                  okupljanja!
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                >
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
                </motion.div>
              </div>
            </div>

            {/* Slideshow indikatori */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => !isTransitioning && handleSlideChange(index)}
                  disabled={isTransitioning}
                  className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  } ${isTransitioning ? "cursor-not-allowed" : ""}`}
                />
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <ul className="flex justify-center flex-wrap gap-1 sm:gap-4 px-2 py-2 sm:px-6 sm:py-3 text-sm sm:text-base">
          {navigationItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-gray-800 text-white font-semibold transform scale-105"
                  : "hover:bg-gray-100 text-gray-700"
              } flex items-center gap-2`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.label}
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              ) : (
                <>
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline font-medium">
                    {item.label}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <main className={activeSection === "home" ? "" : "flex-1"}>
        {renderContent()}
      </main>

      {/* Footer - samo ako nije home ili kontakt sekcija */}
      {activeSection !== "home" && activeSection !== "kontakt" && (
        <footer className="bg-white border-t border-gray-200 py-6 flex justify-center">
          <a
            href="https://www.instagram.com/matin_i_anin_stan/profilecard/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition-colors transform hover:scale-110"
          >
            <FaInstagram size={32} />
          </a>
        </footer>
      )}
    </div>
  );
};

export default App;
