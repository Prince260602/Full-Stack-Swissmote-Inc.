import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import UpdateAnimeModal from '../pages/UpdateAnimeModal.jsx';

function Cards({ anime, onDelete }) {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatedAnime, setUpdatedAnime] = useState(null);
  const navigate = useNavigate(); 

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this anime?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/data/${anime._id}`);
        onDelete(anime._id); 
        navigate('/');
        window.location.reload();
      } catch (error) {
        console.error('Error deleting anime:', error);
        alert('Delete Successfully');
        navigate('/');
        window.location.reload();
      }
    }
  };

  const handleUpdate = (updatedData) => {
    setUpdatedAnime(updatedData); 
    setUpdateModalOpen(false); 
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl w-full sm:w-72 md:w-80 lg:w-96 mx-auto mb-4"> 
      <figure className="overflow-hidden h-48 sm:h-60">
        <img
          className="object-cover w-full h-full" 
          src={`http://localhost:5000${anime.AnimeImage}`} 
          alt={anime.Animename} 
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg sm:text-xl">{anime.Animename}</h2>
        <p className="text-sm sm:text-base">{anime.Description.substring(0, 50)}...</p> 
        <div className="card-actions flex flex-col sm:flex-row justify-between mx-2 sm:mx-4 mt-4">
          <Link to={`/anime/${anime._id}`} className="mb-2 sm:mb-0 w-full sm:w-auto">
            <button className="btn btn-info w-full">Description</button>
          </Link>
          <button className="btn btn-active btn-accent w-full sm:w-auto mb-2 sm:mb-0" onClick={() => setUpdateModalOpen(true)}>
            Update
          </button>
          <button className="btn btn-error w-full sm:w-auto" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <UpdateAnimeModal
        isOpen={isUpdateModalOpen}
        onClose={() => setUpdateModalOpen(false)}
        onUpdate={handleUpdate}
        currentAnime={anime} 
      />
    </div>
  );
}

export default Cards;
