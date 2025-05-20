import React, { useState, useEffect } from 'react';
import { getUserId } from "../utils/auth"; 
import api from '../api/api';
import '../styles/EventForm.css';

function EventForm({ event, onClose, lieux, onEventUpdate }) {
  const [id, setId] = useState('');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [lieuId, setLieuId] = useState('');

  // Fonction pour formater la date en YYYY-MM-DD
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    if(event){
      setId(event.id);
      setTitre(event.titre);
      setDescription(event.description);
      setDateDebut(formatDateForInput(event.date_debut));
      setDateFin(formatDateForInput(event.date_fin));
      setLieuId(event.id_lieu);
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = await getUserId();
      if (!userId) {
        console.error("Utilisateur non authentifié.");
        return;
      }

      // Créer des objets Date à partir des chaînes de date
      const dateDebutObj = new Date(dateDebut);
      const dateFinObj = new Date(dateFin);

      const event = {
        id,
        titre,
        description,
        date_debut: dateDebutObj.toISOString(),
        date_fin: dateFinObj.toISOString(),
        id_lieu: Number(lieuId),
      };
      console.log(event);

      if (!event.id) {
        event.id_createur = userId;
        await api.post('/api/events', event);
        onClose();
      } else {
        await api.put(`/api/events/${event.id}`, event);
        onClose();
      }
      onEventUpdate();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
      <div className='bg-white p-5 rounded-lg shadow-lg'>
        <h2 className="text-xl font-semibold text-center">
          {event ? "Modifier l'événement" : "Ajouter un événement"}
        </h2>
        <form className="max-w-sm mx-auto px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Titre
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <textarea
              className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
            <label>Date de début</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
              required
            />
          </div>
          <div className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
            <label>Date de fin</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
              required
            />
          </div>
          <div className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">
            <label htmlFor="lieu" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lieu</label>
            <select id="lieu" value={lieuId} onChange={(e) => setLieuId(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option>Sélectionner un lieu</option>
              {lieux.map((lieu) => (
                <option key={lieu.id} value={lieu.id}> {lieu.nom} </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
          <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>Annuler</button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;