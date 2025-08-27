import React, { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaMapPin, FaUsers, FaPhone, FaWineGlassAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

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

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full mt-8 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto relative mt-8 px-2 sm:px-0">
        <img
          src={images[currentIndex]}
          alt={`Slika ${currentIndex + 1}`}
          className="w-full max-h-[60vh] sm:max-h-[80vh] object-contain rounded-2xl shadow-xl mx-auto"
          loading="lazy"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="cursor-pointer absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              className="cursor-pointer absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#7A6A58] scale-125"
                    : "bg-[#CFC2B4] hover:bg-[#A9927A]"
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
  reverse = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-6">
      <div className={reverse ? "order-2 lg:order-1 relative" : "relative"}>
        <img
          key={currentIndex}
          src={images[currentIndex]}
          alt={title}
          className="w-full rounded-2xl shadow-xl object-cover h-64 sm:h-80"
          loading="lazy"
        />
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
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#7A6A58] scale-125"
                    : "bg-[#CFC2B4] hover:bg-[#A9927A]"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className={reverse ? "order-1 lg:order-2 text-left" : "text-left"}>
        <h3 className="text-2xl sm:text-3xl font-semibold text-[#7A6A58] mb-4 sm:mb-6">
          {title}
        </h3>
        <div className="space-y-3 text-base sm:text-lg leading-relaxed text-[#7A6A58]">
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
    "/images/slika07.jpg",
    "/images/slika08.jpg",
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

  // Swipe handler
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      !isTransitioning &&
      handleSlideChange((prev) => (prev + 1) % slides.length),

    onSwipedRight: () =>
      !isTransitioning &&
      handleSlideChange((prev) => (prev - 1 + slides.length) % slides.length),

    trackMouse: true, // omogućava i swipe s mišem na desktopu
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const navigationItems: NavigationItem[] = [
    { id: "lokacija", label: "LOKACIJA", icon: <FaMapPin size={20} /> },
    { id: "ponuda", label: "PONUDA", icon: <FaWineGlassAlt size={20} /> },
    { id: "home", label: "", logo: "/images/LOGO_MATANA.png" },
    { id: "o-nama", label: "O NAMA", icon: <FaUsers size={20} /> },
    { id: "kontakt", label: "KONTAKT", icon: <FaPhone size={20} /> },
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
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-10 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#7A6A58] font-serif mb-8 sm:mb-12 mt-8">
              LOKACIJA
            </h2>
            <div className="bg-[#FFF8F0] shadow-xl rounded-2xl p-4 sm:p-8 border border-[#E8DDD3]">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#7A6A58] mb-4 sm:mb-6">
                Pronađite nas u Slavoniji!
              </h3>
              <p className="text-base sm:text-xl leading-relaxed text-[#7A6A58] mb-4 sm:mb-6">
                Brodsko-posavska županija mjesto Gornji Crnogovci.
              </p>
              <div className="mb-4 sm:mb-6 rounded-xl overflow-hidden shadow-lg h-56 sm:h-64 md:h-80 bg-[#E8DDD3]">
                <iframe
                  title="Lokacija - Sala Matana"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2744.6529964664356!2d17.4919137!3d45.2087507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475d8b0042cfe8c3%3A0xfaa6f3270977ffa2!2sMatana!5e0!3m2!1shr!2shr!4v1724160000000!5m2!1shr!2shr"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href="https://www.google.com/maps/place/Matana/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 text-base sm:text-lg bg-[#7A6A58] text-white rounded-lg shadow-lg hover:bg-[#A9927A] transition-all transform hover:scale-105 w-full sm:w-auto"
              >
                🗺️ Otvori u Google Maps
              </a>
            </div>
          </div>
        );

      case "ponuda":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-10 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#7A6A58] font-serif mb-8 sm:mb-12 mt-8">
              PONUDA
            </h2>
            <blockquote className="text-2xl sm:text-3xl italic font-serif text-[#7A6A58] max-w-3xl mx-auto leading-relaxed">
              “Dobrodošli u naš svijet – svijet gdje priroda, tradicija i strast
              postaju jedno.”
            </blockquote>

            {/* Restoran */}
            <div className="bg-[#FFF8F0] from-gray-50 to-white rounded-2xl p-6 sm:p-10 shadow-xl border border-[#E8DDD3] mt-12">
              <Gallery
                title="Restoran"
                description="Uživajte u autentičnim specijalitetima pripremljenim od svježih i lokalnih sastojaka iz vlastite proizvodnje u ugodnom ambijentu našeg restorana."
                capacity="80 mjesta"
                images={["/images/restoran1.jpeg", "/images/restoran2.jpeg"]}
              />
            </div>

            {/* Svečana dvorana */}
            <div className="bg-[#FFF8F0] from-gray-50 to-white rounded-2xl p-6 sm:p-10 shadow-xl border border-[#E8DDD3] mt-12">
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
            </div>

            {/* Poluotvorena terasa */}
            <div className="bg-[#FFF8F0] from-gray-50 to-white rounded-2xl p-6 sm:p-10 shadow-xl border border-[#E8DDD3] mt-12">
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
            </div>

            {/* Kuća za smještaj gostiju */}
            <div className="bg-[#FFF8F0] from-gray-50 to-white rounded-2xl p-6 sm:p-10 shadow-xl border border-[#E8DDD3] mt-12">
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

            {/* Imanje i dodatni sadrzaj */}
            <div className="bg-[#FFF8F0] from-gray-50 to-white rounded-2xl p-6 sm:p-10 shadow-xl border border-[#E8DDD3] mt-12">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#7A6A58] mb-6 text-center">
                Imanje i dodatni sadržaji
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4 text-base sm:text-lg text-[#7A6A58]">
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
                <div className="space-y-4 text-base sm:text-lg text-[#7A6A58]">
                  <p>
                    Naše jezero s otokom nudi mogućnost pecanja – savršen izbor
                    za ljubitelje prirode i avanturističkog duha.
                  </p>
                </div>
              </div>
            </div>
            {/* Galerija */}
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4 text-base sm:text-lg text-gray-700"></div>
              </div>

              {/* Galerija slika ispod */}
              <div className="">
                <SimpleGallery
                  images={[
                    "/images/ostalo01.jpeg",
                    "/images/ostalo02.jpeg",
                    "/images/ostalo03.jpeg",
                    "/images/ostalo04.jpg",
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
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-10 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#7A6A58] font-serif mb-8 sm:mb-12 mt-8">
              O NAMA
            </h2>

            <section className="bg-[#FFF8F0] rounded-2xl p-6 sm:p-8 shadow-lg border border-[#E8DDD3] space-y-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#7A6A58] mb-4">
                Naša priča i misija
              </h2>
              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#7A6A58]">
                <p>
                  Naša priča temelji se na dugogodišnjoj predanosti kvaliteti,
                  održivosti i domaćoj proizvodnji. Spoj iskustva i ljubavi
                  prema prirodi rezultirao je stvaranjem jedinstvenog kompleksa
                  koji objedinjuje odmor, zabavu i vrhunsku gastronomiju.
                </p>
                <p>
                  Bavimo se ratarskom i stočarskom proizvodnjom, a svi naši
                  proizvodi dolaze s vlastitih polja i farmi, uzgojeni ekološki
                  i na održiv način.
                </p>
                <p>
                  Naša misija je stvoriti iskustvo koje se pamti – bilo da se
                  radi o obroku pripremljenom od svježih, domaćih sastojaka ili
                  opuštajućoj šetnji prirodom. Sa svakim korakom težimo očuvanju
                  tradicije, promociji održivosti i stvaranju mjesta gdje se
                  svatko osjeća dobrodošlim.
                </p>
              </div>
            </section>
          </div>
        );

      case "kontakt":
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-12 space-y-10 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#7A6A58] font-serif mb-8 sm:mb-12 mt-8">
              KONTAKT
            </h2>

            <div className="bg-[#FFF8F0] rounded-2xl p-6 sm:p-10 shadow-xl border border-[#E8DDD3] space-y-6">
              <div className="space-y-4">
                <p className="text-base sm:text-xl text-[#7A6A58]">
                  <strong>Telefon:</strong>{" "}
                  <a
                    href="tel:0914404002"
                    className="text-[#7A6A58] hover:underline"
                  >
                    091 440 4002
                  </a>{" "}
                  –{" "}
                  <a
                    href="tel:0914404003"
                    className="text-[#7A6A58] hover:underline"
                  >
                    091 440 4003
                  </a>
                </p>
                <p className="text-base sm:text-xl text-[#7A6A58]">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:ari.agro.az@gmail.com"
                    className="text-[#7A6A58] hover:underline"
                  >
                    ari.agro.az@gmail.com
                  </a>
                </p>
              </div>
              <div className="pt-6 border-t border-[#E8DDD3]">
                <p className="text-base sm:text-xl text-[#7A6A58]">
                  Pratite nas na društvenim mrežama:
                </p>
                <a
                  href="https://www.instagram.com/matin_i_anin_stan/profilecard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-16 h-16 text-[#7A6A58] hover:text-pink-500 transition-colors transform hover:scale-110"
                >
                  <FaInstagram size={40} />
                </a>
              </div>
            </div>
          </div>
        );

      case "home":
        return (
          <div
            {...handlers}
            className="relative w-full h-screen overflow-hidden"
          >
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
                  className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.9 }}
                >
                  <button
                    onClick={() => setActiveSection("ponuda")}
                    className="cursor-pointer border-2 border-white text-white 
               px-4 py-2 text-sm 
               sm:px-8 sm:py-3 sm:text-base
               rounded-full font-semibold font-serif 
               hover:bg-white hover:text-gray-800 
               transition-all duration-300 transform hover:scale-105"
                  >
                    Pogledajte našu ponudu
                  </button>

                  <button
                    onClick={() => setActiveSection("kontakt")}
                    className="cursor-pointer border-2 border-white text-white 
               px-4 py-2 text-sm 
               sm:px-8 sm:py-3 sm:text-base
               rounded-full font-semibold font-serif 
               hover:bg-white hover:text-gray-800 
               transition-all duration-300 transform hover:scale-105"
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
                      ? "bg-[#7A6A58] scale-125"
                      : "bg-[#CFC2B4] hover:bg-[#A9927A] bg-opacity-50 hover:bg-opacity-75"
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
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      <nav className="sticky top-0 z-50 border-b border-[#E8DDD3] shadow-lg px-4 sm:px-8 py-3 flex items-center justify-center gap-6 sm:gap-12 bg-[#FFF8F0] rounded-b-2xl -mt-6">
        <div className="flex items-center justify-center px-4 sm:px-8 py-3 gap-6 sm:gap-12">
          <ul className="flex gap-2 sm:gap-4 text-sm sm:text-base">
            {navigationItems
              .filter((item) => !item.logo)
              .slice(0, 2)
              .map((item) => (
                <li
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`cursor-pointer px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-[#7A6A58] text-white font-semibold transform scale-105"
                      : "hover:bg-[#E8DDD3] text-[#7A6A58]"
                  } flex items-center gap-2`}
                >
                  {item.icon}{" "}
                  <span className="hidden sm:inline font-medium">
                    {item.label}
                  </span>
                </li>
              ))}
          </ul>
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => setActiveSection("home")}
          >
            <img
              src="/images/LOGO_MATANA.png"
              alt="Logo"
              className="h-14 sm:h-20 object-contain"
            />
          </div>
          <ul className="flex gap-2 sm:gap-4 text-sm sm:text-base">
            {navigationItems
              .filter((item) => !item.logo)
              .slice(2)
              .map((item) => (
                <li
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`cursor-pointer px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-[#7A6A58] text-white font-semibold transform scale-105"
                      : "hover:bg-[#E8DDD3] text-[#7A6A58]"
                  } flex items-center gap-2`}
                >
                  {item.icon}{" "}
                  <span className="hidden sm:inline font-medium">
                    {item.label}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </nav>

      <main className={activeSection === "home" ? "" : "flex-1"}>
        {renderContent()}
      </main>

      {activeSection !== "home" && activeSection !== "kontakt" && (
        <footer className="bg-[#FFF8F0] border-t border-[#E8DDD3] py-6 flex justify-center rounded-t-2xl shadow-inner">
          <a
            href="https://www.instagram.com/matin_i_anin_stan/profilecard/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7A6A58] hover:text-pink-500 transition-colors transform hover:scale-110"
          >
            <FaInstagram size={32} />
          </a>
        </footer>
      )}
    </div>
  );
};
export default App;
