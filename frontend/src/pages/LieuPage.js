import { React, useEffect, useState } from 'react';
import LieuForm from '../components/LieuForm';
import LieuList from '../components/LieuList';
import api from '../api/api';



function LieuPage() {
  const [lieux, setLieux] = useState([]);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchLieux();
  }, []);

  const fetchLieux = () => {
    api.get('/api/lieux')
      .then(response => {
        setLieux(response.data);
      })
      .catch(error => {
        console.error('Error fetching lieux:', error);
      });
  };

  const handleAddLieu = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="lieu-page">
      {/* Ajouter un evenement */}
      <div className='flex items-center justify-between mb-5'>
        <h1 className="text-2xl font-bold flex-grow text-center">Lieux</h1>
        <div className='flex justify-end'>
          <button onClick={handleAddLieu} className='px-4 py-2 text-base bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700'>
            + Ajouter un Lieu
          </button>
        </div>
      </div>

      <LieuList lieux={lieux} />
      {showModal && (
        <LieuForm
          onLieuUpdate={fetchLieux}
          onClose={handleClose}
        />

      )}


    </div>
  );
}



export default LieuPage;
