import React, { useState, useEffect } from 'react';
import { FaTrash, FaChevronDown, FaChevronUp, FaInfoCircle } from 'react-icons/fa';
import EquipmentInfoFormModal from './EquipmentInfoFormModal';

const link = import.meta.env.VITE_BACKEND;

const SectionTitle = ({ title }) => (
  <div className="text-center bg-green-800 text-white py-3 text-lg font-bold rounded-md mb-6 w-full">
    {title}
  </div>
);

const EquipmentCard = ({ id, image, title, type, dailyRate, status, onDelete, onAddInfoClick }) => (
  <div className="bg-gray-100 border border-green-800 text-center p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <img
      src={image || '/placeholder-equipment.jpg'}
      alt={title}
      className="w-full h-40 object-cover rounded-md mb-2"
    />
    <h4 className="bg-green-800 text-white py-1 rounded-md text-lg font-semibold">{title}</h4>
    <p className="text-gray-700 mt-1">{type}</p>
    <p className="font-bold text-gray-900 mt-1">₹{dailyRate}/day</p>
    <p className={`font-bold mt-1 ${status === 'Available' ? 'text-green-600' : 'text-orange-500'}`}>
      {status}
    </p>
    <div className="mt-3 flex gap-2">
      <button
        onClick={() => onAddInfoClick(id)}
        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-800 transition flex-1 flex items-center justify-center"
      >
        <FaInfoCircle className="mr-2" /> Add Info
      </button>
      <button
        onClick={() => onDelete(id)}
        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-800 transition flex-1 flex items-center justify-center"
      >
        <FaTrash className="mr-2" /> Delete
      </button>
    </div>
  </div>
);

const EquipmentSection = () => {
  const [equipment, setEquipment] = useState([]);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    type: '',
    dailyRate: '',
    status: 'Available',
  });
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [showEquipmentModal, setShowEquipmentModal] = useState({
    isOpen: false,
    equipmentId: null
  });

  const fetchEquipment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${link}/api/equipment-rent`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch equipment');
      const data = await response.json();
      setEquipment(data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      setError('Failed to load equipment. Please try again later.');
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${link}/api/equipment-rent/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete equipment');
      setEquipment((prev) => prev.filter((item) => item._id !== id));
      alert('Deleted successfully!');
    } catch (error) {
      console.error('Delete error:', error);
      setError(error.message);
    }
  };

  const openEquipmentModal = (equipmentId) => {
    setShowEquipmentModal({
      isOpen: true,
      equipmentId
    });
  };

  const closeEquipmentModal = () => {
    setShowEquipmentModal({
      isOpen: false,
      equipmentId: null
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${link}/api/equipment-rent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          dailyRate: Number(formData.dailyRate) || 0,
        }),
      });
      if (!response.ok) throw new Error('Failed to add equipment');
      const newItem = await response.json();
      setEquipment((prev) => [...prev, newItem]);
      setFormData({
        image: '',
        title: '',
        type: '',
        dailyRate: '',
        status: 'Available',
      });
    } catch (error) {
      console.error('Add equipment error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="w-full px-4">
      {/* Equipment Info Modal - Only shown when "Add Info" is clicked */}
      {showEquipmentModal.isOpen && (
        <EquipmentInfoFormModal
          equipmentId={showEquipmentModal.equipmentId}
          onClose={closeEquipmentModal}
          onEquipmentSaved={fetchEquipment}
        />
      )}

      <SectionTitle title="Farming Equipment for Rent" />
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12 w-full">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.slice(0, showAll ? equipment.length : 3).map((item) => (
              <EquipmentCard
                key={item._id}
                id={item._id}
                image={item.image}
                title={item.title}
                type={item.type}
                dailyRate={item.dailyRate}
                status={item.status}
                onDelete={handleDelete}
                onAddInfoClick={openEquipmentModal}
              />
            ))}
          </div>
          {equipment.length > 3 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-3 rounded-lg 
                hover:from-green-600 hover:to-green-500 transition-all duration-300 shadow-md
                hover:shadow-lg flex items-center justify-center gap-2 mx-auto"
              >
                {showAll ? <><FaChevronUp /> Show Less</> : <><FaChevronDown /> View All</>}
              </button>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-4 mx-4"
        >
          <h3 className="text-lg font-semibold mb-4">Add New Equipment</h3>
          <input
            type="url"
            placeholder="Image URL"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-600"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Equipment Name"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-600"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Equipment Type"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-600"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Daily Rate"
            min="0"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-600"
            value={formData.dailyRate}
            onChange={(e) => setFormData({ ...formData, dailyRate: e.target.value })}
            required
          />
          <select
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-green-600"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Available">Available</option>
            <option value="Pre-book">Pre-book</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-3 rounded hover:bg-green-600 transition font-semibold"
          >
            Add Equipment
          </button>
        </form>
      </div>
    </div>
  );
};

export default EquipmentSection;