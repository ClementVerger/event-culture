import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import api from '../api/api';
import { useNavigate } from "react-router-dom";
import ProgramDetails from "../components/ProgramDetails";
import ParcourForm from "../components/ParcourForm";
import ParcourList from "../components/ParcourList";

function ProgramDetailsPage() {
    const { id } = useParams();
    const [parcours, setParcours] = useState([]);
    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();


    const fetchProgramDetails = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/api/programs/${id}`);
            setProgram(response.data);
        } catch (err) {
            setError("Erreur lors du chargement du programme");
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
        fetchParcours();
    }

    const fetchParcours = async () => {
        try {
            const response = await api.get(`/api/parcours/`);
            setParcours(response.data);
            
        } catch (err) {
            setError("Erreur lors du chargement des parcours");
            console.error('Erreur:', err);
        }
    }


    const addParcour = async () => {
        setShowModal(true);
    }
    const handleClose = () => {
        navigate('/program');
    };

    const handleCloseForm = () => {
        setShowModal(false);
    }

    useEffect(() => {
        const loadData = async () => {
            await fetchProgramDetails();
            fetchParcours();
        };
        loadData();
    }
        , [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!program) return <div>Programme non trouvé</div>;

    return (
        <div>
            <ProgramDetails program={program} onClose={handleClose} addParcour={addParcour} />

            {showModal && (
                <ParcourForm
                    onParcourUpdate={fetchProgramDetails}
                    onClose={handleCloseForm}
                />
            )}

            <ParcourList parcourses={parcours} />

        </div>


    );
}

export default ProgramDetailsPage;