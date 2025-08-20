import React, { useState } from "react";
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

  const navigationItems: NavigationItem[] = [
    { id: "lokacija", label: "LOKACIJA", icon: "📌" },
    { id: "ponuda", label: "PONUDA", icon: <FaWineGlassAlt size={20} /> },
    { id: "logo", label: "", logo: "/images/LOGO_MATANA.png" },
    { id: "o-nama", label: "O NAMA", icon: "👥" },
    { id: "kontakt", label: "KONTAKT", icon: "📞" },
  ];

  const cardStyle =
    "bg-gradient-to-br from-white via-gray-50 to-white shadow-lg rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl";

  const buttonStyle =
    "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-xl transition-all transform hover:scale-105";

  const renderContent = () => {
    switch (activeSection) {
      case "lokacija":
        return (
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
            <h2 className="text-4xl font-extrabold text-center text-gray-800">
              LOKACIJA
            </h2>
            <div
              className={`${cardStyle} border border-gray-200 max-w-4xl mx-auto`}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">📌</span>
                <h3 className="text-2xl font-semibold text-gray-700">
                  Pronađite nas
                </h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Pronađite nas u Slavoniji, Brodsko-posavskoj županiji u mjestu
                Gornji Crnogovci.
              </p>
              <div className="mb-6 rounded-xl overflow-hidden shadow-sm h-64 md:h-80">
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
                  className={buttonStyle}
                >
                  🗺️ Otvori u Google Maps
                </a>
              </div>
            </div>
          </div>
        );

      case "ponuda":
        return (
          <div className="max-w-6xl mx-auto px-4 py-12 space-y-20 text-center">
            <h2 className="text-5xl font-bold text-gray-800 font-[Playfair Display]">
              PONUDA
            </h2>

            {/* Restoran */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <img
                src="/images/slika1.jpeg"
                alt="Restoran"
                className="w-full rounded-2xl shadow-lg object-cover h-80"
              />
              <div>
                <h3 className="text-3xl font-[Dancing Script] text-gray-700 mb-6">
                  Restoran
                </h3>
                <ul className="list-disc list-inside space-y-4 text-left text-xl leading-relaxed font-serif text-gray-700">
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
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <img
                src="/images/slika2.jpeg"
                alt="Svečana dvorana"
                className="w-full rounded-2xl shadow-lg object-cover h-80"
              />
              <div>
                <h3 className="text-3xl font-[Dancing Script] text-gray-700 mb-6">
                  Svečana dvorana
                </h3>
                <ul className="list-disc list-inside space-y-4 text-left text-xl leading-relaxed font-serif text-gray-700">
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
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <img
                src="/images/slika3.jpeg"
                alt="Poluotvorena terasa"
                className="w-full rounded-2xl shadow-lg object-cover h-80"
              />
              <div>
                <h3 className="text-3xl font-[Dancing Script] text-gray-700 mb-6">
                  Poluotvorena terasa s pogledom na jezero
                </h3>
                <ul className="list-disc list-inside space-y-4 text-left text-xl leading-relaxed font-serif text-gray-700">
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
          </div>
        );

      case "o-nama":
        return (
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
            <h2 className="text-4xl font-extrabold text-center text-gray-800">
              O NAMA
            </h2>

            {/* Uvod */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-700">
                Naša priča
              </h3>
              <p>
                Od slavonskih polja do dalmatinskog mora, svaki kutak nudi
                jedinstvenu priču i iskustvo. Naša priča temelji se na
                dugogodišnjoj predanosti kvaliteti, održivosti i domaćoj
                proizvodnji.
              </p>
              <p>
                Spoj iskustva i ljubavi prema prirodi rezultirao je stvaranjem
                jedinstvenog kompleksa koji objedinjuje odmor, zabavu i vrhunsku
                gastronomiju.
              </p>
            </section>

            {/* Proizvodi */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-700">
                Naši proizvodi
              </h3>
              <p>
                Bavimo se ratarskom i stočarskom proizvodnjom, a svi naši
                proizvodi dolaze s vlastitih polja i farmi, uzgojeni ekološki i
                na održiv način.
              </p>
              <p>
                Ponosni smo na naš pogon za preradu suhomesnatih proizvoda, čije
                delicije možete pronaći u našoj mesnici. Svaki proizvod nosi
                pečat kvalitete i tradicije, pružajući autentičan okus domaće
                hrane.
              </p>
            </section>

            {/* Ugostiteljstvo i smještaj */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-700">
                Ugostiteljstvo i smještaj
              </h3>
              <p>
                Restoran Dukat i fast food Dukat u Novoj Gradiški omiljena su
                mjesta za uživanje u ukusnim jelima. Na našem imanju Anin i
                Matin stan u Gornjim Crnogovcima nudimo jedinstveni bijeg u
                prirodu.
              </p>
              <p>
                Za one koji žele spojiti odmor uz more i vrhunsku uslugu,
                smještaj u Biogradu na Moru idealan je izbor. S opcijama
                polupansiona i punog pansiona, osigurali smo savršen boravak na
                obali.
              </p>
            </section>

            {/* Misija */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-700">
                Naša misija
              </h3>
              <p>
                Naša misija je stvoriti iskustvo koje se pamti – bilo da se radi
                o obroku pripremljenom od svježih, domaćih sastojaka,
                opuštajućoj šetnji prirodom ili nezaboravnom odmoru na moru.
              </p>
              <p>
                Sa svakim korakom težimo očuvanju tradicije, promociji
                održivosti i stvaranju mjesta gdje se svatko osjeća dobrodošlim.
              </p>
              <p className="font-semibold text-gray-800">
                Dobrodošli u naš svijet – svijet gdje priroda, tradicija i
                strast postaju jedno.
              </p>
            </section>
          </div>
        );

      case "kontakt":
        return (
          <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 flex flex-col items-center text-center">
            <h2 className="text-4xl font-extrabold text-gray-800">KONTAKT</h2>

            <p>
              <strong>Telefon:</strong> 091 440 4002 – 091 440 4003
            </p>
            <p>
              <strong>Email:</strong> ari.agro.az@gmail.com
            </p>
            <p>
              <strong>Adresa:</strong> Gornji Crnogovci, Brodsko-posavska
              županija
            </p>

            <a
              href="https://www.instagram.com/matin_i_anin_stan/profilecard/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition-colors"
            >
              <FaInstagram size={32} />
            </a>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-700 p-8">
            <p className="mb-8 text-center">
              Dobrodošli na imanje u prirodi – vaše savršeno odredište za
              opuštanje, proslave i poslovna okupljanja!
            </p>
            Odaberite sekciju...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
        <ul className="flex justify-center gap-6">
          {navigationItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer px-3 py-2 rounded-lg ${
                activeSection === item.id
                  ? "bg-gray-200 font-bold"
                  : "hover:bg-gray-100"
              } transition-colors flex items-center`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={item.label}
                  className="w-18 h-18 mr-2"
                />
              ) : (
                <span className="mr-2">{item.icon}</span>
              )}
              {item.label}
            </li>
          ))}
        </ul>
      </nav>

      <main className="p-6 flex-1">{renderContent()}</main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 flex justify-center">
        <a
          href="https://www.instagram.com/matin_i_anin_stan/profilecard/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-pink-500 transition-colors"
        >
          <FaInstagram size={24} />
        </a>
      </footer>
    </div>
  );
};

export default App;
