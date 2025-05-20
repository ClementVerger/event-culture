import React from 'react';
import { useNavigate } from "react-router-dom";

function ProgramList({ programs }) {
const navigate = useNavigate();

    const handleViewProgram = (program) => {
        navigate('/program/' + program.id, { state: { program } });
    }

  return (
    <div className="flex flex-wrap justify-center">
        {programs.length > 0 ? (
            programs.map((program) => (
            <div className="card bg-base-300 w-96 shadow-xl m-5 rounded-b-lg" key={program.id}>
                <figure>
                <img
                    src='https://api-www.louvre.fr/sites/default/files/2021-02/visiteurs-dans-la-salle-daru.jpg'
                    alt="Program"
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                </figure>
                <h2 className="card-title text-orange-500">{program.titre}</h2>
                <p className="card-body text-right">Durée: {program.duree_jours} jours</p>
                <button onClick={() => handleViewProgram(program)} className="btn border border-gray-200 bg-gray-100 rounded-full p-2">Voir plus</button>
            </div>
            ))
        ) : (
            <p>Aucun programme ajouté pour le moment.</p>
        )}
    </div>
  );
}

export default ProgramList;