import React, { useState, useEffect } from 'react';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    _id: '',
    name: '',
    phoneNo: '',
    branch: '',
    fees: '',
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/data/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setData(data.filter((item) => item._id !== id));
      })
      .catch((error) => console.error('Error deleting data:', error));
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    fetch(`http://localhost:5000/api/data/${currentItem._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentItem),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setData(
          data.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          )
        );
        setIsEditing(false);
      })
      .catch((error) => console.error('Error updating data:', error));
  };

  const handleAdd = () => {
    setCurrentItem({
      name: '',
      phoneNo: '',
      branch: '',
      fees: '',
    });
    setIsAdding(true);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddSubmit = () => {
    fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentItem),
    })
      .then((response) => response.json())
      .then((newItem) => {
        setData([...data, newItem]);
        setIsAdding(false);
      })
      .catch((error) => console.error('Error adding data:', error));
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={handleFilterChange}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      <button onClick={handleAdd} style={{ marginBottom: '20px' }}>
        Add New Data
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone No</th>
            <th>Branch</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.phoneNo}</td>
              <td>{item.branch}</td>
              <td>{item.fees}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Edit Item</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={currentItem.name}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Phone No:
              <input
                type="text"
                name="phoneNo"
                value={currentItem.phoneNo}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Branch:
              <input
                type="text"
                name="branch"
                value={currentItem.branch}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Fees:
              <input
                type="text"
                name="fees"
                value={currentItem.fees}
                onChange={handleEditChange}
              />
            </label>
            <div style={{ marginTop: '20px' }}>
              <button onClick={handleEditSubmit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {isAdding && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>Add New Item</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={currentItem.name}
                onChange={handleAddChange}
              />
            </label>
            <label>
              Phone No:
              <input
                type="text"
                name="phoneNo"
                value={currentItem.phoneNo}
                onChange={handleAddChange}
              />
            </label>
            <label>
              Branch:
              <input
                type="text"
                name="branch"
                value={currentItem.branch}
                onChange={handleAddChange}
              />
            </label>
            <label>
              Fees:
              <input
                type="text"
                name="fees"
                value={currentItem.fees}
                onChange={handleAddChange}
              />
            </label>
            <div style={{ marginTop: '20px' }}>
              <button onClick={handleAddSubmit}>Add</button>
              <button onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
};

export default DataTable;
