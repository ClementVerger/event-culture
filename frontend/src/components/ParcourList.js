import React from 'react';
import { useNavigate } from "react-router-dom";

function ParcourList({ parcourses }) {
    const navigate = useNavigate();

    const handleViewParcour = (parcour) => {
        navigate('/parcour/' + parcour.id, { state: { parcour } });
    }

  return (
    <div className="flex flex-wrap justify-center">
        {parcourses.length > 0 ? (
            parcourses.map((parcour) => (
            <div className="card bg-base-300 w-96 shadow-xl m-5 rounded-b-lg" key={parcour.id}>

                <h2 className="card-title text-orange-500">{parcour.nom}</h2>
                <p className="card-body text-right">Durée: {parcour.duree_parcour} heures</p>
                <button onClick={() => handleViewParcour(parcour)} className="btn border border-gray-200 bg-gray-100 rounded-full p-2">Voir plus</button>
            </div>
            ))
        ) : (
            <p>Aucun parcours ajouté pour le moment.</p>
        )}
    </div>
  );
}

export default ParcourList;