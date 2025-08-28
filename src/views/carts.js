import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaSearch } from 'react-icons/fa';

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import { getAllCours } from 'Service/ApiCours';

const CourseCard = ({ title, description, level, duration, language, icon }) => {
  const levelColors = {
    'Débutant': 'bg-green-100 text-green-800',
    'Intermédiaire': 'bg-blue-100 text-blue-800',
    'Avancé': 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150 hover:-mt-2">
      <div className="flex flex-col h-full">
        <div className="px-4 py-5 flex-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
                {icon || <FaBook className="text-xl" />}
              </div>
              <span className="ml-2 text-sm font-semibold text-blueGray-500 uppercase">
                {language}
              </span>
            </div>
            <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${levelColors[level] || 'bg-blueGray-100 text-blueGray-800'}`}>
              {level}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-blueGray-700 mb-2">{title}</h3>
          <p className="mt-2 mb-4 text-blueGray-500 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="px-4 py-3 bg-blueGray-50 rounded-b-lg flex items-center justify-between">
          <span className="text-sm text-blueGray-500 flex items-center">
            <FaBook className="mr-1" /> {duration}
          </span>
       
        </div>
      </div>
    </div>
  );
};

export default function Cours() {
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const res = await getAllCours();
        setCourses(res.data.CoursList || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    (course.name && course.name.toLowerCase().includes(search.toLowerCase())) ||
    (course.language && course.language.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Parcourez les cours gratuits
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Inscrivez-vous pour parcourir les cours gratuitement. Terminez n'importe quel support de cours avec un tuteur de langue maternelle lorsque vous vous abonnez.
              </p>
              <div className="mt-12">
                <Link to="/carts">
                  <a
                    className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                     style={{ backgroundColor: "#706CFF" }}
                  >
                    Commencer
                  </a>
                </Link>
                <Link to="/carts">
                  <a
                    className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  >
                    En savoir plus
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/Webinar-bro.png").default}
          alt="..."
        />
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-100 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        {/* Barre de recherche */}
        <div className="container mx-auto px-4 mb-12 -mt-32">
          <div className="relative flex w-full mb-3">
            <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
              <FaSearch className="text-blueGray-400" />
            </span>
            <input
              type="text"
              placeholder="Rechercher un cours ou une langue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full pl-10 ease-linear transition-all duration-150"
            />
          </div>
        </div>

        {/* Liste des cours */}
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lightBlue-500 mx-auto"  ></div>
              <p className="mt-4 text-blueGray-500">Chargement des cours...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-blueGray-400 text-6xl mb-4"></div>
              <h3 className="text-2xl font-semibold text-blueGray-700">Aucun cours trouvé</h3>
              <p className="text-blueGray-500 mt-2">
                {search ? `Aucun résultat pour "${search}"` : "Aucun cours disponible pour le moment"}
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap">
              {filteredCourses.map((course, index) => (
                <div key={index} className="w-full md:w-6/12 lg:w-4/12 px-4">
                  <CourseCard {...course}  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section des langues */}
        <div className="container mx-auto overflow-hidden pb-20 mt-20">
          <div className="flex flex-wrap items-center pt-32">
            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
              <div className="justify-center flex flex-wrap relative">
                <div className="my-4 w-full lg:w-6/12 px-4">
                  <Link to="/carts">
                    <div className="bg-red-600 shadow-lg rounded-lg text-center p-8 hover:-mt-2 ease-linear transition-all duration-150 cursor-pointer">
                      <p className="text-lg text-white mt-4 font-semibold">
                        English
                      </p>
                    </div>
                  </Link>
                  
                  <Link to="/carts">
                    <div className="bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8 hover:-mt-2 ease-linear transition-all duration-150 cursor-pointer">
                      <p className="text-lg text-white mt-4 font-semibold">
                        Spanish
                      </p>
                    </div>
                  </Link>
                  
                  <Link to="/carts">
                    <div className="bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8 hover:-mt-2 ease-linear transition-all duration-150 cursor-pointer">
                      <p className="text-lg text-white mt-4 font-semibold">
                        French
                      </p>
                    </div>
                  </Link>
                </div>
                
                <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                  <Link to="/carts">
                    <div className="bg-yellow-500 shadow-lg rounded-lg text-center p-8 hover:-mt-2 ease-linear transition-all duration-150 cursor-pointer">
                      <p className="text-lg text-white mt-4 font-semibold">
                        German
                      </p>
                    </div>
                  </Link>
                  
                  <Link to="/carts">
                    <div className="bg-red-700 shadow-lg rounded-lg text-center p-8 mt-8 hover:-mt-2 ease-linear transition-all duration-150 cursor-pointer">
                      <p className="text-lg text-white mt-4 font-semibold">
                        Japanese
                      </p>
                    </div>
                  </Link>
                  
                  <Link to="/carts">
                    <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8 hover:-mt-2 ease-linear transition-all duration-150 cursor-pointer">
                      <p className="text-lg text-white mt-4 font-semibold">
                        Korean
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-drafting-compass text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Les bases de la maîtrise de l'anglais
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Gagnez en confiance et maîtrisez les langues conversationnelles. Tout le monde y trouvera son bonheur, avec des cours pour tous niveaux de compétence, couvrant tous les domaines, depuis les bases d'une conversation simple jusqu'à l'expression d'opinions parfaitement forgées sur des sujets d'actualité complexes.
              </p>
              <div className="block pb-6">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Vocabulary
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Grammar
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Pronunciation
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Listening
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Speaking
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Reading
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Writing
                </span>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                  Culture
                </span>
              </div>
              <Link
                to="/cours-list"
                className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150"
              >
                Voir tous les cours{" "}
                <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="justify-center text-center flex flex-wrap mt-24">
          <div className="w-full md:w-6/12 px-12 md:px-4">
            <h2 className="font-semibold text-4xl">Vos pages essentielles pour apprendre facilement</h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-500">
              Accédez facilement à toutes les pages nécessaires pour suivre vos cours, gérer votre profil, et progresser efficacement.
            </p>
          </div>
        </div>
      </section>

      <section className="block relative z-1 bg-blueGray-600">
        <div className="container mx-auto">
          <div className="justify-center flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4 -mt-24">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center text-white">
                    Login Page
                  </h5>
                  <Link to="/auth/login">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/login.2.png").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center text-white">
                    SpeakUp Page
                  </h5>
                  <Link to="/profile">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/speakup.png").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center text-white">
                    Landing Page
                  </h5>
                  <Link to="/landing">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/landing.2.png").default}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}