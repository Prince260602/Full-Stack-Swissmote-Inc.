import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function UpdateAnimeModal({ isOpen, onClose, onUpdate, currentAnime }) {
  const [formData, setFormData] = useState({
    AnimeCategories: '',
    Animename: '',
    writername: '',
    art: '',
    Reads: '',
    Description: '',
    AnimeImage: null,
  });

  const navigate = useNavigate(); 

  useEffect(() => {
    if (currentAnime) {
      setFormData({
        AnimeCategories: currentAnime.AnimeCategories,
        Animename: currentAnime.Animename,
        writername: currentAnime.writername,
        art: currentAnime.art,
        Reads: currentAnime.Reads,
        Description: currentAnime.Description,
        AnimeImage: null,
      });
    }
  }, [currentAnime, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, AnimeImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { AnimeImage, ...rest } = formData;

    const formDataToSubmit = new FormData();
    for (const key in rest) {
      formDataToSubmit.append(key, rest[key]);
    }

    if (AnimeImage) {
      formDataToSubmit.append('AnimeImage', AnimeImage);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/data/${currentAnime._id}`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onUpdate(response.data);
      onClose(); 

     
      navigate('/'); 

     
      window.location.reload();

      
      setFormData({
        AnimeCategories: '',
        Animename: '',
        writername: '',
        art: '',
        Reads: '',
        Description: '',
        AnimeImage: null,
      });
    } catch (error) {
      console.error('Error updating anime:', error);
      alert('Error updating anime: ' + error.response?.data?.message || error.message);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Update Anime</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="AnimeCategories"
            placeholder="Categories"
            value={formData.AnimeCategories}
            onChange={handleChange}
            className="border mb-2 p-2 w-full"
            required
          />
          <input
            type="text"
            name="Animename"
            placeholder="Anime Name"
            value={formData.Animename}
            onChange={handleChange}
            className="border mb-2 p-2 w-full"
            required
          />
          <input
            type="text"
            name="writername"
            placeholder="Writer Name"
            value={formData.writername}
            onChange={handleChange}
            className="border mb-2 p-2 w-full"
            required
          />
          <input
            type="text"
            name="art"
            placeholder="Art"
            value={formData.art}
            onChange={handleChange}
            className="border mb-2 p-2 w-full"
            required
          />
          <input
            type="text"
            name="Reads"
            placeholder="Reads"
            value={formData.Reads}
            onChange={handleChange}
            className="border mb-2 p-2 w-full"
          />
          <textarea
            name="Description"
            placeholder="Description"
            value={formData.Description}
            onChange={handleChange}
            className="border mb-2 p-2 w-full"
            required
          ></textarea>
          <input
            type="file"
            name="AnimeImage"
            onChange={handleFileChange}
            className="border mb-2 w-full"
          />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Anime
          </button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateAnimeModal;
