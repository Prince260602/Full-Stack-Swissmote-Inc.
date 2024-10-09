import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AnimeDetail() {
  const { id } = useParams(); 
  const [anime, setAnime] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/data/${id}`); 
        setAnime(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch anime details');
        setLoading(false); 
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>; 

  if (error) return <div>{error}</div>; 

  if (!anime) return <div>No data found</div>;

  return (
    <div className="card bg-base-100 shadow-xl md:w-1/2  w-65 mx-auto mt-5  mb-4 ">
      <figure>
        <img
          className="object-cover w-full h-full" 
          src={`http://localhost:5000${anime.AnimeImage}`} 
          alt={anime.Animename} 
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{anime.Animename}</h2>
        <p>Category: {anime.AnimeCategories}</p>
        <p>Written by: {anime.writername}</p>
        <p>{anime.Description}</p>
        <p >Reads: {anime.Reads}</p>

        
        <button 
          className="btn btn-secondary mt-4" 
          onClick={() => navigate('/')} 
        >
          Back to Anime List
        </button>
      </div>
    </div>
  );
}

export default AnimeDetail;
