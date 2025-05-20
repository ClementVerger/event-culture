import React, { useState, } from 'react';
import { useNavigate } from "react-router-dom";

function EventList({ events, lieux, searchTerm, setSearchTerm, searchDate, setSearchDate, searchType, setSearchType, searchLieu, setSearchLieu, onAddEvent, onDeleteEvent, onEditEvent }) {
    const [isOpen, setIsOpen] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);
    const navigate = useNavigate();

    const toggleDropdown = (index) => {
        setIsOpen(prevState => ({ ...prevState, [index]: !prevState[index] }));
    };


    const handleViewEvent = (event) => {
        navigate(`/event/${event.id}`);
    }

    const showMore = () => {
        setVisibleCount((prev) => prev + 5);
    };



    return (
        <div className=" m-5 p-5 w-full">
            {/* Ajouter un evenement */}
            <div className='flex items-center justify-between mb-5'>
                <h1 className="text-2xl font-bold flex-grow text-center">Evènements</h1>
                <div className='flex justify-end'>
                    <button onClick={onAddEvent} className='px-4 py-2 text-base bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700'>
                        + Ajouter un Evenement
                    </button>
                </div>
            </div>

            {/* Barre de recherche */}
            <div className=" p-2 border-blue-600 rounded-xl border-2 mb-5 flex justify-center gap-2">
                <input
                    className='p-2 text-base border rounded-md'
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    className='p-2 text-base border rounded-md'
                    type="date"
                    placeholder="Rechercher par date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
                <select className='p-2 text-base border rounded-md' value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    <option value="">Sélectionner un type</option>
                    <option value="conférence">Conférence</option>
                    <option value="atelier">Atelier</option>
                    <option value="concert">Concert</option>
                </select>
                <select className='p-2 text-base border rounded-md' value={searchLieu} onChange={(e) => setSearchLieu(e.target.value)}>
                    <option value="">Sélectionner un lieu</option>
                    {lieux.map((lieu, index) => (
                        <option key={`${lieu.id}-${index}`} value={lieu.id}>{lieu.nom}</option>
                    ))}
                </select>
            </div>

            {/* Table avec les evenements */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Titre</th>
                            <th className="px-6 py-3">Description</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Lieux</th>
                            <th className="px-6 py-3">Créateur</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.slice(0, visibleCount).map((event, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                {/* Titre */}
                                <th className="px-6 py-4 text-gray-900 dark:text-white">
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{event.titre}</div>
                                    </div>
                                </th>
                                {/* Description */}
                                <td className="px-6 py-4">
                                    <div className="font-normal text-gray-500">{event.description}</div>
                                </td>
                                {/* Date */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="text-base font-semibold">
                                            Du {new Date(event.date_debut).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                        })} au {new Date(event.date_fin).toLocaleDateString('fr-FR', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</div>
                                    </div>
                                </td>
                                {/* Lieux */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="text-base font-semibold">{event.lieu.nom}</div>

                                    </div>

                                </td>
                                {/* Créateur */}
                                <td className="px-6 py-4">
                                    <div className="text-base font-semibold">{event.createur.username}</div>
                                </td>
                                {/* Bouton Dropdown */}
                                <td className=" px-6 py-4">
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                        type="button"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 16 3"
                                        >
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                    </button>
                                    {/* Dropdown menu */}
                                    {isOpen[index] && <div id="dropdownDotsHorizontal" className={`absolute right-0 mt-2 ${isOpen[index] ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow-xl w-44 dark:bg-gray-700 dark:divide-gray-600`}>
                                        <div className='py-2 text-sm text-gray-700 dark:text-gray-200'>
                                            <button onClick={() => handleViewEvent(event)} className={"block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"}>Voir l'évènement</button>
                                            <button onClick={() => handleShare(event.id_event)} className={"block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"}>Partager</button>
                                            <button onClick={() => handleParticipate(event.id_event)} className={"block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"}>Participer</button>
                                            <button onClick={() => onEditEvent(event)} className={"block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"}>Modifier</button>
                                        </div>
                                        <div className='py-2'>
                                            <button onClick={() => onDeleteEvent(event)} className={"block px-4 py-2 w-full text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"}>Supprimer</button>

                                        </div>

                                    </div>}

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {visibleCount < events.length && (
                    <button
                        onClick={showMore}
                        className="absolute bottom-0 left-0 py-2.5 px-5 w-full text-sm font-medium text-gray-900 bg-gray-100 border-t border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        Voir plus
                    </button>
                )}
            </div>
        </div>
    );
}

export default EventList;