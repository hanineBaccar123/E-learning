import React from 'react';
import { FaBook, FaChalkboardTeacher, FaGlobe } from 'react-icons/fa';
import { GiAchievement } from 'react-icons/gi';

const CourseCard = ({ title, description, level, duration, language, icon }) => {
  const levelColors = {
    'Débutant': 'bg-green-100 text-green-800 border-green-300',
    'Intermédiaire': 'bg-blue-100 text-blue-800 border-blue-300',
    'Avancé': 'bg-purple-100 text-purple-800 border-purple-300'
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-blue-400 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-2xl text-blue-600">
            {icon}
          </div>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">{language}</span>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${levelColors[level]}`}>
          {level}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
        <span className="flex items-center">
          <FaBook className="w-4 h-4 mr-1" />
          {duration}
        </span>
        <button className="text-blue-600 hover:text-blue-700 font-medium">Voir plus →</button>
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const courses = [
    {
      title: "Conversation de Base",
      description: "Apprenez les bases de la conversation en anglais avec des dialogues pratiques.",
      level: "Débutant",
      duration: "8 semaines",
      language: "Anglais",
      icon: <FaChalkboardTeacher />
    },
    {
      title: "Grammaire Essentielle",
      description: "Maîtrisez les règles grammaticales fondamentales de l'anglais.",
      level: "Débutant",
      duration: "10 semaines",
      language: "Anglais",
      icon: <FaBook />
    },
    {
      title: "Vocabulaire Professionnel",
      description: "Développez votre vocabulaire pour le monde des affaires.",
      level: "Intermédiaire",
      duration: "6 semaines",
      language: "Anglais",
      icon: <FaGlobe />
    },
    {
      title: "Préparation TOEFL",
      description: "Préparez-vous efficacement au test TOEFL avec des exercices ciblés.",
      level: "Avancé",
      duration: "8 semaines",
      language: "Anglais",
      icon: <GiAchievement />
    },
    {
      title: "Français Débutant",
      description: "Découvrez les bases du français avec des méthodes interactives.",
      level: "Débutant",
      duration: "10 semaines",
      language: "Français",
      icon: <span>🇫🇷</span>
    }
    // ...ajoute le reste des cours ici
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Nos Cours de Langues
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
