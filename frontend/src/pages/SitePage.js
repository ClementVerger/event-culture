import { React, useEffect, useState } from 'react';
import SiteForm from '../components/SiteForm';
import SiteList from '../components/SiteList';
import api from '../api/api';

function SitePage() {
  const [sites, setSites] = useState([]);
    const [lieux, setLieux] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSites();
    fetchLieux();
  }, []);

  const fetchSites = () => {
    api.get('/api/sites')
      .then(response => {
        setSites(response.data);
      })
      .catch(error => {
        console.error('Error fetching sites:', error);
      });
  };

  const fetchLieux = async () => {
    api.get('/api/lieux')
      .then(response => {
        setLieux(response.data);
      })
      .catch(error => {
        console.error('Error fetching lieux:', error);
      });
  };

  const handleAddSite = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="site-page">
      {/* Ajouter un evenement */}
      <div className='flex items-center justify-between mb-5'>
        <h1 className="text-2xl font-bold flex-grow text-center">Sites</h1>
        <div className='flex justify-end'>
          <button onClick={handleAddSite} className='px-4 py-2 text-base bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700'>
            + Ajouter un Site
          </button>
        </div>
      </div>

      <SiteList sites={sites} />
      {showModal && (
        <SiteForm
          onSiteUpdate={fetchSites}
          onClose={handleClose}
          site={null}
          lieux={lieux}
        />
        )}
    </div>
    );
}

export default SitePage;
