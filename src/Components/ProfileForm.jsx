import React, { useEffect, useState } from 'react';
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position ? (
    <Marker position={position} />
  ) : null;
};

const ProfileForm = ({ 
  profile, 
  onUpdate, 
  onClose,
  notification,
  setNotification
}) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    surname: profile.surname || '',
    phone: profile.phone || '',
    pincode: profile.pincode || '',
    companyName: profile.companyName || '',
    email: profile.email || '',
    role: profile.role || '',
    image: profile.image || '',
    location: profile.location || null
  });
  
  const [position, setPosition] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(true);

  // Initialize map position from form data
  useEffect(() => {
    if (formData.location && formData.location.coordinates) {
      setPosition({
        lat: formData.location.coordinates[1],
        lng: formData.location.coordinates[0]
      });
    }
    setIsMapLoading(false);
  }, [formData.location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleLocationSelect = () => {
  if (!position) {
    setNotification('Please select a location on the map');
    return;
  }
  
  setFormData(prev => ({
    ...prev,
    location: {
      type: 'Point',
      coordinates: [
        parseFloat(position.lng.toFixed(6)),  // Convert to number
        parseFloat(position.lat.toFixed(6))   // Convert to number
      ],
      address: `Location at ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`
    }
  }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  
  // Validate phone number
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(formData.phone)) {
    setNotification('Invalid phone number format');
    return;
  }

  // Prepare properly formatted location
  const locationData = position 
    ? {
        type: 'Point',
        coordinates: [
          parseFloat(position.lng.toFixed(6)),
          parseFloat(position.lat.toFixed(6))
        ],
        address: `Location at ${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`
      }
    : null;

  onUpdate({
    ...formData,
    location: locationData
  });
};
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-2xl relative shadow-lg animate-scale-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>
        
        {notification && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {notification}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <label htmlFor="profile-image" className="cursor-pointer">
              {formData.image ? (
                <img 
                  src={formData.image} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 flex items-center justify-center">
                  <UserCircleIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            <span className="mt-2 text-sm text-blue-600 cursor-pointer" onClick={() => document.getElementById('profile-image').click()}>
              Change Photo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 text-sm font-medium">First Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {formData.role === 'buyer' && (
            <div>
              <label className="text-gray-700 text-sm font-medium">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <div>
            <label className="text-gray-700 text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-600 bg-gray-50 cursor-not-allowed"
              disabled
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                pattern="[0-9]{10}"
                title="10-digit phone number"
              />
            </div>
            <div>
              <label className="text-gray-700 text-sm font-medium">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Location Selection */}
          <div className="mt-4">
            <label className="text-gray-700 text-sm font-medium">Location</label>
            <p className="text-sm text-gray-500 mb-2">Click on the map to select your location in India</p>
            
            {!isMapLoading && (
              <div className="h-64 w-full rounded-md overflow-hidden relative border border-gray-300">
                <MapContainer 
                  center={position || [20.5937, 78.9629]} 
                  zoom={position ? 12 : 5} 
                  style={{ height: '100%', width: '100%' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocationMarker position={position} setPosition={setPosition} />
                </MapContainer>
                
                {position && (
                  <div className="absolute bottom-2 left-2 bg-white p-2 rounded-md shadow-md text-xs">
                    Selected: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-2 flex justify-between">
              <button
                type="button"
                onClick={handleLocationSelect}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                {formData.location ? 'Update Location' : 'Confirm Location'}
              </button>
              
              {formData.location && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, location: null }));
                    setPosition(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                >
                  Clear Location
                </button>
              )}
            </div>
            
            {formData.location && (
              <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                <p className="font-medium">Selected Location:</p>
                <p>{formData.location.address}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium mt-6"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;