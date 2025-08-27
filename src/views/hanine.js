import React, { useState, useEffect } from 'react';
import { Star, User, Calendar, Heart, MessageCircle } from 'lucide-react';
import Footer from "components/Footers/Footer.js";


export default function CommentsDisplay() {
  // État pour stocker les commentaires
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données d'exemple pour les commentaires
  useEffect(() => {
    // Simulation d'un appel API
    setTimeout(() => {
      const mockComments = [
        {
          id: 1,
          userName: "Michelle Burns",
          userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          rating: 5,
          comment: "Elle est très patiente et ses méthodes d’enseignement sont vraiment efficaces. Je recommande vivement !",
          
          language: "Professeure d’anglais",
          likes: 12
        },
        {
          id: 2,
          userName: "Sang Kim",
          userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          rating: 4,
          comment: "Très bon professeur d'espagnol. Maria explique très bien la grammaire et la prononciation. Les cours sont dynamiques et intéressants.",
          date: "2024-01-12",
          tutorName: "Professeur d'anglais",
          
          likes: 8
        },
        {
          id: 3,
          userName: "Emma Dubois",
          userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          rating: 5,
          comment: "Sang Kim est un excellent professeur ! Ses cours m'ont vraiment aidé à améliorer mon niveau d'anglais. Je me sens plus confiante maintenant.",
          date: "2024-01-10",
          tutorName: "Sang Kim",
          language: "Anglais",
          likes: 15
        },
        {
          id: 4,
          userName: "Lucas Moreau",
          userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          rating: 4,
          comment: "Ronnie UK est très professionnel. Il adapte ses cours selon mes besoins et mon niveau. Les conversations sont très enrichissantes.",
          date: "2024-01-08",
          tutorName: "Ronnie UK",
          language: "Anglais",
          likes: 6
        },
        {
          id: 5,
          userName: "Fatima Zahra",
          userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          rating: 5,
          comment: "Ariella m'a beaucoup aidé pour préparer mon test IELTS. Ses techniques et conseils sont très utiles. Je recommande ses cours !",
          date: "2024-01-05",
          tutorName: "Ariella IELTS",
          language: "Anglais (IELTS)",
          likes: 20
        },
        {
          id: 6,
          userName: "Pierre Rousseau",
          userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          rating: 4,
          comment: "Linda Sch apporte son expérience de professeure dans ses cours. C'est motivant d'apprendre avec quelqu'un d'aussi expérimenté.",
          date: "2024-01-03",
          tutorName: "Linda Sch",
          language: "Anglais",
          likes: 9
        }
      ];
      setComments(mockComments);
      setLoading(false);
    }, 1000);
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fonction pour afficher les étoiles
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  // Fonction pour gérer les likes
  const handleLike = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (


    
    <div className="min-h-screen bg-blueGray-200">
     

      
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">

        
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: "url('https://img.freepik.com/vecteurs-libre/illustration-tuteur-ligne-dessinee-main_52683-146749.jpg?w=1380&t=st=1699667288~exp=1699667888~hmac=b41022eee6ae852812139628a7e37520200e1719d1d0af3f44502093d63dd50b')"
          }}
        >
          <span className="w-full h-full absolute opacity-75 bg-black"></span>

        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-5xl">
                  "Découvrez nos tuteurs"
                </h1>
                <p className="mt-4 text-lg text-blueGray-200">
                  Les retours authentiques de professeurs passionnés qui transmettent leur savoir chaque jour.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
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
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      {/* Comments Section */}
      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center mb-8">
            <div className="w-full lg:w-6/12 text-center">
              <h2 className="text-4xl font-semibold text-blueGray-700 mb-4">
                Commentaires de nos étudiants
              </h2>
              <p className="text-lg text-blueGray-500">
                {comments.length} avis partagés par notre communauté
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap">
            {comments.map((comment) => (
              <div key={comment.id} className="lg:pt-12 pt-6 w-full md:w-6/12 lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="px-6 py-6 flex-auto">
                    {/* Header avec avatar et info utilisateur */}
                    <div className="flex items-center mb-4">
                      <img
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div className="flex-1">
                        <h6 className="text-lg font-semibold text-blueGray-700">
                          {comment.userName}
                        </h6>
                        <div className="flex items-center text-sm text-blueGray-500">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(comment.date)}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex mr-2">
                        {renderStars(comment.rating)}
                      </div>
                      <span className="text-sm text-blueGray-500">
                        ({comment.rating}/5)
                      </span>
                    </div>

                    {/* Tuteur et langue */}
                    <div className="mb-3">
                      <span className="inline-block bg-lightBlue-100 text-lightBlue-800 text-xs px-2 py-1 rounded-full mr-2">
                        {comment.tutorName}
                      </span>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {comment.language}
                      </span>
                    </div>

                    {/* Commentaire */}
                    <p className="text-blueGray-600 text-sm leading-relaxed mb-4">
                      "{comment.comment}"
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-blueGray-100">
                      <button
                        onClick={() => handleLike(comment.id)}
                        className="flex items-center text-blueGray-500 hover:text-red-500 transition-colors duration-200"
                      >
                        <Heart size={16} className="mr-1" />
                        <span className="text-sm">{comment.likes}</span>
                      </button>
                      <button className="flex items-center text-lightBlue-500 hover:text-lightBlue-600 transition-colors duration-200">
                        <MessageCircle size={16} className="mr-1" />
                        <span className="text-sm">Répondre</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section stats */}
          <div className="flex flex-wrap items-center mt-16">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <MessageCircle className="text-xl" />
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-blueGray-700">
                Une communauté qui grandit chaque jour
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Nos étudiants partagent leurs expériences et s'entraident dans leur parcours d'apprentissage. 
                Chaque commentaire nous motive à offrir la meilleure expérience possible.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                Rejoignez notre communauté et découvrez comment nos tuteurs passionnés peuvent vous aider 
                à atteindre vos objectifs linguistiques.
              </p>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                <img
                  alt="Communauté d'apprentissage"
                  src="https://img.freepik.com/vecteurs-libre/illustration-tuteur-ligne-dessinee-main_52683-146749.jpg?w=1380&t=st=1699667288~exp=1699667888~hmac=b41022eee6ae852812139628a7e37520200e1719d1d0af3f44502093d63dd50b"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <h4 className="text-xl font-bold text-blueGray-700">
                    Témoignages authentiques
                  </h4>
                  <p className="text-md font-light mt-2 text-blueGray-600">
                    "Les avis de nos étudiants sont notre plus grande fierté et notre motivation quotidienne."
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
   
  );
   
}