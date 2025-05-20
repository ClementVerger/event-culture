import { useState } from 'react';
import { FaCalendar, FaMapMarkerAlt, FaUser, FaTag } from 'react-icons/fa';

function EventDetails({ event, onParticipate, isParticipating }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Exemple d'images (à remplacer par les vraies images de l'événement)
  const images = [
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };



  return (
    <div className="container mx-auto px-4 py-8">
      {/* Carrousel d'images */}
      <div className="relative w-full max-w-4xl mx-auto mb-8">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <img 
            src={images[currentImageIndex]} 
            alt={`${event.titre} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Boutons de navigation */}
          <button 
            onClick={previousImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            ←
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            →
          </button>

          {/* Indicateurs de position */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Contenu de l'événement */}
      <div className="max-w-4xl mx-auto">
        {/* En-tête avec titre et type */}
        <div className="bg-white rounded-t-lg shadow-lg p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{event.titre}</h1>
              <div className="flex items-center text-gray-600">
                <FaTag className="mr-2" />
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {event.type}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {event.nombreParticipants || 0}
                </div>
                <div className="text-sm text-gray-600">Participants</div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations principales */}
        <div className="bg-white shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Description */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">À propos de l'événement</h2>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            {/* Informations pratiques */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Informations pratiques</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaCalendar className="text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">Dates</div>
                    <div className="text-gray-600">
                      Du {new Date(event.date_debut).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      <br />
                      Au {new Date(event.date_fin).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">Lieu</div>
                    <div className="text-gray-600">{event.lieu?.nom}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaUser className="text-blue-600 mt-1" />
                  <div>
                    <div className="font-medium">Organisateur</div>
                    <div className="text-gray-600">{event.createur?.username}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-b-lg shadow-lg p-6 border-t">
          <div className="flex justify-end space-x-4">
            <button 
              onClick={onParticipate}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isParticipating 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isParticipating ? 'Vous participez' : 'Participer'}
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Partager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
