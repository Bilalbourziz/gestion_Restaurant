"use client";
import React, { useState } from 'react';
import { PlusIcon, Edit2Icon } from 'lucide-react';

const initialSlides = [
  '/deff.png',
  '/deff.png',
  '/deff.png',
  '/deff.png'
];
const ContentManagement = () => {
  const [slides, setSlides] = useState(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(slides[0]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newSlideUrl, setNewSlideUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    button: ''
  });

  const handleAddSlide = () => {
    if (newSlideUrl) {
      const updatedSlides = [...slides, newSlideUrl];
      setSlides(updatedSlides);
      setCurrentSlide(newSlideUrl);
      setNewSlideUrl('');
      setShowUploadModal(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlideChange = (slide) => {
    setCurrentSlide(slide);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-8">
        <div className="text-lg font-bold text-gray-800">gestion de contenu</div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-pink-500">ACCUEIL</a>
          <a href="#" className="text-gray-600 hover:text-pink-500">À PROPOS</a>
          <a href="#" className="text-gray-600 hover:text-pink-500">CONTACT</a>
        </div>
      </nav>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="relative">
          <img 
            src={currentSlide} 
            alt="Current Slide" 
            className="w-full h-[500px] object-cover"
          />
          <button 
            className="absolute top-4 right-4 bg-pink-500 text-white rounded-full p-2"
            onClick={() => setShowUploadModal(true)}
          >
            <Edit2Icon className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex justify-center space-x-2 p-4 bg-gray-100">
          {slides.map((slide, index) => (
            <img 
              key={index} 
              src={slide} 
              alt={`Slide ${index + 1}`} 
              className={`w-16 h-16 object-cover rounded cursor-pointer ${
                currentSlide === slide ? 'border-2 border-pink-500' : ''
              }`}
              onClick={() => handleSlideChange(slide)}
            />
          ))}
          <button 
            onClick={() => setShowUploadModal(true)}
            className="w-16 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center rounded"
          >
            <PlusIcon className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Form Section */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Titre (fr)</label>
              <input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Titre (en)</label>
              <input 
                type="text"
                name="titleEn"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Sous-titre (fr)</label>
              <input 
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Sous-titre (en)</label>
              <input 
                type="text"
                name="subtitleEn"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Description (fr)</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Description (en)</label>
              <textarea 
                name="descriptionEn"
                className="w-full p-2 border rounded h-24"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Bouton (fr)</label>
              <input 
                type="text"
                name="button"
                value={formData.button}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Bouton (en)</label>
              <input 
                type="text"
                name="buttonEn"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              className="bg-pink-500 text-white px-8 py-2 rounded-md hover:bg-pink-600 transition"
            >
              AJOUTER
            </button>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Veuillez sélectionner un thème pour votre site</h3>
            <input 
              type="text"
              value={newSlideUrl}
              onChange={(e) => setNewSlideUrl(e.target.value)}
              placeholder="URL de l'image"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-between">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Annuler
              </button>
              <button 
                onClick={handleAddSlide}
                className="px-4 py-2 bg-pink-500 text-white rounded"
                disabled={!newSlideUrl}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;