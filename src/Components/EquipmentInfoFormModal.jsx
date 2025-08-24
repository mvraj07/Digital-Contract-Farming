import React, { useState, useEffect, useRef } from 'react';
import { FaSave, FaTimes, FaUpload, FaInfoCircle, FaMapMarkerAlt, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const link = import.meta.env.VITE_BACKEND;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const EquipmentInfoFormModal = ({ equipmentId, onClose, onEquipmentSaved }) => {
  const defaultLocation = {
    address: '',
    coordinates: [20.5937, 78.9629]
  };
  
  const [equipment, setEquipment] = useState({
    farmerId: '',
    farmerName: '',
    dailyRate: '',
    rentPeriod: 'day',
    yearBought: '',
    model: '',
    workType: 'own',
    location: { ...defaultLocation },
    availability: [],
    photos: [],
    fuelPolicy: 'farmer',
    handoverMethod: 'self-pickup',
    securityDeposit: '',
    lateReturnPenalty: '',
    penaltyUnit: 'hour',
    emergencyContact: '',
    accessories: ['trailer'],
    condition: 'excellent',
    discount: '',
    discountType: 'percentage',
    advanceBooking: '1',
    bookingUnit: 'month',
    fuelType: 'diesel',
    usageRestriction: '',
    returnLocationSame: true,
    returnLocation: { ...defaultLocation },
    cleaningRequirements: '',
    primaryContact: '',
    damageProtocol: {
      minorScratch: '5',
      majorDamage: '20',
      breakdown: 'full',
      missingAccessory: '25',
      engineFailure: 'full'
    }
  });
  
  const [error, setError] = useState('');
  const [filePreviews, setFilePreviews] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const mapRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const fetchEquipment = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${link}/api/equipment/${equipmentId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Failed to fetch equipment');
        const data = await response.json();
        
        const updatedEquipment = {
          ...data,
          location: data.location || { ...defaultLocation },
          returnLocation: data.returnLocation || { ...defaultLocation },
          availability: data.availability || [],
          accessories: data.accessories || ['trailer'],
          photos: data.photos || [],
          damageProtocol: data.damageProtocol || {
            minorScratch: '5',
            majorDamage: '20',
            breakdown: 'full',
            missingAccessory: '25',
            engineFailure: 'full'
          }
        };
        
        setEquipment(updatedEquipment);
        setLocationInput(updatedEquipment.location.address || '');
        
        if (data.photos && data.photos.length > 0) {
          setFilePreviews(data.photos.map(photo => ({
            url: photo.url,
            id: photo._id || Date.now() + Math.random()
          })));
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (equipmentId) {
      fetchEquipment();
    } else {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setEquipment(prev => ({
          ...prev,
          farmerId: user.id,
          farmerName: user.name
        }));
      }
    }
  }, [equipmentId]);

  const MapHandler = ({ setCoordinates }) => {
    const map = useMap();
    
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setCoordinates([lat, lng]);
        await reverseGeocode(lat, lng);
      }
    });
    
    useEffect(() => {
      if (equipment.location.coordinates) {
        map.setView(equipment.location.coordinates, map.getZoom());
      }
    }, [equipment.location.coordinates]);
    
    return equipment.location.coordinates ? (
      <Marker position={equipment.location.coordinates} />
    ) : null;
  };

  const reverseGeocode = async (lat, lng) => {
    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      
      const data = await response.json();
      const address = data.display_name || '';
      
      setLocationInput(address);
      setEquipment(prev => ({
        ...prev,
        location: {
          address,
          coordinates: [lat, lng]
        }
      }));
    } catch (err) {
      console.error('Reverse geocoding failed:', err);
      setError('Failed to get address from location');
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleGeocode = async () => {
    if (!locationInput.trim()) return;
    
    setIsGeocoding(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput)}`
      );
      
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const coordinates = [parseFloat(lat), parseFloat(lon)];
        
        setEquipment(prev => ({
          ...prev,
          location: {
            address: locationInput,
            coordinates
          }
        }));
        
        setShowMap(true);
      } else {
        setError('Location not found. Please try a different address.');
      }
    } catch (err) {
      console.error('Geocoding failed:', err);
      setError('Failed to get location from address');
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'accessories') {
        const updatedAccessories = checked
          ? [...equipment.accessories, value]
          : equipment.accessories.filter(item => item !== value);
        setEquipment({ ...equipment, accessories: updatedAccessories });
      } else if (name === 'returnLocationSame') {
        setEquipment({ 
          ...equipment, 
          returnLocationSame: checked,
          returnLocation: checked ? equipment.location : equipment.returnLocation
        });
      } else {
        setEquipment({ ...equipment, [name]: checked });
      }
    } else if (type === 'file') {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map(file => ({
        url: URL.createObjectURL(file),
        id: Date.now() + Math.random(),
        file
      }));
      
      setFilePreviews([...filePreviews, ...newPreviews]);
      setEquipment({ 
        ...equipment, 
        photos: [...equipment.photos, ...newFiles] 
      });
    } else if (name.startsWith('damageProtocol.')) {
      const protocolKey = name.split('.')[1];
      setEquipment({
        ...equipment,
        damageProtocol: {
          ...equipment.damageProtocol,
          [protocolKey]: value
        }
      });
    } else {
      setEquipment({ ...equipment, [name]: value });
    }
  };

  const handleRemovePhoto = (index) => {
    const newPreviews = [...filePreviews];
    const removed = newPreviews.splice(index, 1);
    
    if (removed[0] && removed[0].url.startsWith('blob:')) {
      URL.revokeObjectURL(removed[0].url);
    }
    
    setFilePreviews(newPreviews);
    
    const newPhotos = [...equipment.photos];
    newPhotos.splice(index, 1);
    setEquipment({ ...equipment, photos: newPhotos });
  };

  const handleDateSelect = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    setEquipment(prev => {
      if (prev.availability.includes(dateStr)) {
        return {
          ...prev,
          availability: prev.availability.filter(d => d !== dateStr)
        };
      } else {
        return {
          ...prev,
          availability: [...prev.availability, dateStr]
        };
      }
    });
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      days.push({ day, isCurrentMonth: false, date: new Date(year, month - 1, day) });
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({ day, isCurrentMonth: true, date });
    }
    
    const totalCells = 42;
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ day: i, isCurrentMonth: false, date });
    }
    
    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-3">
          <button 
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            &larr;
          </button>
          <h3 className="font-bold text-lg">
            {currentMonth.toLocaleString('default', { month: 'long' })} {year}
          </h3>
          <button 
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            &rarr;
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-center font-medium text-sm text-gray-600 p-1">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map(({ day, isCurrentMonth, date }, index) => {
            const dateStr = date.toISOString().split('T')[0];
            const isSelected = equipment.availability.includes(dateStr);
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <button
                key={index}
                type="button"
                onClick={() => isCurrentMonth && handleDateSelect(date)}
                className={`
                  h-8 rounded text-sm
                  ${isCurrentMonth ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-400'}
                  ${isSelected ? 'bg-green-500 text-white hover:bg-green-600' : ''}
                  ${isToday ? 'border border-blue-500' : ''}
                `}
                disabled={!isCurrentMonth}
                title={isCurrentMonth ? `Select ${date.toLocaleDateString()}` : undefined}
              >
                {day}
              </button>
            );
          })}
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {equipment.availability.map(date => (
            <div 
              key={date} 
              className="flex items-center bg-green-100 px-2 py-1 rounded-full text-sm"
            >
              {new Date(date).toLocaleDateString()}
              <button 
                type="button"
                onClick={() => handleDateSelect(new Date(date))}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <FaTimes size={10} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication token missing');

    const formData = new FormData();
    
    // Add all fields to formData
    Object.keys(equipment).forEach(key => {
      if (key === 'photos') {
        // Only send new files
        equipment.photos
          .filter(photo => photo instanceof File)
          .forEach(photo => {
            formData.append('photos', photo);
          });
      } else if (typeof equipment[key] === 'object') {
        // Stringify objects
        formData.append(key, JSON.stringify(equipment[key]));
      } else {
        formData.append(key, equipment[key]);
      }
    });

    const url = equipmentId 
      ? `${link}/api/equipment/${equipmentId}` 
      : `${link}/api/equipment`;
    
    const method = equipmentId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Operation failed');
    }

    alert(`Equipment ${equipmentId ? 'updated' : 'added'} successfully!`);
    if (onEquipmentSaved) onEquipmentSaved();
    onClose();
  } catch (err) {
    console.error("Operation error:", err);
    setError(err.message || `Failed to ${equipmentId ? 'update' : 'add'} equipment`);
  }
};

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const renderDamageProtocol = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block text-gray-700 mb-1 text-sm">
          Minor Scratch
        </label>
        <select
          name="damageProtocol.minorScratch"
          value={equipment.damageProtocol.minorScratch}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-sm"
        >
          <option value="5">5% deposit</option>
          <option value="10">10% deposit</option>
          <option value="15">15% deposit</option>
        </select>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1 text-sm">
          Major Damage
        </label>
        <select
          name="damageProtocol.majorDamage"
          value={equipment.damageProtocol.majorDamage}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-sm"
        >
          <option value="20">Repair cost + 20% penalty</option>
          <option value="25">Repair cost + 25% penalty</option>
          <option value="30">Repair cost + 30% penalty</option>
        </select>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1 text-sm">
          Complete Breakdown
        </label>
        <select
          name="damageProtocol.breakdown"
          value={equipment.damageProtocol.breakdown}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-sm"
        >
          <option value="full">Full deposit + repair</option>
          <option value="partial">50% deposit + repair</option>
        </select>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1 text-sm">
          Missing Accessories
        </label>
        <select
          name="damageProtocol.missingAccessory"
          value={equipment.damageProtocol.missingAccessory}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-sm"
        >
          <option value="25">Replacement cost + 25% penalty</option>
          <option value="30">Replacement cost + 30% penalty</option>
          <option value="35">Replacement cost + 35% penalty</option>
        </select>
      </div>
      
      <div>
        <label className="block text-gray-700 mb-1 text-sm">
          Engine Failure
        </label>
        <select
          name="damageProtocol.engineFailure"
          value={equipment.damageProtocol.engineFailure}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded text-sm"
        >
          <option value="full">Full repair cost</option>
          <option value="partial">50% repair cost</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      <div 
        className={`relative bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden border-4 border-green-800 transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        <div className="bg-green-800 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-bold">
            {equipmentId ? 'Edit Equipment' : 'Add New Equipment'}
          </h2>
          <button 
            onClick={handleClose} 
            className="text-white hover:text-yellow-300 transition-colors"
            aria-label="Close"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 60px)' }}>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                  Farmer ID
                </label>
                <input
                  type="text"
                  name="farmerId"
                  value={equipment.farmerId}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base bg-gray-100"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                  Farmer Name
                </label>
                <input
                  type="text"
                  name="farmerName"
                  value={equipment.farmerName}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded text-sm md:text-base bg-gray-100"
                  readOnly
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-grow">
                  <label className="block text-gray-700 mb-1 text-sm">
                    Daily Rent (₹)*
                  </label>
                  <input
                    type="number"
                    name="dailyRate"
                    value={equipment.dailyRate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Period*
                  </label>
                  <select
                    name="rentPeriod"
                    value={equipment.rentPeriod}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    required
                  >
                    <option value="hour">Per Hour</option>
                    <option value="day">Per Day</option>
                    <option value="week">Per Week</option>
                    <option value="month">Per Month</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Year Bought*
                </label>
                <input
                  type="number"
                  name="yearBought"
                  value={equipment.yearBought}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Equipment Model*
                </label>
                <input
                  type="text"
                  name="model"
                  value={equipment.model}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 text-sm">
                  Work Type*
                </label>
                <select
                  name="workType"
                  value={equipment.workType}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  required
                  >
                  <option value="own">Own</option>
                  <option value="rent">Rent</option>
                  <option value="lease">Lease</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden mb-4 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b pb-3">
                <FaMapMarkerAlt className="mr-2 text-green-600" /> Location Details
              </h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-sm">
                  Pickup Location*
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter area name or address"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded text-sm"
                  />
                  <button 
                    type="button"
                    onClick={handleGeocode}
                    disabled={isGeocoding}
                    className="px-3 py-2 bg-green-600 text-white rounded text-sm disabled:opacity-50"
                  >
                    {isGeocoding ? 'Locating...' : 'Find on Map'}
                  </button>
                </div>
                
                {showMap && (
                  <div className="mt-4 h-64 rounded-lg overflow-hidden">
                    <MapContainer 
                      center={equipment.location.coordinates} 
                      zoom={13} 
                      style={{ height: '100%', width: '100%' }}
                      ref={mapRef}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <MapHandler 
                        setCoordinates={(coords) => setEquipment(prev => ({
                          ...prev,
                          location: {
                            ...prev.location,
                            coordinates: coords
                          }
                        }))} 
                      />
                    </MapContainer>
                    <p className="text-gray-500 text-xs mt-2">
                      Click on the map to set exact location
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="returnLocationSame"
                  checked={equipment.returnLocationSame}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-gray-700 text-sm">
                  Return location same as pickup
                </label>
              </div>
              
              {!equipment.returnLocationSame && (
                <div>
                  <label className="block text-gray-700 mb-2 text-sm">
                    Return Location*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter return address"
                    value={equipment.returnLocation.address}
                    onChange={(e) => setEquipment({
                      ...equipment,
                      returnLocation: {
                        ...equipment.returnLocation,
                        address: e.target.value
                      }
                    })}
                    className="w-full p-2 border border-gray-300 rounded text-sm mb-2"
                  />
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden mb-4 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b pb-3">
                <FaCalendarAlt className="mr-2 text-green-600" /> Availability Calendar
              </h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-sm">
                  Select dates when equipment is available for rent*
                </label>
                
                <div className="flex items-center mb-3">
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="px-3 py-2 bg-green-600 text-white rounded text-sm"
                  >
                    {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
                  </button>
                  <span className="ml-4 text-sm text-gray-600">
                    {equipment.availability.length} date(s) selected
                  </span>
                </div>
                
                {showCalendar && renderCalendar()}
                
                <div className="mt-3 text-sm text-gray-600">
                  <p className="flex items-center mb-1">
                    <span className="w-4 h-4 bg-green-500 mr-2 inline-block rounded-sm"></span>
                    Selected date
                  </p>
                  <p className="flex items-center">
                    <span className="w-4 h-4 border border-blue-500 mr-2 inline-block rounded-sm"></span>
                    Today's date
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden mb-4 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b pb-3">
                <FaInfoCircle className="mr-2 text-green-600" /> Rental Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Security Deposit (₹)*
                    </label>
                    <input
                      type="number"
                      name="securityDeposit"
                      value={equipment.securityDeposit}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Late Return Penalty
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="lateReturnPenalty"
                        value={equipment.lateReturnPenalty}
                        onChange={handleChange}
                        placeholder="Amount"
                        className="flex-grow p-2 border border-gray-300 rounded text-sm"
                      />
                      <select
                        name="penaltyUnit"
                        value={equipment.penaltyUnit}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded text-sm"
                      >
                        <option value="hour">Per Hour</option>
                        <option value="day">Per Day</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Fuel Policy*
                    </label>
                    <select
                      name="fuelPolicy"
                      value={equipment.fuelPolicy}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    >
                      <option value="farmer">Farmer Provides</option>
                      <option value="renter">Renter Pays</option>
                      <option value="shared">Shared Cost</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Handover Method*
                    </label>
                    <select
                      name="handoverMethod"
                      value={equipment.handoverMethod}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    >
                      <option value="self-pickup">Self Pickup Only</option>
                      <option value="farmer-delivery">Farmer Delivery</option>
                      <option value="third-party">Third Party Logistic</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Fuel Type*
                    </label>
                    <select
                      name="fuelType"
                      value={equipment.fuelType}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    >
                      <option value="diesel">Diesel</option>
                      <option value="petrol">Petrol</option>
                      <option value="electric">Electric</option>
                      <option value="cng">CNG</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Included Accessories
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Trailer', 'Attachments', 'Harvester', 'Plow', 'Seeder', 'Sprayer'].map(acc => (
                        <div key={acc} className="flex items-center">
                          <input
                            type="checkbox"
                            name="accessories"
                            value={acc.toLowerCase()}
                            checked={equipment.accessories.includes(acc.toLowerCase())}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <label className="text-gray-700 text-sm">{acc}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Current Condition*
                    </label>
                    <select
                      name="condition"
                      value={equipment.condition}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Discount for Long Rentals
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="discount"
                        value={equipment.discount}
                        onChange={handleChange}
                        placeholder="Value"
                        className="flex-grow p-2 border border-gray-300 rounded text-sm"
                      />
                      <select
                        name="discountType"
                        value={equipment.discountType}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded text-sm"
                      >
                        <option value="percentage">%</option>
                        <option value="fixed">₹</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Advance Booking Window*
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="advanceBooking"
                        value={equipment.advanceBooking}
                        onChange={handleChange}
                        min="1"
                        className="flex-grow p-2 border border-gray-300 rounded text-sm"
                        required
                      />
                      <select
                        name="bookingUnit"
                        value={equipment.bookingUnit}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded text-sm"
                      >
                        <option value="day">Days</option>
                        <option value="week">Weeks</option>
                        <option value="month">Months</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-700 mb-2 text-sm">
                  Usage Restrictions
                </label>
                <textarea
                  name="usageRestriction"
                  value={equipment.usageRestriction}
                  onChange={handleChange}
                  placeholder="e.g., no off-road use, max 8 hours/day"
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  rows="2"
                />
              </div>
              
              <div className="mt-4">
                <label className="block text-gray-700 mb-2 text-sm">
                  Cleaning Requirements After Return
                </label>
                <textarea
                  name="cleaningRequirements"
                  value={equipment.cleaningRequirements}
                  onChange={handleChange}
                  placeholder="Specify cleaning expectations"
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  rows="2"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 overflow-hidden mb-4 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center border-b pb-3">
                <FaInfoCircle className="mr-2 text-green-600" /> Contact & Damage Policy
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Primary Contact During Rental*
                    </label>
                    <input
                      type="text"
                      name="primaryContact"
                      value={equipment.primaryContact}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Emergency Maintenance Contact*
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={equipment.emergencyContact}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm">
                      Upload Equipment Photos (Max 5)
                    </label>
                    <div className="flex items-center">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FaUpload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-1 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span>
                          </p>
                          <p className="text-xs text-gray-500">
                            JPG or PNG (MAX. 5MB each)
                          </p>
                        </div>
                        <input 
                          type="file" 
                          name="photos"
                          onChange={handleChange}
                          accept=".jpg, .jpeg, .png"
                          multiple
                          className="hidden" 
                          disabled={filePreviews.length >= 5}
                        />
                      </label>
                    </div>
                    {filePreviews.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {filePreviews.map((preview, index) => (
                          <div key={preview.id} className="w-16 h-16 relative group">
                            <img 
                              src={preview.url} 
                              alt={`Preview ${index}`}
                              className="w-full h-full object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FaTrash size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Damage Assessment Protocol
                </h4>
                {renderDamageProtocol()}
                
                <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-4">
                  Late Return Penalties
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      1-2 hours late
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm">1% extra charge</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1 text-sm">
                      2-5 hours late
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm">Full day charge</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm md:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center gap-2 transition-colors text-sm md:text-base"
              >
                <FaSave className="text-sm md:text-base" />
                {equipmentId ? 'Update Equipment' : 'Add Equipment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EquipmentInfoFormModal;
















