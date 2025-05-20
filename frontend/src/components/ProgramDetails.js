import { useState } from 'react';

function ProgramDetails({ program, onClose, addParcour }) {
    const [titre, setTitre] = useState(program.titre || '');
    const [description, setDescription] = useState(program.description || '');
    const [duree, setDuree] = useState(program.duree_jours || '');
    const [lieu_nom, setLieu_event_nom] = useState(program.event.lieu.nom || '');
    const [event_titre, setEvent_titre] = useState(program.event.titre || '');
    console.log(program);




    return (
        <div className='container mx-auto p-4'>
            <h2 className='text-2xl font-bold mb-4'>Détails du Programme</h2>
            <div className='bg-white shadow-lg p-6 rounded-md'>
                <h3 className='text-xl font-semibold mb-2'>{titre}</h3>
                <p className='text-gray-600 italic '> {lieu_nom}, {event_titre}</p>
                <p className='text-gray-700 mb-4'>{description}</p>
                <p className='text-gray-600'>Durée: {duree} jours</p>
                <div className='flex justify-end mt-4'>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded-md' onClick={onClose}>Fermer</button>
                    <button className='ml-2 px-4 py-2 bg-gray-300 rounded-md' onClick={onClose}>Modifier</button>
                    <button className='ml-2 px-4 py-2 bg-red-500 text-white rounded-md' onClick={onClose}>Supprimer</button>
                    <button className='ml-2 px-4 py-2 bg-green-500 text-white rounded-md' onClick={onClose}>Participer</button>
                </div>

                <div className='flex justify-start mt-4'>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded-md' onClick={addParcour}>Ajouter un parcour</button>
                </div>
                
            </div>
        </div>

    );
}

export default ProgramDetails;