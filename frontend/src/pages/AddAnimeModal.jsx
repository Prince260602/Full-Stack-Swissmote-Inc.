import React, { useState } from 'react';
import axios from 'axios';

function AddAnimeModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    AnimeCategories: '',
    Animename: '',
    writername: '',
    art: '',
    Reads: '',
    Description: '',
    AnimeImage: null,
  });

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
    formDataToSubmit.append('AnimeImage', AnimeImage);
    for (const key in rest) {
      formDataToSubmit.append(key, rest[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/data/', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      });
      onAdd(response.data);
      onClose(); 
      setFormData({
        AnimeCategories: '',
        Animename: '',
        writername: '',
        art: '',
        Reads: '',
        Description: '',
        AnimeImage: null,
      });
      navigate('/'); 
    } catch (error) {
      console.error('Error creating anime:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Add New Anime</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="AnimeCategories" placeholder="Categories" onChange={handleChange} className="border mb-2 p-2 w-full" required />
          <input type="text" name="Animename" placeholder="Anime Name" onChange={handleChange} className="border mb-2 p-2 w-full" required />
          <input type="text" name="writername" placeholder="Writer Name" onChange={handleChange} className="border mb-2 p-2 w-full" required />
          <input type="text" name="art" placeholder="Art" onChange={handleChange} className="border mb-2 p-2 w-full" required />
          <input type="text" name="Reads" placeholder="Reads" onChange={handleChange} className="border mb-2 p-2 w-full" />
          <textarea name="Description" placeholder="Description" onChange={handleChange} className="border mb-2 p-2 w-full" required></textarea>
          <input type="file" name="AnimeImage" onChange={handleFileChange} className="border mb-2 w-full" required />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Anime</button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddAnimeModal;
