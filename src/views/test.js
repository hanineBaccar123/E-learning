import { Star, Send, Plus, Heart, MessageCircle, Calendar, User } from 'lucide-react';
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import React, { useState, useEffect, useCallback } from 'react';
import { getAllCours, addCours } from "Service/ApiCours";
import { addCommentaire, getAllComments } from 'Service/ApiCommentaire';

const ELearningForms = () => {
  const [activeForm, setActiveForm] = useState('student');
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  // State pour stocker les données
  const [commentaires, setCommentaires] = useState([]);
  const [cours, setCours] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  // State pour le formulaire de commentaire (étudiant)
  const [commentForm, setCommentForm] = useState({
    courseId: '',
    description: "",
    comment: "",
    rating: 0
  });

  // State pour le formulaire de cours (enseignant)
  const [courseForm, setCourseForm] = useState({
    name: '',
    description: '',
    level: '',
    language: '',
    duration: '',
    prix: ''
  });

  // Fonction pour récupérer les commentaires
  const fetchCommentaires = useCallback(async () => {
    try {
      setLoadingComments(true);
      const res = await getAllComments();
      setCommentaires(res.data.commentaires || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires:", error);
    } finally {
      setLoadingComments(false);
    }
  }, []);

  // Fonction pour récupérer les cours
  const getCourses = useCallback(async () => {
    try {
      const res = await getAllCours();
      setCours(res.data.CoursList || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours:", error);
    }
  }, []);

  // Effect pour charger les données au montage du composant
  useEffect(() => {
    getCourses();
    fetchCommentaires();
  }, [getCourses, fetchCommentaires]);

  // Fonction pour ajouter un commentaire
  const handleAddNewComment = async () => {
    try {
      if (!commentForm.courseId || !commentForm.comment || rating === 0) {
        return;
      }

      const commentData = {
        courseId: commentForm.courseId,
        description: commentForm.description,
        comment: commentForm.comment,
        rating: rating,
        timestamp: new Date().toISOString()
      };

      const res = await addCommentaire(commentData);

      // Ajouter le nouveau commentaire directement au state pour affichage immédiat
      setCommentaires(prev => [
        ...prev,
        {
          id: res.data.id || Math.random(),
          userName: "Moi",
          userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
          tutorName: cours.find(c => c.id === commentForm.courseId)?.name || "Cours",
          language: cours.find(c => c.id === commentForm.courseId)?.language || "",
          rating: commentData.rating,
          comment: commentData.comment,
          description: commentData.description,
          date: commentData.timestamp,
          likes: 0
        }
      ]);

      // Reset du formulaire
      setCommentForm({
        courseId: '',
        description: "",
        comment: "",
        rating: 0
      });
      setRating(0);

      console.log("Commentaire ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
    }
  };

  // Fonction pour ajouter un cours
  const handleCourseSubmit = async () => {
    try {
      if (!courseForm.name || !courseForm.description || !courseForm.level ||
        !courseForm.language || !courseForm.duration) {
        return;
      }

      const courseData = {
        name: courseForm.name,
        description: courseForm.description,
        level: courseForm.level,
        language: courseForm.language,
        duration: courseForm.duration,
        prix: courseForm.prix || 0,
        teacherId: '456', // ID simulé de l'enseignant
        timestamp: new Date().toISOString()
      };

      await addCours(courseData);

      // Actualiser la liste des cours
      await getCourses();

      // Reset du formulaire
      setCourseForm({
        name: '',
        description: '',
        level: '',
        language: '',
        duration: '',
        prix: ''
      });

      console.log("Cours ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours:", error);
    }
  };

  // Composant StarRating
  const StarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium text-blueGray-700 mr-2">Note:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer transition-colors ${star <= (hoveredStar || rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-blueGray-300 hover:text-yellow-400'
              }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
          />
        ))}
        <span className="ml-2 text-sm text-blueGray-600">
          {rating > 0 ? `${rating}/5` : 'Non noté'}
        </span>
      </div>
    );
  };

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
    setCommentaires(commentaires.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <>
      {/* Hero Section */}
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-blueGray-600">
                Mon espace e-learning
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                Plateforme d'apprentissage en ligne
              </p>

              {/* Sélecteur de rôle */}
              <div className="mt-12 flex space-x-4">
                <button
                  onClick={() => setActiveForm('student')}
                  className={`text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 ${activeForm === 'student'
                      ? 'bg-lightBlue-500 active:bg-lightBlue-600'
                      : 'bg-blueGray-700 active:bg-blueGray-600'
                    }`}
                  style={activeForm === 'student' ? { backgroundColor: "#706CFF" } : {}}
                >
                  <i className="fas fa-user mr-2"></i>
                  Interface Étudiant
                </button>

                <button
                  onClick={() => setActiveForm('teacher')}
                  className={`text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 ${activeForm === 'teacher'
                      ? 'bg-emerald-500 active:bg-emerald-600'
                      : 'bg-blueGray-700 active:bg-blueGray-600'
                    }`}
                >
                  <i className="fas fa-chalkboard-teacher mr-2"></i>
                  Interface Enseignant
                </button>
              </div>
            </div>
          </div>
        </div>

        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src="https://stories.freepiklabs.com/storage/1548/63-Graduation_Artboard-1.svg"
          alt="E-learning illustration"
        />
      </section>

      {/* Formulaires Section */}
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

        <div className="container mx-auto">
          <div className="justify-center text-center flex flex-wrap mb-24">
            <div className="w-full md:w-6/12 px-12 md:px-4">
              <h2 className="font-semibold text-4xl">
                {activeForm === 'student' ? 'Ajouter un Commentaire' : 'Créer un Nouveau Cours'}
              </h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-500">
                {activeForm === 'student'
                  ? 'Partagez votre expérience et évaluez les cours que vous avez suivis'
                  : 'Créez et ajoutez de nouveaux cours à la plateforme d\'apprentissage'
                }
              </p>
            </div>
          </div>

          {/* Formulaire Étudiant - Commentaires */}
          {activeForm === 'student' && (
            <>
              <div className="flex flex-wrap items-center">
                <div className="w-full lg:w-8/12 px-4 mr-auto ml-auto">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                    <div className="flex-auto p-8">
                      <div className="flex items-center mb-6">
                        <i className="fas fa-comment text-3xl text-lightBlue-500 mr-4"></i>
                        <h3 className="text-2xl font-semibold text-blueGray-700">
                          Formulaire de Commentaire
                        </h3>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-blueGray-700 mb-2">
                            Sélectionner un cours *
                          </label>
                          <select
                            value={commentForm.courseId}
                            onChange={(e) => setCommentForm({ ...commentForm, courseId: e.target.value })}
                            className="w-full px-3 py-4 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:ring-lightBlue-500 border border-blueGray-300"
                            required
                          >
                            <option value="">-- Choisir un cours --</option>
                            {cours.map(course => (
                              <option key={course.id} value={course.id}>
                                {course.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <StarRating />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-blueGray-700 mb-2">
                            Description (optionnel)
                          </label>
                          <input
                            type="text"
                            value={commentForm.description}
                            onChange={(e) => setCommentForm({ ...commentForm, description: e.target.value })}
                            placeholder="Titre ou résumé de votre commentaire..."
                            className="w-full px-3 py-4 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:ring-lightBlue-500 border border-blueGray-300"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-blueGray-700 mb-2">
                            Votre commentaire *
                          </label>
                          <textarea
                            value={commentForm.comment}
                            onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                            placeholder="Partagez votre expérience avec ce cours..."
                            rows={6}
                            className="w-full px-3 py-4 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:ring-lightBlue-500 border border-blueGray-300 resize-none"
                            required
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleAddNewComment}
                          className="w-full text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                          style={{ backgroundColor: "#706CFF" }}
                        >
                          <Send className="w-5 h-5 inline mr-2" />
                          Publier le Commentaire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section d'affichage des commentaires */}
              <div className="flex flex-wrap mt-12">
                <div className="w-full px-4">
                  <div className="text-center mb-12">
                    <h3 className="text-3xl font-semibold text-blueGray-700">
                      Commentaires récents
                    </h3>
                    <p className="text-lg text-blueGray-500 mt-2">
                      {commentaires.length} avis partagés par notre communauté
                    </p>
                  </div>

                  {loadingComments ? (
                    <div className="text-center py-12">
                      <p className="text-blueGray-500">Chargement des commentaires...</p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap">
                      {commentaires.map((comment) => (
                        <div key={comment.id} className="w-full md:w-6/12 lg:w-4/12 px-4 mb-8">
                          <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
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

                              {/* Description si disponible */}
                              {comment.description && (
                                <h4 className="text-md font-semibold text-blueGray-800 mb-2">
                                  {comment.description}
                                </h4>
                              )}

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
                  )}

                  {!loadingComments && commentaires.length === 0 && (
                    <div className="text-center py-12 w-full">
                      <p className="text-blueGray-500">Aucun commentaire pour le moment. Soyez le premier à en ajouter un !</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Formulaire Enseignant - Cours */}
          {activeForm === 'teacher' && (
            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-10/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
                  <div className="flex-auto p-8">
                    <div className="flex items-center mb-6">
                      <i className="fas fa-book text-3xl text-emerald-500 mr-4"></i>
                      <h3 className="text-2xl font-semibold text-blueGray-700">
                        Formulaire de Création de Cours
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                          <label className="block text-sm font-bold text-blueGray-700 mb-2">
                            Nom du cours *
                          </label>
                          <input
                            type="text"
                            value={courseForm.name}
                            onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                            placeholder="Ex: Français pour débutants"
                            className="w-full px-3 py-4 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-blueGray-300"
                            required
                          />
                        </div>

                        <div className="w-full lg:w-6/12 px-4">
                          <label className="block text-sm font-bold text-blueGray-700 mb-2">
                            Langue enseignée *
                          </label>
                          <select
                            value={courseForm.language}
                            onChange={(e) => setCourseForm({ ...courseForm, language: e.target.value })}
                            className="w-full px-3 py-4 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-blueGray-300"
                            required
                          >
                            <option value="">-- Choisir une langue --</option>
                            <option value="french">Français</option>
                            <option value="english">Anglais</option>
                            <option value="spanish">Espagnol</option>
                            <option value="german">Allemand</option>
                            <option value="korean">Coréen</option>
                            <option value="japanese">Japonais</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-blueGray-700 mb-2">
                          Description du cours *
                        </label>
                        <textarea
                          value={courseForm.description}
                          onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                          placeholder="Décrivez le contenu et les objectifs du cours..."
                          rows={4}
                          className="w-full px-3 py-4 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-blueGray-300 resize-none"
                          required
                        />
                      </div>

                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-4/12 px-4">
                          <label className="block text-sm font-bold text-blueGray-700 mb-2">
                            Niveau *
                          </label>
                          <select
                            value={courseForm.level}
                            onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}
                            className="w-full px-3 py-4 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-blueGray-300"
                            required
                          >
                            <option value="">-- Niveau --</option>
                            <option value="beginner">Débutant</option>
                            <option value="intermediate">Intermédiaire</option>
                            <option value="advanced">Avancé</option>
                          </select>
                        </div>

                        <div className="w-full lg:w-4/12 px-4">
                          <label className="block text-sm font-bold text-blueGray-700 mb-2">
                            Durée (heures) *
                          </label>
                          <input
                            type="number"
                            value={courseForm.duration}
                            onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                            placeholder="Ex: 20"
                            min="1"
                            className="w-full px-3 py-4 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-blueGray-300"
                            required
                          />
                        </div>

                        <div className="w-full lg:w-4/12 px-4">
                          <label className="block text-sm font-bold text-blueGray-700 mb-2">
                            Prix ()
                          </label>
                          <input
                            type="number"
                            value={courseForm.prix}
                            onChange={(e) => setCourseForm({ ...courseForm, prix: e.target.value })}
                            placeholder="Ex: 99"
                            min="0"
                            step="0.01"
                            className="w-full mr-1 mb-1px-3 py-4 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-blueGray-300"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleCourseSubmit}
                        className="w-full text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-emerald-500 active:bg-emerald-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                      >
                        <Plus className="w-5 h-5 inline mr-2" />
                        Créer le Cours
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ELearningForms;