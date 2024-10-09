import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Cards.jsx';
import AddAnimeModal from '../pages/AddAnimeModal.jsx';
import UpdateAnimeModal from '../pages/UpdateAnimeModal.jsx';

function AnimeList() {
  const [animeList, setAnimeList] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentAnime, setCurrentAnime] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data/');
        setAnimeList(response.data);
        setFilteredAnime(response.data);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchAnime();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterAnime = () => {
    const filtered = animeList.filter((anime) =>
      anime.AnimeCategories.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredAnime(filtered);
  };

  const handleAddAnime = (newAnime) => {
    setAnimeList((prevList) => [...prevList, newAnime]);
    setFilteredAnime((prevList) => [...prevList, newAnime]);
  };

  const handleUpdateAnime = (updatedAnime) => {
    setAnimeList((prevList) =>
      prevList.map((anime) => (anime._id === updatedAnime._id ? updatedAnime : anime))
    );
    setFilteredAnime((prevList) =>
      prevList.map((anime) => (anime._id === updatedAnime._id ? updatedAnime : anime))
    );
  };

  const openUpdateModal = (anime) => {
    setCurrentAnime(anime);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 overflow-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Anime List</h1>

      <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded mb-4 sm:mb-0 sm:px-8 w-full sm:w-auto"
          onClick={() => setIsAddModalOpen(true)}
        >
          Create Anime
        </button>
        <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto">
          <select
            className="border rounded px-3 py-2 mb-4 sm:mb-0 sm:mr-2 sm:px-4 w-full sm:w-auto"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Romance">Romance</option>
           
          </select>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded sm:px-8 w-full sm:w-auto"
            onClick={filterAnime}
          >
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 overflow-hidden">
        {filteredAnime.map((anime) => (
          <Card key={anime._id} anime={anime} onUpdate={() => openUpdateModal(anime)} />
        ))}
      </div>

      <AddAnimeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAnime}
      />

      <UpdateAnimeModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onUpdate={handleUpdateAnime}
        currentAnime={currentAnime}
      />
    </div>
  );
}

export default AnimeList;
