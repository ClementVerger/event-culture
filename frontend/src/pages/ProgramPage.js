import { React, useEffect, useState } from 'react';
import ProgramForm from '../components/ProgramForm';
import ProgramList from '../components/ProgramList';
import api from '../api/api';

function ProgramPage() {
    const [programs, setPrograms] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = () => {
        api.get('/api/programs')
            .then(response => {
                setPrograms(response.data);
            })
            .catch(error => {
                console.error('Error fetching programs:', error);
            });
    }

    const handleAddProgram = () => {
        setShowModal(true);
    }
    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <>
        <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-bold flex-grow text-center">Programme</h1>
            <div className='flex justify-end'>
                <button onClick={handleAddProgram} className='px-4 py-2 text-base bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700'>
                    + Ajouter un Programme
                </button>
            </div>
        </div>

        <ProgramList programs={programs} />
        {showModal && (
            <ProgramForm
                onProgramUpdate={fetchPrograms}
                onClose={handleClose}
            />
        )}

        </>

    );
}

export default ProgramPage;