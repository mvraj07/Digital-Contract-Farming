// import React, { useState, useEffect } from 'react';
// import ProfileForm from './ProfileForm';
// import {
//   HomeIcon,
//   DocumentTextIcon,
//   ShoppingCartIcon,
//   ChartBarIcon,
//   UserCircleIcon,
//   XMarkIcon,
//   Bars3Icon,
//   BellIcon,
//   QrCodeIcon,
//   UsersIcon,
//   ClipboardDocumentCheckIcon,
//   InformationCircleIcon,
//   ArrowRightOnRectangleIcon,
//   ChatBubbleLeftRightIcon,
//   CurrencyRupeeIcon,
//   WrenchScrewdriverIcon
// } from '@heroicons/react/24/outline';

// const link = import.meta.env.VITE_BACKEND;

// const BuyerDashboard = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [contracts, setContracts] = useState([]);
//   const [farmers, setFarmers] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [notification, setNotification] = useState('');
//   const [selectedContract, setSelectedContract] = useState(null);
//   const [showCart, setShowCart] = useState(false);
//   const [showProfileForm, setShowProfileForm] = useState(false);
//   const [profile, setProfile] = useState({});
//   const [negotiationMessage, setNegotiationMessage] = useState('');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showScanner, setShowScanner] = useState(false);
//   const [showNotificationsModal, setShowNotificationsModal] = useState(false);
//   const [proposedPrice, setProposedPrice] = useState('');
//   const [negotiations, setNegotiations] = useState([]);
//   const [negotiationRequests, setNegotiationRequests] = useState([]);
//   const [selectedDeal, setSelectedDeal] = useState(null);
//   const [mandiRates, setMandiRates] = useState([]);
//   const [equipment, setEquipment] = useState([]);
//   const [activeSubTab, setActiveSubTab] = useState('contracts');
//   const [selectedEquipment, setSelectedEquipment] = useState(null);
  
//   // New state for lands
//   const [contractFarmingLands, setContractFarmingLands] = useState([]);
//   const [rentalLands, setRentalLands] = useState([]);
//   const [selectedLand, setSelectedLand] = useState(null);

//   const viewDealDetails = (deal) => {
//     setSelectedDeal(deal);
//   };

//   const getFarmerName = (farmer) => {
//     if (!farmer) return 'Unknown';
//     return `${farmer.fName || ''} ${farmer.lName || ''}`.trim() || 'Unknown Farmer';
//   };

//   const fetchWithAuth = async (url, options = {}) => {
//     const token = localStorage.getItem('buyerToken');
//     if (!token) {
//       window.location.href = '/login';
//       return;
//     }

//     try {
//       const fullUrl = `${link}${url}`;
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           ...options.headers,
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.status === 401) {
//         localStorage.removeItem('buyerToken');
//         window.location.href = '/login';
//         return;
//       }

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || 'Request failed');
//       }

//       return response.json();
//     } catch (error) {
//       setNotification(error.message);
//       throw error;
//     }
//   };

//   const fetchContracts = async () => {
//     try {
//       const data = await fetchWithAuth('/api/contracts');
//       setContracts(data);
//     } catch (error) {
//       setContracts([]);
//     }
//   };

//   const fetchEquipment = async () => {
//     try {
//       const data = await fetchWithAuth('/api/buyer/equipment');
//       setEquipment(data);
//     } catch (error) {
//       console.error('Failed to fetch equipment:', error);
//       setEquipment([]);
//     }
//   };

//   const fetchFarmers = async () => {
//     try {
//       const data = await fetchWithAuth('/api/users/farmers');
//       setFarmers(data);
//     } catch (error) {
//       setFarmers([]);
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       const data = await fetchWithAuth('/api/profile');
//       setProfile(data);
//     } catch (error) {
//       setProfile({});
//     }
//   };

//   const fetchNegotiations = async () => {
//     try {
//       const data = await fetchWithAuth('/api/negotiations');
//       setNegotiationRequests(data);
//     } catch (error) {
//       setNegotiationRequests([]);
//     }
//   };

//   const fetchMandiRates = async () => {
//     try {
//       const mockRates = [
//         { commodity: "Apple", market: "Azadpur Mandi, Delhi", minPrice: 80, maxPrice: 120 },
//         { commodity: "Banana", market: "Chennai Koyambedu", minPrice: 30, maxPrice: 45 },
//         { commodity: "Mango", market: "Vashi Market, Mumbai", minPrice: 60, maxPrice: 150 },
//         { commodity: "Grapes", market: "Bangalore Market", minPrice: 50, maxPrice: 90 },
//         { commodity: "Orange", market: "Nagpur Market", minPrice: 40, maxPrice: 70 },
//       ];
      
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setMandiRates(mockRates);
//     } catch (error) {
//       setNotification('Failed to fetch mandi rates');
//       setMandiRates([]);
//     }
//   };

//   const fetchContractFarmingLands = async () => {
//     try {
//       const mockLands = [
//         {
//           _id: "land1",
//           title: "Organic Farmland - 5 Acres",
//           location: "Punjab",
//           size: "5 acres",
//           soilType: "Alluvial",
//           waterSource: "Canal",
//           pricePerAcre: 15000,
//           leaseDuration: "1 year",
//           owner: { name: "Raj Singh" },
//           description: "Prime organic farmland ready for contract farming. Ideal for fruits and vegetables. Fully irrigated with modern facilities.",
//           image: "https://placehold.co/400x200/E0F2F7/000000?text=Farmland",
//           photos: [
//             "https://placehold.co/200x200/E0F2F7/000000?text=Photo1",
//             "https://placehold.co/200x200/E0F2F7/000000?text=Photo2",
//             "https://placehold.co/200x200/E0F2F7/000000?text=Photo3"
//           ],
//           features: ["Organic certified", "Drip irrigation", "Storage facility"]
//         },
//         {
//           _id: "land2",
//           title: "Rice Farmland - 10 Acres",
//           location: "West Bengal",
//           size: "10 acres",
//           soilType: "Clay",
//           waterSource: "River",
//           pricePerAcre: 12000,
//           leaseDuration: "2 years",
//           owner: { name: "Suresh Das" },
//           description: "Large rice farmland with water reservoir. Perfect for paddy cultivation. Comes with farm equipment.",
//           image: "https://placehold.co/400x200/E0F2F7/000000?text=Rice+Farm",
//           photos: [
//             "https://placehold.co/200x200/E0F2F7/000000?text=Photo1",
//             "https://placehold.co/200x200/E0F2F7/000000?text=Photo2"
//           ],
//           features: ["Water reservoir", "Tractor included", "Near processing unit"]
//         }
//       ];
      
//       await new Promise(resolve => setTimeout(resolve, 800));
//       setContractFarmingLands(mockLands);
//     } catch (error) {
//       console.error('Failed to fetch contract farming lands:', error);
//       setContractFarmingLands([]);
//     }
//   };

//   const fetchRentalLands = async () => {
//     try {
//       const mockLands = [
//         {
//           _id: "land3",
//           title: "Fertile Agricultural Land",
//           location: "Maharashtra",
//           size: "8 acres",
//           soilType: "Black Cotton",
//           waterSource: "Well",
//           rentalPrice: 8000,
//           minLease: "6 months",
//           owner: { name: "Vikram Patil" },
//           description: "Well-maintained land with irrigation facilities. Suitable for multiple crops.",
//           image: "https://placehold.co/400x200/E0F2F7/000000?text=Rental+Land",
//           photos: [
//             "https://placehold.co/200x200/E0F2F7/000000?text=Photo1",
//             "https://placehold.co/200x200/E0F2F7/000000?text=Photo2",
//             "https://placehold.co/200x200/E0F2F7/000000?text=Photo3"
//           ],
//           features: ["Borewell", "Fencing", "Storage shed"]
//         },
//         {
//           _id: "land4",
//           title: "Orchard Land - 3 Acres",
//           location: "Himachal Pradesh",
//           size: "3 acres",
//           soilType: "Loamy",
//           waterSource: "Spring",
//           rentalPrice: 6000,
//           minLease: "1 year",
//           owner: { name: "Meena Sharma" },
//           description: "Beautiful orchard land with apple trees. Ready for immediate cultivation.",
//           image: "https://placehold.co/400x200/E0F2F7/000000?text=Orchard",
//           photos: [
//             "https://placehold.co/200x200/E0F2F7/000000?text=Photo1"
//           ],
//           features: ["Existing apple trees", "Greenhouse", "Terrace farming"]
//         }
//       ];
      
//       await new Promise(resolve => setTimeout(resolve, 800));
//       setRentalLands(mockLands);
//     } catch (error) {
//       console.error('Failed to fetch rental lands:', error);
//       setRentalLands([]);
//     }
//   };

// const updateProfile = async (updatedProfile) => {
//   try {
//     // Send the updatedProfile directly (no restructuring needed)
//     await fetchWithAuth('/api/profile', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedProfile)
//     });
    
//     // Update local profile state
//     setProfile(updatedProfile);
//     setShowProfileForm(false);
//     setNotification('Profile updated successfully');
//   } catch (error) {
//     setNotification('Failed to update profile: ' + error.message);
//   }
// };

//   const sendNegotiation = async () => {
//     try {
//       const response = await fetchWithAuth('/api/buyer/negotiations', {
//         method: 'POST',
//         body: JSON.stringify({
//           contractId: selectedContract._id,
//           message: negotiationMessage,
//           proposedPrice: Number(proposedPrice),
//           farmerId: selectedContract.farmer?._id
//         })
//       });

//       setNegotiations(prev => [
//         ...prev,
//         {
//           ...response,
//           farmerName: getFarmerName(selectedContract.farmer),
//           product: selectedContract.title
//         }
//       ]);

//       setNegotiationMessage('');
//       setProposedPrice('');
//       setSelectedContract(null);
//       setNotification('Negotiation sent successfully!');
//     } catch (error) {
//       setNotification('Failed to send negotiation: ' + error.message);
//     }
//   };

//   const handleNegotiationAction = async (id, action) => {
//     try {
//       await fetchWithAuth(`/api/negotiations/${id}/${action}`, {
//         method: 'PUT'
//       });
      
//       setNegotiationRequests(prev => 
//         prev.map(n => 
//           n._id === id ? {...n, status: action} : n
//         )
//       );
      
//       setNotification(`Negotiation ${action}ed successfully`);
//     } catch (error) {
//       setNotification(`Failed to ${action} negotiation: ${error.message}`);
//     }
//   };

//   const handleCartAction = (item) => {
//     setCartItems(prev => {
//       const exists = prev.some(i => i._id === item._id);
//       return exists
//         ? prev.filter(i => i._id !== item._id)
//         : [...prev, item];
//     });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('buyerToken');
//     window.location.href = '/Dashboard';
//   };

//   const viewAllDetails = () => {
//     if (selectedContract) {
//       alert(`Viewing all details for contract: ${selectedContract.title}\nFarmer: ${getFarmerName(selectedContract.farmer)}\nPrice: ₹${selectedContract.price}\nQuantity: ${selectedContract.quantity}`);
//     }
//   };

//   useEffect(() => {
//     const checkAuthAndFetch = async () => {
//       const token = localStorage.getItem('buyerToken');
//       if (!token) {
//         window.location.href = '/login';
//         return;
//       }
//       await fetchContracts();
//       await fetchProfile();
//       await fetchFarmers();
//       await fetchNegotiations();
//       setIsLoading(false);
//     };
//     checkAuthAndFetch();
//   }, []);

//   useEffect(() => {
//     if (activeTab === 'mandiRates') {
//       fetchMandiRates();
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     if (activeTab === 'contracts') {
//       if (activeSubTab === 'equipment') {
//         fetchEquipment();
//       } else if (activeSubTab === 'contractFarmingLands') {
//         fetchContractFarmingLands();
//       } else if (activeSubTab === 'rentalLands') {
//         fetchRentalLands();
//       }
//     }
//   }, [activeTab, activeSubTab]);

//   const OngoingDealsCard = ({ deal }) => {
//     const farmerName = deal.farmer 
//       ? `${deal.farmer.fName} ${deal.farmer.lName}` 
//       : 'Unknown Farmer';
    
//     const contract = deal.contractId || {};
//     const productName = contract.title || 'Contract';
//     const quantity = contract.quantity || 'N/A';
//     const quality = contract.quality || 'Standard';
//     const location = contract.location || 'N/A';
    
//     return (
//       <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h3 className="font-bold text-lg text-gray-800">
//               {productName}
//             </h3>
//             <p className="text-gray-600">
//               With {farmerName}
//             </p>
//           </div>
//           <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
//             Active
//           </span>
//         </div>
        
//         <div className="grid grid-cols-2 gap-4 mt-4">
//           <div>
//             <p className="text-sm text-gray-500">Finalized Price</p>
//             <p className="font-semibold text-lg">
//               ₹{deal.proposedPrice?.toLocaleString() || 'N/A'}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Agreed On</p>
//             <p className="font-semibold">
//               {new Date(deal.updatedAt).toLocaleDateString()}
//             </p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Quantity</p>
//             <p className="font-semibold">{quantity}</p>
//           </div>
//           <div>
//             <p className="text-sm text-gray-500">Quality</p>
//             <p className="font-semibold">{quality}</p>
//           </div>
//         </div>
        
//         <div className="mt-4 flex flex-col sm:flex-row gap-2">
//           <button 
//             onClick={() => viewDealDetails(deal)}
//             className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
//           >
//             View Full Details
//           </button>
//           <button className="flex-1 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition">
//             Track Shipment
//           </button>
//         </div>
//       </div>
//     );
//   };

//   const MandiRatesSection = () => (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Fruits Mandi Rates</h2>
//         <button 
//           onClick={() => window.open('https://agmarknet.gov.in/', '_blank')}
//           className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
//         >
//           View on Agmarknet <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//           </svg>
//         </button>
//       </div>
      
//       {mandiRates.length === 0 ? (
//         <div className="text-center py-10">
//           <CurrencyRupeeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading mandi rates...</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commodity</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Price (₹/kg)</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Price (₹/kg)</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {mandiRates.map((rate, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.commodity}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.market}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{rate.minPrice}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{rate.maxPrice}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
//             <div className="flex items-start gap-3">
//               <InformationCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
//               <p className="text-sm text-blue-700">
//                 Data sourced from Agmarknet.gov.in. Prices are indicative and may vary.
//                 Last updated: {new Date().toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const ImageScanner = () => (
//     <div className="p-6 text-center">
//       <h3 className="text-xl font-semibold mb-4">Image Scanner</h3>
//       <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
//         <p className="text-gray-500">Scanner Area</p>
//       </div>
//       <p className="text-gray-600">Scan your document or product here.</p>
//       <button
//         onClick={() => setShowScanner(false)}
//         className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//       >
//         Close Scanner
//       </button>
//     </div>
//   );

//   const Notifications = () => (
//     <div className="p-6 text-center">
//       <h3 className="text-xl font-semibold mb-4">Your Notifications</h3>
//       <ul className="text-left space-y-2">
//         {negotiationRequests.filter(n => n.status === 'accepted' || n.status === 'declined').slice(0, 3).map((notif, idx) => (
//           <li key={idx} className="p-2 bg-gray-100 rounded-md">
//             {`Your negotiation for ${notif.product} has been ${notif.status}`}
//           </li>
//         ))}
//         <li className="p-2 bg-gray-100 rounded-md">New contract from Farmer X for Wheat.</li>
//         <li className="p-2 bg-gray-100 rounded-md">Deal with Farmer A is now "Packaging".</li>
//       </ul>
//       <button
//         onClick={() => setShowNotificationsModal(false)}
//         className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//       >
//         Close Notifications
//       </button>
//     </div>
//   );

//   const DashboardStats = () => (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {[
//         { title: "Active Contracts", value: contracts.length },
//         { title: "Cart Items", value: cartItems.length },
//         { title: "Farmers", value: farmers.length }
//       ].map((stat, idx) => (
//         <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="text-sm text-gray-500">{stat.title}</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
//             </div>
//             <ChartBarIcon className="w-8 h-8 text-green-500" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const RecentContractsTable = () => (
//     <div className="bg-white rounded-lg p-6 shadow-md">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold text-gray-800">Recent Contracts</h2>
//         <button 
//           onClick={() => setActiveTab('contracts')}
//           className="text-green-600 hover:text-green-800 text-sm font-medium"
//         >
//           View All &gt;
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr className="text-left text-gray-600 border-b border-gray-200">
//               <th className="py-3 px-4 text-sm font-semibold">Farmer</th>
//               <th className="py-3 px-4 text-sm font-semibold">Product</th>
//               <th className="py-3 px-4 text-sm font-semibold">Quantity</th>
//               <th className="py-3 px-4 text-sm font-semibold">Price</th>
//               <th className="py-3 px-4 text-sm font-semibold">Status</th>
//               <th className="py-3 px-4 text-sm font-semibold">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {contracts.slice(0, 3).map(contract => (
//               <tr key={contract._id} className="text-gray-700 hover:bg-gray-50 transition-colors duration-150">
//                 <td className="py-4 px-4">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={contract.farmer?.image || 'https://placehold.co/40x40/E0F2F7/000000?text=F'}
//                       className="w-8 h-8 rounded-full object-cover"
//                       alt="Farmer"
//                       onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/E0F2F7/000000?text=F' }}
//                     />
//                     <span>{getFarmerName(contract.farmer)}</span>
//                   </div>
//                 </td>
//                 <td className="py-4 px-4">{contract.title || 'N/A'}</td>
//                 <td className="py-4 px-4">{contract.quantity || 'N/A'}</td>
//                 <td className="py-4 px-4">₹{(contract.price || 0).toLocaleString()}</td>
//                 <td className="py-4 px-4">
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     contract.status === 'Active' ? 'bg-green-100 text-green-700' :
//                       contract.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
//                         'bg-red-100 text-red-700'
//                     }`}>
//                     {contract.status || 'N/A'}
//                   </span>
//                 </td>
//                 <td className="py-4 px-4">
//                   <button
//                     onClick={() => setSelectedContract(contract)}
//                     className="text-green-600 hover:text-green-800 text-sm font-medium"
//                   >
//                     Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const NegotiationRequests = () => (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Negotiation Requests</h2>
      
//       {negotiationRequests.length === 0 ? (
//         <div className="text-center py-10">
//           <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-700">No negotiation requests</h3>
//           <p className="text-gray-500 mt-2">Farmers will appear here when they send negotiation requests</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {negotiationRequests.map(request => {
//             const farmerName = request.farmer 
//               ? `${request.farmer.fName} ${request.farmer.lName}` 
//               : 'Unknown Farmer';
              
//             const contractTitle = request.contractId?.title || 'Contract';
//             const originalPrice = request.contractId?.price || 0;
            
//             return (
//               <div key={request._id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="bg-green-100 p-2 rounded-full">
//                       <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-gray-800">{farmerName}</h3>
//                       <p className="text-gray-600 text-sm">{contractTitle}</p>
//                     </div>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                     request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                     request.status === 'accepted' ? 'bg-green-100 text-green-800' :
//                     'bg-red-100 text-red-800'
//                   }`}>
//                     {request.status}
//                   </span>
//                 </div>
                
//                 <div className="mt-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-sm text-gray-500">Original Price</p>
//                       <p className="font-medium">₹{originalPrice.toLocaleString()}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Proposed Price</p>
//                       <p className="font-medium">₹{request.proposedPrice?.toLocaleString() || 'N/A'}</p>
//                     </div>
//                   </div>
                  
//                   <p className="mt-3 text-gray-700">{request.message}</p>
                  
//                   <div className="flex justify-between items-center mt-4">
//                     <span className="text-xs text-gray-500">
//                       {new Date(request.createdAt).toLocaleDateString()}
//                     </span>
//                     {request.status === 'pending' && (
//                       <div className="flex gap-2">
//                         <button 
//                           onClick={() => handleNegotiationAction(request._id, 'counter')}
//                           className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200 transition-colors"
//                         >
//                           Counter
//                         </button>
//                         <button 
//                           onClick={() => handleNegotiationAction(request._id, 'decline')}
//                           className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200 transition-colors"
//                         >
//                           Decline
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50 font-inter">
//       {notification && (
//         <div className="fixed top-4 right-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md animate-slide-in z-50">
//           {notification}
//         </div>
//       )}

//       <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               className="lg:hidden p-2 text-white hover:bg-green-700 rounded-full"
//               onClick={() => setIsSidebarOpen(true)}
//             >
//               <Bars3Icon className="w-6 h-6" />
//             </button>
//             <h1 className="text-2xl font-bold text-white">
//               Digital Krishii
//             </h1>
//           </div>
//           <div className="flex items-center gap-4 sm:gap-6">
//             <button
//               onClick={() => setShowNotificationsModal(true)}
//               className="relative p-2 text-white hover:bg-green-700 rounded-full transition-colors"
//               title="Notifications"
//             >
//               <BellIcon className="w-6 h-6" />
//               {negotiationRequests.filter(n => n.status === 'pending').length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                   {negotiationRequests.filter(n => n.status === 'pending').length}
//                 </span>
//               )}
//             </button>
//             <button
//               onClick={() => setShowScanner(true)}
//               className="relative p-2 text-white hover:bg-green-700 rounded-full transition-colors"
//               title="Image Scanner"
//             >
//               <QrCodeIcon className="w-6 h-6" />
//             </button>
//             <button
//               onClick={() => setShowCart(true)}
//               className="relative p-2 text-white hover:bg-green-700 rounded-full transition-colors"
//               title="View Cart"
//             >
//               <ShoppingCartIcon className="w-6 h-6" />
//               {cartItems.length > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                   {cartItems.length}
//                 </span>
//               )}
//             </button>
//             <div
//               className="flex items-center gap-3 bg-green-700 px-4 py-2 rounded-full cursor-pointer hover:bg-green-800 transition-colors"
//               onClick={() => setShowProfileForm(true)}
//               title="Manage Profile"
//             >
//               <img
//                 src={profile.image || `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff`}
//                 className="w-8 h-8 rounded-full object-cover"
//                 alt="Profile"
//                 onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff` }}
//               />
//               <div className="hidden sm:block">
//                 <p className="text-sm text-white font-semibold">{profile.companyName || 'Your Company'}</p>
//                 <p className="text-xs text-green-100">{profile.name || 'Buyer Name'}</p>
//               </div>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-white text-green-700 rounded-md hover:bg-green-100 transition-colors text-sm font-medium"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1">
//         <nav className="hidden lg:block w-64 bg-gradient-to-b from-green-700 to-green-800 text-white p-6 shadow-lg">
//           <div className="flex flex-col items-center gap-4 mb-8 pt-4">
//             <div className="relative">
//               <img
//                 src={profile.image || `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff`}
//                 className="w-24 h-24 rounded-full object-cover border-4 border-green-600 shadow-md"
//                 alt="Profile"
//                 onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff` }}
//               />
//               <button 
//                 onClick={() => setShowProfileForm(true)}
//                 className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full text-green-700 hover:bg-green-100 transition-colors"
//               >
//                 <UserCircleIcon className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="text-center">
//               <h3 className="font-bold text-white text-lg">{profile.name || 'Buyer Name'}</h3>
//               <p className="text-green-100 text-sm">{profile.companyName || 'Your Company'}</p>
//             </div>
//           </div>
          
//           <div className="space-y-4">
//             {[
//               { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
//               { id: 'contracts', label: 'Farmer Contracts', icon: DocumentTextIcon },
//               { id: 'ongoingDeals', label: 'Ongoing Deals', icon: ClipboardDocumentCheckIcon },
//               { id: 'farmers', label: 'Farmers', icon: UsersIcon },
//               { id: 'negotiations', label: 'Negotiation Requests', icon: ChatBubbleLeftRightIcon },
//               { id: 'mandiRates', label: 'Mandi Rates', icon: CurrencyRupeeIcon },
//               { id: 'notifications', label: 'Notifications', icon: BellIcon, action: () => setShowNotificationsModal(true) },
//               { id: 'scanner', label: 'Scanner', icon: QrCodeIcon, action: () => setShowScanner(true) },
//             ].map((item) => (
//               <button
//                 key={item.id}
//                 onClick={item.action ? item.action : () => setActiveTab(item.id)}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                   activeTab === item.id && !item.action 
//                     ? 'bg-green-600 text-white font-semibold' 
//                     : 'text-green-100 hover:bg-green-600'
//                 }`}
//               >
//                 <item.icon className="w-5 h-5" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             ))}
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-green-100 hover:bg-green-600 transition-colors"
//             >
//               <ArrowRightOnRectangleIcon className="w-5 h-5" />
//               <span className="font-medium">Logout</span>
//             </button>
//           </div>
//         </nav>

//         {isSidebarOpen && (
//           <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
//         )}
//         <div className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-green-700 to-green-800 text-white p-6 shadow-lg z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-bold text-white">Navigation</h2>
//             <button onClick={() => setIsSidebarOpen(false)} className="text-green-100 hover:text-white p-1 rounded-full">
//               <XMarkIcon className="w-6 h-6" />
//             </button>
//           </div>
          
//           <div className="flex flex-col items-center gap-4 mb-8 pt-4">
//             <div className="relative">
//               <img
//                 src={profile.image || `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff`}
//                 className="w-24 h-24 rounded-full object-cover border-4 border-green-600 shadow-md"
//                 alt="Profile"
//                 onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff` }}
//               />
//               <button 
//                 onClick={() => { setShowProfileForm(true); setIsSidebarOpen(false); }}
//                 className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full text-green-700 hover:bg-green-100 transition-colors"
//               >
//                 <UserCircleIcon className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="text-center">
//               <h3 className="font-bold text-white text-lg">{profile.name || 'Buyer Name'}</h3>
//               <p className="text-green-100 text-sm">{profile.companyName || 'Your Company'}</p>
//             </div>
//           </div>
          
//           <div className="space-y-4">
//             {[
//               { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
//               { id: 'contracts', label: 'Farmer Contracts', icon: DocumentTextIcon },
//               { id: 'ongoingDeals', label: 'Ongoing Deals', icon: ClipboardDocumentCheckIcon },
//               { id: 'farmers', label: 'Farmers', icon: UsersIcon },
//               { id: 'negotiations', label: 'Negotiation Requests', icon: ChatBubbleLeftRightIcon },
//               { id: 'mandiRates', label: 'Mandi Rates', icon: CurrencyRupeeIcon },
//               { id: 'notifications', label: 'Notifications', icon: BellIcon, action: () => { setShowNotificationsModal(true); setIsSidebarOpen(false); } },
//               { id: 'scanner', label: 'Scanner', icon: QrCodeIcon, action: () => { setShowScanner(true); setIsSidebarOpen(false); } },
//             ].map((item) => (
//               <button
//                 key={item.id}
//                 onClick={item.action ? item.action : () => { setActiveTab(item.id); setIsSidebarOpen(false); }}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                   activeTab === item.id && !item.action 
//                     ? 'bg-green-600 text-white font-semibold' 
//                     : 'text-green-100 hover:bg-green-600'
//                 }`}
//               >
//                 <item.icon className="w-5 h-5" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             ))}
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-green-100 hover:bg-green-600 transition-colors"
//             >
//               <ArrowRightOnRectangleIcon className="w-5 h-5" />
//               <span className="font-medium">Logout</span>
//             </button>
//           </div>
//         </div>

//         <main className="flex-1 p-4 sm:p-8">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-[calc(100vh-200px)]">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
//                 <p className="text-gray-600 text-lg">Loading dashboard...</p>
//               </div>
//             </div>
//           ) : (
//             <>
//               {activeTab === 'dashboard' && (
//                 <div className="space-y-8">
//                   <DashboardStats />
//                   <RecentContractsTable />
//                 </div>
//               )}

//               {activeTab === 'contracts' && (
//                 <div className="space-y-6">
//                   <div className="flex flex-wrap border-b border-gray-200 gap-1">
//                     <button
//                       className={`px-4 py-2 font-medium text-sm ${
//                         activeSubTab === 'contracts' 
//                           ? 'text-green-600 border-b-2 border-green-600' 
//                           : 'text-gray-500 hover:text-gray-700'
//                       }`}
//                       onClick={() => setActiveSubTab('contracts')}
//                     >
//                       Farming Contracts
//                     </button>
//                     <button
//                       className={`px-4 py-2 font-medium text-sm ${
//                         activeSubTab === 'equipment' 
//                           ? 'text-green-600 border-b-2 border-green-600' 
//                           : 'text-gray-500 hover:text-gray-700'
//                       }`}
//                       onClick={() => setActiveSubTab('equipment')}
//                     >
//                       Farming Equipment
//                     </button>
//                     <button
//                       className={`px-4 py-2 font-medium text-sm ${
//                         activeSubTab === 'contractFarmingLands' 
//                           ? 'text-green-600 border-b-2 border-green-600' 
//                           : 'text-gray-500 hover:text-gray-700'
//                       }`}
//                       onClick={() => setActiveSubTab('contractFarmingLands')}
//                     >
//                       Lands For Contract Farming
//                     </button>
//                     <button
//                       className={`px-4 py-2 font-medium text-sm ${
//                         activeSubTab === 'rentalLands' 
//                           ? 'text-green-600 border-b-2 border-green-600' 
//                           : 'text-gray-500 hover:text-gray-700'
//                       }`}
//                       onClick={() => setActiveSubTab('rentalLands')}
//                     >
//                       Lands For Rent
//                     </button>
//                   </div>

//                   {activeSubTab === 'contracts' && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {contracts.length > 0 ? contracts.map(contract => (
//                         <div key={contract._id} className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-200">
//                           <img
//                             src={contract.image || 'https://placehold.co/400x200/E0F2F7/000000?text=Product'}
//                             className="w-full h-48 object-cover rounded-md mb-4"
//                             alt="Contract"
//                             onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x200/E0F2F7/000000?text=Product' }}
//                           />
//                           <h3 className="text-lg font-bold text-gray-800">{contract.title || 'N/A'}</h3>
//                           <div className="mt-4 space-y-2 text-sm text-gray-600">
//                             <p><strong>Farmer:</strong> {getFarmerName(contract.farmer)}</p>
//                             <p><strong>Quantity:</strong> {contract.quantity || 'N/A'}</p>
//                             <p><strong>Price:</strong> ₹{(contract.price || 0).toLocaleString()}</p>
//                             <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                               contract.status === 'Active' ? 'bg-green-100 text-green-700' :
//                                 contract.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
//                                   'bg-red-100 text-red-700'
//                               }`}>{contract.status || 'N/A'}</span></p>
//                           </div>
//                           <div className="mt-4 flex flex-col sm:flex-row gap-2">
//                             <button
//                               onClick={() => handleCartAction(contract)}
//                               className={`flex-1 px-4 py-2 rounded-md transition-colors text-sm font-medium
//                                 ${cartItems.some(i => i._id === contract._id) ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-600 text-white hover:bg-green-700'}`}
//                             >
//                               {cartItems.some(i => i._id === contract._id) ? 'Remove from Cart' : 'Add to Cart'}
//                             </button>
//                             <button
//                               onClick={() => setSelectedContract(contract)}
//                               className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
//                             >
//                               Details
//                             </button>
//                           </div>
//                         </div>
//                       )) : (
//                         <div className="col-span-full text-center py-12">
//                           <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                           <h3 className="text-xl font-medium text-gray-700">No contracts available</h3>
//                           <p className="text-gray-500 mt-2">Check back later for farmer contracts</p>
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {activeSubTab === 'equipment' && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {equipment.length > 0 ? equipment.map(item => (
//                       <div key={item._id} className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-200">
//                         <img
//                           src={item.image || 'https://placehold.co/400x200/E0F2F7/000000?text=Equipment'}
//                           className="w-full h-48 object-cover rounded-md mb-4"
//                           alt="Equipment"
//                         />
//                         <h3 className="text-lg font-bold text-gray-800">{item.title || 'N/A'}</h3>
//                         <div className="mt-4 space-y-2 text-sm text-gray-600">
//                           <p><strong>Owner:</strong> {item.user ? `${item.user.fName} ${item.user.lName}` : 'N/A'}</p>
//                           <p><strong>Price/Day:</strong> ₹{(item.dailyRate || 0).toLocaleString()}</p>
//                           <p><strong>Type:</strong> {item.type || 'N/A'}</p>
//                           <p><strong>Location:</strong> {item.location?.address || 'N/A'}</p>
//                         </div>
//                         <div className="mt-4 flex flex-col sm:flex-row gap-2">
//                           <button
//                             onClick={() => handleCartAction(item)}
//                             className={`flex-1 px-4 py-2 rounded-md transition-colors text-sm font-medium ${
//                               cartItems.some(i => i._id === item._id) 
//                                 ? 'bg-red-100 text-red-700 hover:bg-red-200' 
//                                 : 'bg-blue-600 text-white hover:bg-blue-700'
//                             }`}
//                           >
//                             {cartItems.some(i => i._id === item._id) ? 'Remove from Cart' : 'Add to Cart'}
//                           </button>
//                           <button
//                             onClick={() => setSelectedEquipment(item)}
//                             className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
//                           >
//                             Details
//                           </button>
//                         </div>
//                       </div>
//                       )) : (
//                         <div className="col-span-full text-center py-12">
//                           <WrenchScrewdriverIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                           <h3 className="text-xl font-medium text-gray-700">No equipment available</h3>
//                           <p className="text-gray-500 mt-2">Check back later for farming equipment</p>
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {activeSubTab === 'contractFarmingLands' && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {contractFarmingLands.length > 0 ? contractFarmingLands.map(land => (
//                         <div key={land._id} className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-200">
//                           <img
//                             src={land.image}
//                             className="w-full h-48 object-cover rounded-md mb-4"
//                             alt="Land"
//                           />
//                           <h3 className="text-lg font-bold text-gray-800">{land.title}</h3>
//                           <div className="mt-4 space-y-2 text-sm text-gray-600">
//                             <p><strong>Location:</strong> {land.location}</p>
//                             <p><strong>Size:</strong> {land.size}</p>
//                             <p><strong>Soil Type:</strong> {land.soilType}</p>
//                             <p><strong>Price/Acre:</strong> ₹{land.pricePerAcre?.toLocaleString()}</p>
//                             <p><strong>Lease Duration:</strong> {land.leaseDuration}</p>
//                           </div>
//                           <div className="mt-4 flex flex-col sm:flex-row gap-2">
//                             <button
//                               onClick={() => setSelectedLand(land)}
//                               className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
//                             >
//                               View Details
//                             </button>
//                             <button
//                               onClick={() => handleCartAction(land)}
//                               className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
//                                 cartItems.some(i => i._id === land._id) 
//                                   ? 'bg-red-100 text-red-700 hover:bg-red-200' 
//                                   : 'bg-blue-600 text-white hover:bg-blue-700'
//                               }`}
//                             >
//                               {cartItems.some(i => i._id === land._id) ? 'Remove' : 'Add to Cart'}
//                             </button>
//                           </div>
//                         </div>
//                       )) : (
//                         <div className="col-span-full text-center py-12">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <h3 className="text-xl font-medium text-gray-700">No contract farming lands available</h3>
//                           <p className="text-gray-500 mt-2">Check back later for available lands</p>
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {activeSubTab === 'rentalLands' && (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {rentalLands.length > 0 ? rentalLands.map(land => (
//                         <div key={land._id} className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-200">
//                           <img
//                             src={land.image}
//                             className="w-full h-48 object-cover rounded-md mb-4"
//                             alt="Land"
//                           />
//                           <h3 className="text-lg font-bold text-gray-800">{land.title}</h3>
//                           <div className="mt-4 space-y-2 text-sm text-gray-600">
//                             <p><strong>Location:</strong> {land.location}</p>
//                             <p><strong>Size:</strong> {land.size}</p>
//                             <p><strong>Soil Type:</strong> {land.soilType}</p>
//                             <p><strong>Rental Price:</strong> ₹{land.rentalPrice?.toLocaleString()}/month</p>
//                             <p><strong>Min Lease:</strong> {land.minLease}</p>
//                           </div>
//                           <div className="mt-4 flex flex-col sm:flex-row gap-2">
//                             <button
//                               onClick={() => setSelectedLand(land)}
//                               className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
//                             >
//                               View Details
//                             </button>
//                             <button
//                               onClick={() => handleCartAction(land)}
//                               className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
//                                 cartItems.some(i => i._id === land._id) 
//                                   ? 'bg-red-100 text-red-700 hover:bg-red-200' 
//                                   : 'bg-blue-600 text-white hover:bg-blue-700'
//                               }`}
//                             >
//                               {cartItems.some(i => i._id === land._id) ? 'Remove' : 'Add to Cart'}
//                             </button>
//                           </div>
//                         </div>
//                       )) : (
//                         <div className="col-span-full text-center py-12">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           <h3 className="text-xl font-medium text-gray-700">No rental lands available</h3>
//                           <p className="text-gray-500 mt-2">Check back later for available lands</p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {activeTab === 'ongoingDeals' && (
//                 <div className="bg-white rounded-lg shadow-md p-6">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Ongoing Deals</h2>
                  
//                   {negotiationRequests.filter(n => n.status === 'accepted').length === 0 ? (
//                     <div className="text-center py-10">
//                       <ClipboardDocumentCheckIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                       <h3 className="text-lg font-medium text-gray-700">No ongoing deals</h3>
//                       <p className="text-gray-500 mt-2">Accepted negotiations will appear here</p>
//                       <button
//                         onClick={() => setActiveTab('contracts')}
//                         className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//                       >
//                         Browse Contracts
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       {negotiationRequests
//                         .filter(n => n.status === 'accepted')
//                         .map(deal => (
//                           <OngoingDealsCard key={deal._id} deal={deal} />
//                         ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {selectedDeal && (
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//                   <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-2xl relative shadow-lg animate-scale-in">
//                     <button
//                       onClick={() => setSelectedDeal(null)}
//                       className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
//                     >
//                       <XMarkIcon className="w-6 h-6" />
//                     </button>
                    
//                     <div className="mb-6">
//                       <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                         {selectedDeal.contractId?.title || 'Deal Details'}
//                       </h2>
//                       <div className="flex items-center gap-2 text-gray-600">
//                         <UsersIcon className="w-4 h-4" />
//                         <span>With {getFarmerName(selectedDeal.farmer)}</span>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-4">Deal Information</h3>
//                         <div className="space-y-4">
//                           <div>
//                             <p className="text-sm text-gray-500">Finalized Price</p>
//                             <p className="text-lg font-semibold">
//                               ₹{selectedDeal.proposedPrice?.toLocaleString() || 'N/A'}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-500">Original Price</p>
//                             <p className="text-gray-700">
//                               ₹{(selectedDeal.contractId?.price || 0).toLocaleString()}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-500">Quantity</p>
//                             <p className="text-gray-700">
//                               {selectedDeal.contractId?.quantity || 'N/A'}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-500">Quality</p>
//                             <p className="text-gray-700">
//                               {selectedDeal.contractId?.quality || 'Standard'}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-500">Location</p>
//                             <p className="text-gray-700">
//                               {selectedDeal.contractId?.location || 'N/A'}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-sm text-gray-500">Agreement Date</p>
//                             <p className="text-gray-700">
//                               {new Date(selectedDeal.updatedAt).toLocaleDateString()}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-4">Negotiation Details</h3>
//                         <div className="bg-blue-50 rounded-lg p-4 mb-4">
//                           <p className="text-sm text-gray-500 mb-1">Your Message</p>
//                           <p className="text-gray-700">{selectedDeal.message || 'No message provided'}</p>
//                         </div>
                        
//                         <div className="bg-green-50 rounded-lg p-4">
//                           <p className="text-sm text-gray-500 mb-1">Farmer's Response</p>
//                           <p className="text-gray-700">Accepted the proposed price</p>
//                         </div>
                        
//                         <div className="mt-6">
//                           <h3 className="text-lg font-semibold text-gray-800 mb-3">Next Steps</h3>
//                           <div className="flex flex-wrap gap-2">
//                             <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
//                               Confirm Payment
//                             </button>
//                             <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
//                               Track Shipment
//                             </button>
//                             <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
//                               Download Agreement
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'farmers' && (
//                 <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <div className="p-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
//                     <h2 className="text-2xl font-bold mb-1">Registered Farmers</h2>
//                     <p className="text-green-100 mb-6">Connect with farmers across India</p>
//                   </div>
                  
//                   <div className="p-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                       {farmers.length > 0 ? farmers.map(farmer => (
//                         <div key={farmer._id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group">
//                           <div className="flex items-center gap-4 mb-4">
//                             <div className="relative">
//                               <img 
//                                 src={farmer.image}
//                                 className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
//                                 alt="Farmer"
//                                 onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${farmer.name}&background=random`}
//                               />
//                             </div>
//                             <div>
//                               <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
//                                 {farmer.name}
//                               </h3>
//                               <p className="text-gray-600 text-sm">{farmer.location}</p>
//                             </div>
//                           </div>
                          
//                           <div className="space-y-3 text-sm text-gray-600">
//                             <div className="flex items-center gap-2">
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                               </svg>
//                               <span>{farmer.phone}</span>
//                             </div>
//                             <div className="flex items-center gap-2">
//                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                               </svg>
//                               <span>{farmer.location}</span>
//                             </div>
//                           </div>
                          
//                           <div className="mt-6 flex gap-3">
//                             <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
//                               Contact
//                             </button>
//                             <button 
//                               onClick={() => setActiveTab('contracts')}
//                               className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
//                             >
//                               View Contracts
//                             </button>
//                           </div>
//                         </div>
//                       )) : (
//                         <div className="col-span-full text-center py-12">
//                           <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                           <h3 className="text-xl font-medium text-gray-700">No farmers found</h3>
//                           <p className="text-gray-500 mt-2">Farmers will appear when they register</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'negotiations' && (
//                 <NegotiationRequests />
//               )}

//               {activeTab === 'mandiRates' && (
//                 <MandiRatesSection />
//               )}
//             </>
//           )}
//         </main>
//       </div>

//       {showProfileForm && (
//         <ProfileForm 
//           profile={profile} 
//           onUpdate={updateProfile}
//           onClose={() => setShowProfileForm(false)}
//           notification={notification}
//           setNotification={setNotification}
//         />
//       )}

//       {showCart && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-2xl relative shadow-lg animate-scale-in">
//             <button
//               onClick={() => setShowCart(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
//             >
//               <XMarkIcon className="w-6 h-6" />
//             </button>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

//             {cartItems.length === 0 ? (
//               <div className="text-center py-8">
//                 <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-600">Your cart is empty</p>
//                 <button
//                   onClick={() => { setActiveTab('contracts'); setShowCart(false); }}
//                   className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
//                 >
//                   Browse Contracts
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {cartItems.map(item => (
//                   <div key={item._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between gap-4">
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={item.image || 'https://placehold.co/60x60/E0F2F7/000000?text=Item'}
//                         className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
//                         alt={item.title || 'Item'}
//                         onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/60x60/E0F2F7/000000?text=Item' }}
//                       />
//                       <div>
//                         <h3 className="text-gray-800 font-medium">{item.title || item.name || 'N/A'}</h3>
//                         <p className="text-gray-600 text-sm">
//                           {item.price ? `₹${item.price.toLocaleString()}` : `₹${item.pricePerDay?.toLocaleString()}/day`}
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => handleCartAction(item)}
//                       className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium flex-shrink-0"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//                 <div className="pt-4 border-t border-gray-200">
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-gray-600">Subtotal:</span>
//                     <span className="font-medium text-gray-800">
//                       ₹{cartItems.reduce((sum, item) => sum + (item.price || item.pricePerDay || 0), 0).toLocaleString()}
//                     </span>
//                   </div>
//                   <button className="w-full px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium">
//                     Proceed to Checkout
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {selectedContract && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-2xl relative shadow-lg animate-scale-in">
//             <button
//               onClick={() => setSelectedContract(null)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
//             >
//               <XMarkIcon className="w-6 h-6" />
//             </button>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <img
//                 src={selectedContract.image || 'https://placehold.co/400x300/E0F2F7/000000?text=Product+Details'}
//                 className="w-full h-64 object-cover rounded-lg"
//                 alt="Contract"
//                 onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/E0F2F7/000000?text=Product+Details' }}
//               />
//               <div className="space-y-4 text-gray-700">
//                 <h2 className="text-2xl font-bold text-gray-800">{selectedContract.title || 'N/A'}</h2>
//                 <p className="text-gray-600">{selectedContract.description || 'No description available.'}</p>
//                 <div className="space-y-2 text-sm">
//                   <p><strong>Farmer:</strong> {getFarmerName(selectedContract.farmer)}</p>
//                   <p><strong>Location:</strong> {selectedContract.location || 'N/A'}</p>
//                   <p><strong>Price:</strong> ₹{(selectedContract.price || 0).toLocaleString()}</p>
//                   <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     selectedContract.status === 'Active' ? 'bg-green-100 text-green-700' :
//                       selectedContract.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
//                         'bg-red-100 text-red-700'
//                     }`}>{selectedContract.status || 'N/A'}</span></p>
//                   <p><strong>Quantity:</strong> {selectedContract.quantity || 'N/A'}</p>
//                   <p><strong>Quality:</strong> {selectedContract.quality || 'Standard'}</p>
                 
//                 </div>
//                  <div className="mt-4">
//         <h3 className="text-gray-800 font-medium mb-2">Send Negotiation</h3>
//         <div className="mb-3">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Proposed Price (₹)
//           </label>
//           <input
//             type="number"
//             value={proposedPrice}
//             onChange={(e) => setProposedPrice(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-green-400"
//             placeholder="Enter your proposed price"
//           />
//         </div>
//         <textarea
//           value={negotiationMessage}
//           onChange={(e) => setNegotiationMessage(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-green-400"
//           placeholder="Type your negotiation message..."
//           rows="3"
//         />
//                   <div className="flex gap-3 mt-4">
//                     <button
//                       onClick={viewAllDetails}
//                       className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
//                     >
//                       <InformationCircleIcon className="w-5 h-5" />
//                       All Details
//                     </button>
//                     <button
//                       onClick={sendNegotiation}
//                       className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
//                     >
//                       Send Message
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//      {selectedEquipment && (
//   <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-4xl relative shadow-lg animate-scale-in max-h-[90vh] overflow-y-auto">
//       <button
//         onClick={() => setSelectedEquipment(null)}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
//       >
//         <XMarkIcon className="w-6 h-6" />
//       </button>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Image Gallery */}
//         <div>
//           <div className="mb-4">
//             <img
//               src={selectedEquipment.image || 'https://placehold.co/600x400/E0F2F7/000000?text=Equipment'}
//               className="w-full h-64 object-cover rounded-lg"
//               alt="Equipment"
//             />
//           </div>
          
//           {selectedEquipment.photos && selectedEquipment.photos.length > 0 && (
//             <div className="grid grid-cols-3 gap-2">
//               {selectedEquipment.photos.map((photo, idx) => (
//                 <img 
//                   key={idx}
//                   src={photo}
//                   className="w-full h-24 object-cover rounded-md border"
//                   alt={`Equipment photo ${idx+1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
        
//         {/* Equipment Details */}
//         <div className="space-y-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedEquipment.title || 'Equipment'}</h2>
//             <p className="text-gray-600">{selectedEquipment.description || 'No description available'}</p>
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Daily Rate</p>
//               <p className="text-xl font-bold">₹{selectedEquipment.dailyRate?.toLocaleString() || 'N/A'}</p>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Security Deposit</p>
//               <p className="text-xl font-bold">₹{selectedEquipment.securityDeposit?.toLocaleString() || 'N/A'}</p>
//             </div>
//           </div>
          
//           {/* Detailed Information Sections */}
//           <div className="space-y-6">
//             {/* Basic Info */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <InformationCircleIcon className="w-5 h-5 text-blue-500" />
//                 Basic Information
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Category</p>
//                   <p className="font-medium">{selectedEquipment.category || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Type</p>
//                   <p className="font-medium">{selectedEquipment.type || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Model</p>
//                   <p className="font-medium">{selectedEquipment.model || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Year Bought</p>
//                   <p className="font-medium">{selectedEquipment.yearBought || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Work Type</p>
//                   <p className="font-medium">{selectedEquipment.workType || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Fuel Type</p>
//                   <p className="font-medium">{selectedEquipment.fuelType || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Condition</p>
//                   <p className="font-medium">{selectedEquipment.condition || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Status</p>
//                   <p className="font-medium">{selectedEquipment.status || 'N/A'}</p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Rental Details */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-500" />
//                 Rental Details
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Rental Period</p>
//                   <p className="font-medium">{selectedEquipment.rentPeriod || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Advance Booking</p>
//                   <p className="font-medium">
//                     {selectedEquipment.advanceBooking} {selectedEquipment.bookingUnit || 'days'}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Fuel Policy</p>
//                   <p className="font-medium">{selectedEquipment.fuelPolicy || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Handover Method</p>
//                   <p className="font-medium">{selectedEquipment.handoverMethod || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Late Return Penalty</p>
//                   <p className="font-medium">
//                     ₹{selectedEquipment.lateReturnPenalty?.toLocaleString() || 'N/A'} 
//                     {selectedEquipment.penaltyUnit ? ` per ${selectedEquipment.penaltyUnit}` : ''}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Cleaning Requirements</p>
//                   <p className="font-medium">{selectedEquipment.cleaningRequirements || 'None'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Discount</p>
//                   <p className="font-medium">
//                     {selectedEquipment.discount} 
//                     {selectedEquipment.discountType === 'percentage' ? '%' : '₹'}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Usage Restriction</p>
//                   <p className="font-medium">{selectedEquipment.usageRestriction || 'None'}</p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Location & Availability */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                 </svg>
//                 Location & Availability
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Pickup Location</p>
//                   <p className="font-medium">{selectedEquipment.location?.address || 'N/A'}</p>
//                 </div>
                
//                 {!selectedEquipment.returnLocationSame && selectedEquipment.returnLocation && (
//                   <div>
//                     <p className="text-sm text-gray-500">Return Location</p>
//                     <p className="font-medium">{selectedEquipment.returnLocation.address || 'N/A'}</p>
//                   </div>
//                 )}
                
//                 {selectedEquipment.availability && selectedEquipment.availability.length > 0 && (
//                   <div>
//                     <p className="text-sm text-gray-500 mb-2">Available Dates</p>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedEquipment.availability.map((date, idx) => (
//                         <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
//                           {new Date(date).toLocaleDateString()}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             {/* Accessories */}
//             {selectedEquipment.accessories && selectedEquipment.accessories.length > 0 && (
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   <WrenchScrewdriverIcon className="w-5 h-5 text-yellow-500" />
//                   Included Accessories
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedEquipment.accessories.map((item, idx) => (
//                     <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                       {item}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {/* Damage Protocol */}
//             {selectedEquipment.damageProtocol && (
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                   </svg>
//                   Damage Protocol
//                 </h3>
//                 <div className="bg-red-50 p-4 rounded-lg">
//                   {Object.entries(selectedEquipment.damageProtocol).map(([key, value]) => (
//                     <div key={key} className="mb-2">
//                       <p className="text-sm font-medium text-red-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
//                       <p className="text-red-700">{value}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
            
//             {/* Contact Information */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <UserCircleIcon className="w-5 h-5 text-purple-500" />
//                 Contact Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-gray-500">Owner</p>
//                   <p className="font-medium">
//                     {selectedEquipment.user?.fName} {selectedEquipment.user?.lName}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Primary Contact</p>
//                   <p className="font-medium">{selectedEquipment.primaryContact || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Emergency Contact</p>
//                   <p className="font-medium">{selectedEquipment.emergencyContact || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Email</p>
//                   <p className="font-medium">{selectedEquipment.user?.email || 'N/A'}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="mt-6 flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={() => {
//                 handleCartAction(selectedEquipment);
//                 setSelectedEquipment(null);
//               }}
//               className={`flex-1 px-4 py-3 rounded-md transition-colors font-medium ${
//                 cartItems.some(i => i.id === selectedEquipment.id) 
//                   ? 'bg-red-100 text-red-700 hover:bg-red-200' 
//                   : 'bg-blue-600 text-white hover:bg-blue-700'
//               }`}
//             >
//               {cartItems.some(i => i.id === selectedEquipment.id) 
//                 ? 'Remove from Cart' 
//                 : 'Add to Cart'}
//             </button>
//             <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium">
//               Contact Owner
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

//       {selectedLand && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-2xl relative shadow-lg animate-scale-in">
//             <button
//               onClick={() => setSelectedLand(null)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
//             >
//               <XMarkIcon className="w-6 h-6" />
//             </button>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <img
//                 src={selectedLand.image}
//                 className="w-full h-64 object-cover rounded-lg"
//                 alt="Land"
//               />
//               <div className="space-y-4">
//                 <h2 className="text-2xl font-bold text-gray-800">{selectedLand.title}</h2>
//                 <p className="text-gray-600">{selectedLand.description}</p>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Location</p>
//                     <p className="font-medium">{selectedLand.location}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Size</p>
//                     <p className="font-medium">{selectedLand.size}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Soil Type</p>
//                     <p className="font-medium">{selectedLand.soilType}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Water Source</p>
//                     <p className="font-medium">{selectedLand.waterSource}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">
//                       {activeSubTab === 'contractFarmingLands' ? 'Price/Acre' : 'Rental Price'}
//                     </p>
//                     <p className="font-medium">
//                       ₹{activeSubTab === 'contractFarmingLands' 
//                         ? selectedLand.pricePerAcre?.toLocaleString() 
//                         : selectedLand.rentalPrice?.toLocaleString()}
//                       {activeSubTab === 'rentalLands' && '/month'}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">
//                       {activeSubTab === 'contractFarmingLands' ? 'Lease Duration' : 'Min Lease'}
//                     </p>
//                     <p className="font-medium">
//                       {activeSubTab === 'contractFarmingLands' 
//                         ? selectedLand.leaseDuration 
//                         : selectedLand.minLease}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="mt-6 flex gap-3">
//                   <button
//                     onClick={() => {
//                       handleCartAction(selectedLand);
//                       setSelectedLand(null);
//                     }}
//                     className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
//                       cartItems.some(i => i._id === selectedLand._id) 
//                         ? 'bg-red-100 text-red-700 hover:bg-red-200' 
//                         : 'bg-green-600 text-white hover:bg-green-700'
//                     }`}
//                   >
//                     {cartItems.some(i => i._id === selectedLand._id) 
//                       ? 'Remove from Cart' 
//                       : 'Add to Cart'}
//                   </button>
//                   <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-medium">
//                     Contact Owner
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showScanner && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md relative shadow-lg animate-scale-in">
//             <button
//               onClick={() => setShowScanner(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
//             >
//               <XMarkIcon className="w-6 h-6" />
//             </button>
//             <ImageScanner />
//           </div>
//         </div>
//       )}

//       {showNotificationsModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md relative shadow-lg animate-scale-in">
//             <button
//               onClick={() => setShowNotificationsModal(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
//             >
//               <XMarkIcon className="w-6 h-6" />
//             </button>
//             <Notifications />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyerDashboard;









































































































import React, { useState, useEffect } from 'react';
import ProfileForm from './ProfileForm';
import {
  HomeIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  UserCircleIcon,
  XMarkIcon,
  Bars3Icon,
  BellIcon,
  QrCodeIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  CurrencyRupeeIcon,
  WrenchScrewdriverIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const link = import.meta.env.VITE_BACKEND;

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [contracts, setContracts] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profile, setProfile] = useState({});
  const [negotiationMessage, setNegotiationMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [proposedPrice, setProposedPrice] = useState('');
  const [negotiations, setNegotiations] = useState([]);
  const [negotiationRequests, setNegotiationRequests] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [mandiRates, setMandiRates] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('contracts');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [contractFarmingLands, setContractFarmingLands] = useState([]);
  const [rentalLands, setRentalLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [bookingStep, setBookingStep] = useState(0);
  const [distance, setDistance] = useState(null);
  const [showMap, setShowMap] = useState(false);
    const [receiptData, setReceiptData] = useState(null);

  const viewDealDetails = (deal) => {
    setSelectedDeal(deal);
  };

  const getFarmerName = (farmer) => {
    if (!farmer) return 'Unknown';
    return `${farmer.fName || ''} ${farmer.lName || ''}`.trim() || 'Unknown Farmer';
  };

  useEffect(() => {
    if (selectedEquipment && profile.location && selectedEquipment.location) {
      const calculatedDistance = Math.floor(Math.random() * 100) + 10;
      setDistance(calculatedDistance);
    }
  }, [selectedEquipment, profile]);

  const handleBookEquipment = () => {
    if (bookingStep === 1) {
      setBookingStep(2);
    } else if (bookingStep === 2) {
      setTimeout(() => {
        setBookingStep(3);
        // Generate receipt when booking is confirmed
        generateReceipt(selectedEquipment);
      }, 1500);
    }
  };

  const renderEquipmentBooking = () => {
    switch (bookingStep) {
      case 1:
        return (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <button 
              onClick={() => setBookingStep(0)}
              className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              ← Back to Details
            </button>
            
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800 mb-1">Location Information</h3>
                  <p className="text-yellow-700 text-sm">
                    This equipment is located approximately {distance} km from your profile address.
                    You'll need to travel to pick it up after booking.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Are you willing to travel this distance?
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedEquipment(null);
                    setBookingStep(0);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  No, Cancel
                </button>
                <button
                  onClick={handleBookEquipment}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Yes, Continue
                </button>
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <button 
              onClick={() => setBookingStep(1)}
              className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              ← Back
            </button>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Payment Information
            </h3>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span>Daily Rate:</span>
                <span className="font-medium">₹{selectedEquipment.dailyRate?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Security Deposit:</span>
                <span className="font-medium">₹{selectedEquipment.securityDeposit?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span>₹{(selectedEquipment.dailyRate + selectedEquipment.securityDeposit).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-3 bg-white cursor-pointer hover:border-green-500 transition-colors">
                <div className="font-medium mb-1">Credit Card</div>
                <div className="text-xs text-gray-500">Pay with Visa, Mastercard, etc.</div>
              </div>
              <div className="border rounded-lg p-3 bg-white cursor-pointer hover:border-green-500 transition-colors">
                <div className="font-medium mb-1">UPI</div>
                <div className="text-xs text-gray-500">Pay with PhonePe, GPay, etc.</div>
              </div>
            </div>
            
            <button
              onClick={handleBookEquipment}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 5.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 10l1.293-1.293zm4 0a1 1 0 010 1.414L11.586 10l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Confirm Payment
            </button>
          </div>
        );
      
      case 3:
        return (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-medium text-green-800 mb-1">Booking Confirmed!</h3>
                  <p className="text-green-700 text-sm">
                    Payment successful. Equipment booking for {selectedEquipment.title} is confirmed.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MapPinIcon className="w-5 h-5 text-blue-500" />
                Pickup Location
              </h3>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="font-medium mb-1">{selectedEquipment.location.address}</p>
                <p className="text-gray-600 text-sm">
                  {selectedEquipment.location.city}, {selectedEquipment.location.state} - {selectedEquipment.location.pincode}
                </p>
              </div>
              
              <button
                onClick={() => setShowMap(true)}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293a1 1 0 00-1.414 0l-1 1a1 1 0 000 1.414l1.586 1.586a1 1 0 001.414 0l1-1a1 1 0 000-1.414L3.707 3.293zm14-.002a1 1 0 00-1.414 0l-1.586 1.586a1 1 0 000 1.414l1 1a1 1 0 001.414 0l1.586-1.586a1 1 0 000-1.414l-1-1z" clipRule="evenodd" />
                </svg>
                View on Map
              </button>
            </div>
              {showMap && (
  <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg w-full max-w-4xl h-5/6 flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">Pickup Location on Map</h3>
        <button 
          onClick={() => setShowMap(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            // Append ", India" to the address
            `${selectedEquipment.location.address}, ${selectedEquipment.location.city}, ${selectedEquipment.location.state} ${selectedEquipment.location.pincode}, India`
          )}&output=embed`}
        ></iframe>
      </div>
      <div className="p-4 border-t text-sm text-gray-600">
        <p><strong>Address:</strong> {selectedEquipment.location.address}, {selectedEquipment.location.city}, {selectedEquipment.location.state} - {selectedEquipment.location.pincode}</p>
      </div>
    </div>
  </div>
)}
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedEquipment(null);
                  setBookingStep(0);
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
                  <button 
      onClick={handleDownloadReceipt}
      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Download Receipt
    </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
    const generateReceipt = (equipment) => {
    const receipt = {
      id: `REC-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      equipment: equipment.title,
      owner: equipment.user ? `${equipment.user.fName} ${equipment.user.lName}` : 'Unknown',
      dailyRate: equipment.dailyRate,
      securityDeposit: equipment.securityDeposit,
      total: equipment.dailyRate + equipment.securityDeposit,
      paymentMethod: 'Credit Card', // You can make this dynamic
      location: `${equipment.location?.address}, ${equipment.location?.city}, ${equipment.location?.state} - ${equipment.location?.pincode}`,
      distance: distance
    };
    setReceiptData(receipt);
    return receipt;
  };

  // Function to handle receipt download
  const handleDownloadReceipt = () => {
    if (!selectedEquipment || !receiptData) return;
    
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
      <html>
        <head>
          <title>Equipment Rental Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f8f9fa; }
            .receipt-container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .header h1 { color: #2e7d32; margin: 0; }
            .details { margin: 20px 0; }
            .detail-row { display: flex; margin-bottom: 10px; }
            .label { font-weight: bold; width: 200px; }
            .value { flex: 1; }
            .total-row { border-top: 2px solid #2e7d32; padding-top: 10px; margin-top: 20px; font-weight: bold; font-size: 1.2em; }
            .footer { margin-top: 30px; text-align: center; color: #6c757d; font-size: 0.9em; }
            .logo { font-size: 24px; font-weight: bold; color: #2e7d32; margin-bottom: 10px; }
            @media print {
              body { background: white; }
              .print-btn { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            <div class="header">
              <div class="logo">Digital Krishii</div>
              <h1>Equipment Rental Receipt</h1>
              <p>${receiptData.date} | ${receiptData.time}</p>
            </div>
            
            <div class="details">
              <div class="detail-row">
                <div class="label">Receipt ID:</div>
                <div class="value">${receiptData.id}</div>
              </div>
              <div class="detail-row">
                <div class="label">Equipment:</div>
                <div class="value">${receiptData.equipment}</div>
              </div>
              <div class="detail-row">
                <div class="label">Owner:</div>
                <div class="value">${receiptData.owner}</div>
              </div>
              <div class="detail-row">
                <div class="label">Pickup Location:</div>
                <div class="value">${receiptData.location}</div>
              </div>
              <div class="detail-row">
                <div class="label">Distance:</div>
                <div class="value">${receiptData.distance} km</div>
              </div>
              <div class="detail-row">
                <div class="label">Payment Method:</div>
                <div class="value">${receiptData.paymentMethod}</div>
              </div>
              <div class="detail-row">
                <div class="label">Daily Rate:</div>
                <div class="value">₹${receiptData.dailyRate.toLocaleString()}</div>
              </div>
              <div class="detail-row">
                <div class="label">Security Deposit:</div>
                <div class="value">₹${receiptData.securityDeposit.toLocaleString()}</div>
              </div>
              <div class="detail-row total-row">
                <div class="label">Total Amount:</div>
                <div class="value">₹${receiptData.total.toLocaleString()}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>Thank you for using Digital Krishii!</p>
              <p>Contact: digitalkrishii.tech | Phone: +91 7757854124</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <button class="print-btn" onclick="window.print()" style="padding: 10px 20px; background: #2e7d32; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Print Receipt
              </button>
            </div>
          </div>
        </body>
      </html>
    `);
    receiptWindow.document.close();
  };

  const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('buyerToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      const fullUrl = `${link}${url}`;
      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('buyerToken');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      return response.json();
    } catch (error) {
      setNotification(error.message);
      throw error;
    }
  };

  const fetchContracts = async () => {
    try {
      const data = await fetchWithAuth('/api/contracts');
      setContracts(data);
    } catch (error) {
      setContracts([]);
    }
  };

  const fetchEquipment = async () => {
    try {
      const data = await fetchWithAuth('/api/buyer/equipment');
      setEquipment(data);
    } catch (error) {
      setEquipment([]);
    }
  };

  const fetchFarmers = async () => {
    try {
      const data = await fetchWithAuth('/api/users/farmers');
      setFarmers(data);
    } catch (error) {
      setFarmers([]);
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await fetchWithAuth('/api/profile');
      setProfile(data);
    } catch (error) {
      setProfile({});
    }
  };

  const fetchNegotiations = async () => {
    try {
      const data = await fetchWithAuth('/api/negotiations');
      setNegotiationRequests(data);
    } catch (error) {
      setNegotiationRequests([]);
    }
  };

  const fetchMandiRates = async () => {
    try {
      const mockRates = [
        { commodity: "Apple", market: "Azadpur Mandi, Delhi", minPrice: 80, maxPrice: 120 },
        { commodity: "Banana", market: "Chennai Koyambedu", minPrice: 30, maxPrice: 45 },
        { commodity: "Mango", market: "Vashi Market, Mumbai", minPrice: 60, maxPrice: 150 },
        { commodity: "Grapes", market: "Bangalore Market", minPrice: 50, maxPrice: 90 },
        { commodity: "Orange", market: "Nagpur Market", minPrice: 40, maxPrice: 70 },
      ];
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMandiRates(mockRates);
    } catch (error) {
      setNotification('Failed to fetch mandi rates');
      setMandiRates([]);
    }
  };

  const fetchContractFarmingLands = async () => {
    try {
      const mockLands = [
        {
          _id: "land1",
          title: "Organic Farmland - 5 Acres",
          location: "Punjab",
          size: "5 acres",
          soilType: "Alluvial",
          waterSource: "Canal",
          pricePerAcre: 15000,
          leaseDuration: "1 year",
          owner: { name: "Raj Singh" },
          image: "https://placehold.co/400x200/E0F2F7/000000?text=Farmland",
          photos: [
            "https://placehold.co/200x200/E0F2F7/000000?text=Photo1",
            "https://placehold.co/200x200/E0F2F7/000000?text=Photo2",
            "https://placehold.co/200x200/E0F2F7/000000?text=Photo3"
          ],
          features: ["Organic certified", "Drip irrigation", "Storage facility"]
        },
        {
          _id: "land2",
          title: "Rice Farmland - 10 Acres",
          location: "West Bengal",
          size: "10 acres",
          soilType: "Clay",
          waterSource: "River",
          pricePerAcre: 12000,
          leaseDuration: "2 years",
          owner: { name: "Suresh Das" },
          image: "https://placehold.co/400x200/E0F2F7/000000?text=Rice+Farm",
          photos: [
            "https://placehold.co/200x200/E0F2F7/000000?text=Photo1",
            "https://placehold.co/200x200/E0F2F7/000000?text=Photo2"
          ],
          features: ["Water reservoir", "Tractor included", "Near processing unit"]
        }
      ];
      
      await new Promise(resolve => setTimeout(resolve, 800));
      setContractFarmingLands(mockLands);
    } catch (error) {
      setContractFarmingLands([]);
    }
  };

  const fetchRentalLands = async () => {
    try {
      const mockLands = [
        {
          _id: "land3",
          title: "Fertile Agricultural Land",
          location: "Maharashtra",
          size: "8 acres",
          soilType: "Black Cotton",
          waterSource: "Well",
          rentalPrice: 8000,
          minLease: "6 months",
          owner: { name: "Vikram Patil" },
          image: "https://placehold.co/400x200/E0F2F7/000000?text=Rental+Land",
          photos: [
            "https://placehold.co/200x200/E0F2F7/000000?text=Photo1",
            "https://placehold.co/200x200/E0F2F7/000000?text=Photo2",
            "https://placehold.co/200x200/E0F2F7/000000?text=Photo3"
          ],
          features: ["Borewell", "Fencing", "Storage shed"]
        },
        {
          _id: "land4",
          title: "Orchard Land - 3 Acres",
          location: "Himachal Pradesh",
          size: "3 acres",
          soilType: "Loamy",
          waterSource: "Spring",
          rentalPrice: 6000,
          minLease: "1 year",
          owner: { name: "Meena Sharma" },
          image: "https://placehold.co/400x200/E0F2F7/000000?text=Orchard",
          photos: [
            "https://placehold.co/200x200/E0F2F7/000000?text=Photo1"
          ],
          features: ["Existing apple trees", "Greenhouse", "Terrace farming"]
        }
      ];
      
      await new Promise(resolve => setTimeout(resolve, 800));
      setRentalLands(mockLands);
    } catch (error) {
      setRentalLands([]);
    }
  };

  const updateProfile = async (updatedProfile) => {
    try {
      await fetchWithAuth('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile)
      });
      
      setProfile(updatedProfile);
      setShowProfileForm(false);
      setNotification('Profile updated successfully');
    } catch (error) {
      setNotification('Failed to update profile: ' + error.message);
    }
  };

  const sendNegotiation = async () => {
    try {
      const response = await fetchWithAuth('/api/buyer/negotiations', {
        method: 'POST',
        body: JSON.stringify({
          contractId: selectedContract._id,
          message: negotiationMessage,
          proposedPrice: Number(proposedPrice),
          farmerId: selectedContract.farmer?._id
        })
      });

      setNegotiations(prev => [
        ...prev,
        {
          ...response,
          farmerName: getFarmerName(selectedContract.farmer),
          product: selectedContract.title
        }
      ]);

      setNegotiationMessage('');
      setProposedPrice('');
      setSelectedContract(null);
      setNotification('Negotiation sent successfully!');
    } catch (error) {
      setNotification('Failed to send negotiation: ' + error.message);
    }
  };

  const handleNegotiationAction = async (id, action) => {
    try {
      await fetchWithAuth(`/api/negotiations/${id}/${action}`, {
        method: 'PUT'
      });
      
      setNegotiationRequests(prev => 
        prev.map(n => 
          n._id === id ? {...n, status: action} : n
        )
      );
      
      setNotification(`Negotiation ${action}ed successfully`);
    } catch (error) {
      setNotification(`Failed to ${action} negotiation: ${error.message}`);
    }
  };

  const handleCartAction = (item) => {
    setCartItems(prev => {
      const exists = prev.some(i => i._id === item._id);
      return exists
        ? prev.filter(i => i._id !== item._id)
        : [...prev, item];
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('buyerToken');
    window.location.href = '/Dashboard';
  };

  const viewAllDetails = () => {
    if (selectedContract) {
      alert(`Viewing all details for contract: ${selectedContract.title}\nFarmer: ${getFarmerName(selectedContract.farmer)}\nPrice: ₹${selectedContract.price}\nQuantity: ${selectedContract.quantity}`);
    }
  };

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const token = localStorage.getItem('buyerToken');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      await fetchContracts();
      await fetchProfile();
      await fetchFarmers();
      await fetchNegotiations();
      setIsLoading(false);
    };
    checkAuthAndFetch();
  }, []);

  useEffect(() => {
    if (activeTab === 'mandiRates') {
      fetchMandiRates();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'contracts') {
      if (activeSubTab === 'equipment') {
        fetchEquipment();
      } else if (activeSubTab === 'contractFarmingLands') {
        fetchContractFarmingLands();
      } else if (activeSubTab === 'rentalLands') {
        fetchRentalLands();
      }
    }
  }, [activeTab, activeSubTab]);

  const OngoingDealsCard = ({ deal }) => {
    const farmerName = deal.farmer 
      ? `${deal.farmer.fName} ${deal.farmer.lName}` 
      : 'Unknown Farmer';
    
    const contract = deal.contractId || {};
    const productName = contract.title || 'Contract';
    const quantity = contract.quantity || 'N/A';
    const quality = contract.quality || 'Standard';
    const location = contract.location || 'N/A';
    
    return (
      <div className="bg-white rounded-xl p-5 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              {productName}
            </h3>
            <p className="text-gray-600">
              With {farmerName}
            </p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Active
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm text-gray-500">Finalized Price</p>
            <p className="font-semibold text-lg">
              ₹{deal.proposedPrice?.toLocaleString() || 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Agreed On</p>
            <p className="font-semibold">
              {new Date(deal.updatedAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Quantity</p>
            <p className="font-semibold">{quantity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Quality</p>
            <p className="font-semibold">{quality}</p>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button 
            onClick={() => viewDealDetails(deal)}
            className="flex-1 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            View Full Details
          </button>
          <button className="flex-1 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition">
            Track Shipment
          </button>
        </div>
      </div>
    );
  };

  const MandiRatesSection = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Fruits Mandi Rates</h2>
        <button 
          onClick={() => window.open('https://agmarknet.gov.in/', '_blank')}
          className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center gap-1"
        >
          View on Agmarknet <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>
      
      {mandiRates.length === 0 ? (
        <div className="text-center py-10">
          <CurrencyRupeeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading mandi rates...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commodity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Price (₹/kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Price (₹/kg)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mandiRates.map((rate, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.commodity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{rate.market}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{rate.minPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{rate.maxPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-start gap-3">
              <InformationCircleIcon className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                Data sourced from Agmarknet.gov.in. Prices are indicative and may vary.
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ImageScanner = () => (
    <div className="p-6 text-center">
      <h3 className="text-xl font-semibold mb-4">Image Scanner</h3>
      <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
        <p className="text-gray-500">Scanner Area</p>
      </div>
      <p className="text-gray-600">Scan your document or product here.</p>
      <button
        onClick={() => setShowScanner(false)}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Close Scanner
      </button>
    </div>
  );

  const Notifications = () => (
    <div className="p-6 text-center">
      <h3 className="text-xl font-semibold mb-4">Your Notifications</h3>
      <ul className="text-left space-y-2">
        {negotiationRequests.filter(n => n.status === 'accepted' || n.status === 'declined').slice(0, 3).map((notif, idx) => (
          <li key={idx} className="p-2 bg-gray-100 rounded-md">
            {`Your negotiation for ${notif.product} has been ${notif.status}`}
          </li>
        ))}
        <li className="p-2 bg-gray-100 rounded-md">New contract from Farmer X for Wheat.</li>
        <li className="p-2 bg-gray-100 rounded-md">Deal with Farmer A is now "Packaging".</li>
      </ul>
      <button
        onClick={() => setShowNotificationsModal(false)}
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Close Notifications
      </button>
    </div>
  );

  const DashboardStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: "Active Contracts", value: contracts.length },
        { title: "Cart Items", value: cartItems.length },
        { title: "Farmers", value: farmers.length }
      ].map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
            <ChartBarIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
      ))}
    </div>
  );

  const RecentContractsTable = () => (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Recent Contracts</h2>
        <button 
          onClick={() => setActiveTab('contracts')}
          className="text-green-600 hover:text-green-800 text-sm font-medium"
        >
          View All &gt;
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-gray-600 border-b border-gray-200">
              <th className="py-3 px-4 text-sm font-semibold">Farmer</th>
              <th className="py-3 px-4 text-sm font-semibold">Product</th>
              <th className="py-3 px-4 text-sm font-semibold">Quantity</th>
              <th className="py-3 px-4 text-sm font-semibold">Price</th>
              <th className="py-3 px-4 text-sm font-semibold">Status</th>
              <th className="py-3 px-4 text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contracts.slice(0, 3).map(contract => (
              <tr key={contract._id} className="text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={contract.farmer?.image || 'https://placehold.co/40x40/E0F2F7/000000?text=F'}
                      className="w-8 h-8 rounded-full object-cover"
                      alt="Farmer"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/40x40/E0F2F7/000000?text=F' }}
                    />
                    <span>{getFarmerName(contract.farmer)}</span>
                  </div>
                </td>
                <td className="py-4 px-4">{contract.title || 'N/A'}</td>
                <td className="py-4 px-4">{contract.quantity || 'N/A'}</td>
                <td className="py-4 px-4">₹{(contract.price || 0).toLocaleString()}</td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    contract.status === 'Active' ? 'bg-green-100 text-green-700' :
                      contract.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    {contract.status || 'N/A'}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => setSelectedContract(contract)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const NegotiationRequests = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Negotiation Requests</h2>
      
      {negotiationRequests.length === 0 ? (
        <div className="text-center py-10">
          <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No negotiation requests</h3>
          <p className="text-gray-500 mt-2">Farmers will appear here when they send negotiation requests</p>
        </div>
      ) : (
        <div className="space-y-4">
          {negotiationRequests.map(request => {
            const farmerName = request.farmer 
              ? `${request.farmer.fName} ${request.farmer.lName}` 
              : 'Unknown Farmer';
              
            const contractTitle = request.contractId?.title || 'Contract';
            const originalPrice = request.contractId?.price || 0;
            
            return (
              <div key={request._id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{farmerName}</h3>
                      <p className="text-gray-600 text-sm">{contractTitle}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Original Price</p>
                      <p className="font-medium">₹{originalPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Proposed Price</p>
                      <p className="font-medium">₹{request.proposedPrice?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-700">{request.message}</p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </span>
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleNegotiationAction(request._id, 'counter')}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md text-sm hover:bg-gray-200 transition-colors"
                        >
                          Counter
                        </button>
                        <button 
                          onClick={() => handleNegotiationAction(request._id, 'decline')}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50 font-inter">
      {notification && (
        <div className="fixed top-4 right-4 p-4 bg-green-100 text-green-800 rounded-lg shadow-md animate-slide-in z-50">
          {notification}
        </div>
      )}

      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-white hover:bg-green-700 rounded-full"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-bold text-white">
              Digital Krishii
            </h1>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setShowNotificationsModal(true)}
              className="relative p-2 text-white hover:bg-green-700 rounded-full transition-colors"
              title="Notifications"
            >
              <BellIcon className="w-6 h-6" />
              {negotiationRequests.filter(n => n.status === 'pending').length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {negotiationRequests.filter(n => n.status === 'pending').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowScanner(true)}
              className="relative p-2 text-white hover:bg-green-700 rounded-full transition-colors"
              title="Image Scanner"
            >
              <QrCodeIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 text-white hover:bg-green-700 rounded-full transition-colors"
              title="View Cart"
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>
            <div
              className="flex items-center gap-3 bg-green-700 px-4 py-2 rounded-full cursor-pointer hover:bg-green-800 transition-colors"
              onClick={() => setShowProfileForm(true)}
              title="Manage Profile"
            >
              <img
                src={profile.image || `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff`}
                className="w-8 h-8 rounded-full object-cover"
                alt="Profile"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff` }}
              />
              <div className="hidden sm:block">
                <p className="text-sm text-white font-semibold">{profile.companyName || 'Your Company'}</p>
                <p className="text-xs text-green-100">{profile.name || 'Buyer Name'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-green-700 rounded-md hover:bg-green-100 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <nav className="hidden lg:block w-64 bg-gradient-to-b from-green-700 to-green-800 text-white p-6 shadow-lg">
          <div className="flex flex-col items-center gap-4 mb-8 pt-4">
            <div className="relative">
              <img
                src={profile.image || `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff`}
                className="w-24 h-24 rounded-full object-cover border-4 border-green-600 shadow-md"
                alt="Profile"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff` }}
              />
              <button 
                onClick={() => setShowProfileForm(true)}
                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full text-green-700 hover:bg-green-100 transition-colors"
              >
                <UserCircleIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-white text-lg">{profile.name || 'Buyer Name'}</h3>
              <p className="text-green-100 text-sm">{profile.companyName || 'Your Company'}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
              { id: 'contracts', label: 'Farmer Contracts', icon: DocumentTextIcon },
              { id: 'ongoingDeals', label: 'Ongoing Deals', icon: ClipboardDocumentCheckIcon },
              { id: 'farmers', label: 'Farmers', icon: UsersIcon },
              { id: 'negotiations', label: 'Negotiation Requests', icon: ChatBubbleLeftRightIcon },
              { id: 'mandiRates', label: 'Mandi Rates', icon: CurrencyRupeeIcon },
              { id: 'notifications', label: 'Notifications', icon: BellIcon, action: () => setShowNotificationsModal(true) },
              { id: 'scanner', label: 'Scanner', icon: QrCodeIcon, action: () => setShowScanner(true) },
            ].map((item) => (
              <button
                key={item.id}
                onClick={item.action ? item.action : () => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id && !item.action 
                    ? 'bg-green-600 text-white font-semibold' 
                    : 'text-green-100 hover:bg-green-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-green-100 hover:bg-green-600 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
        )}
        <div className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-green-700 to-green-800 text-white p-6 shadow-lg z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Navigation</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-green-100 hover:text-white p-1 rounded-full">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-4 mb-8 pt-4">
            <div className="relative">
              <img
                src={profile.image || `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff`}
                className="w-24 h-24 rounded-full object-cover border-4 border-green-600 shadow-md"
                alt="Profile"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://ui-avatars.com/api/?name=${profile.name || 'Buyer'}&background=random&color=fff` }}
              />
              <button 
                onClick={() => { setShowProfileForm(true); setIsSidebarOpen(false); }}
                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full text-green-700 hover:bg-green-100 transition-colors"
              >
                <UserCircleIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-white text-lg">{profile.name || 'Buyer Name'}</h3>
              <p className="text-green-100 text-sm">{profile.companyName || 'Your Company'}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
              { id: 'contracts', label: 'Farmer Contracts', icon: DocumentTextIcon },
              { id: 'ongoingDeals', label: 'Ongoing Deals', icon: ClipboardDocumentCheckIcon },
              { id: 'farmers', label: 'Farmers', icon: UsersIcon },
              { id: 'negotiations', label: 'Negotiation Requests', icon: ChatBubbleLeftRightIcon },
              { id: 'mandiRates', label: 'Mandi Rates', icon: CurrencyRupeeIcon },
              { id: 'notifications', label: 'Notifications', icon: BellIcon, action: () => { setShowNotificationsModal(true); setIsSidebarOpen(false); } },
              { id: 'scanner', label: 'Scanner', icon: QrCodeIcon, action: () => { setShowScanner(true); setIsSidebarOpen(false); } },
            ].map((item) => (
              <button
                key={item.id}
                onClick={item.action ? item.action : () => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id && !item.action 
                    ? 'bg-green-600 text-white font-semibold' 
                    : 'text-green-100 hover:bg-green-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-green-100 hover:bg-green-600 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading dashboard...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  <DashboardStats />
                  <RecentContractsTable />
                </div>
              )}

              {activeTab === 'contracts' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap border-b border-gray-200 gap-1">
                    <button
                      className={`px-4 py-2 font-medium text-sm ${
                        activeSubTab === 'contracts' 
                          ? 'text-green-600 border-b-2 border-green-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveSubTab('contracts')}
                    >
                      Farming Contracts
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-sm ${
                        activeSubTab === 'equipment' 
                          ? 'text-green-600 border-b-2 border-green-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveSubTab('equipment')}
                    >
                      Farming Equipment
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-sm ${
                        activeSubTab === 'contractFarmingLands' 
                          ? 'text-green-600 border-b-2 border-green-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveSubTab('contractFarmingLands')}
                    >
                      Lands For Contract Farming
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-sm ${
                        activeSubTab === 'rentalLands' 
                          ? 'text-green-600 border-b-2 border-green-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveSubTab('rentalLands')}
                    >
                      Lands For Rent
                    </button>
                  </div>

                  {activeSubTab === 'contracts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {contracts.length > 0 ? contracts.map(contract => (
                        <div key={contract._id} className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-200">
                          <img
                            src={contract.image || 'https://placehold.co/400x200/E0F2F7/000000?text=Product'}
                            className="w-full h-48 object-cover rounded-md mb-4"
                            alt="Contract"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x200/E0F2F7/000000?text=Product' }}
                          />
                          <h3 className="text-lg font-bold text-gray-800">{contract.title || 'N/A'}</h3>
                          <div className="mt-4 space-y-2 text-sm text-gray-600">
                            <p><strong>Farmer:</strong> {getFarmerName(contract.farmer)}</p>
                            <p><strong>Quantity:</strong> {contract.quantity || 'N/A'}</p>
                            <p><strong>Price:</strong> ₹{(contract.price || 0).toLocaleString()}</p>
                            <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              contract.status === 'Active' ? 'bg-green-100 text-green-700' :
                                contract.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                              }`}>{contract.status || 'N/A'}</span></p>
                          </div>
                          <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <button
                              onClick={() => handleCartAction(contract)}
                              className={`flex-1 px-4 py-2 rounded-md transition-colors text-sm font-medium
                                ${cartItems.some(i => i._id === contract._id) ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-600 text-white hover:bg-green-700'}`}
                            >
                              {cartItems.some(i => i._id === contract._id) ? 'Remove from Cart' : 'Add to Cart'}
                            </button>
                            <button
                              onClick={() => setSelectedContract(contract)}
                              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      )) : (
                        <div className="col-span-full text-center py-12">
                          <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-xl font-medium text-gray-700">No contracts available</h3>
                          <p className="text-gray-500 mt-2">Check back later for farmer contracts</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeSubTab === 'equipment' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {equipment.length > 0 ? equipment.map(item => (
                      <div key={item._id} className="bg-white p-6 rounded-lg shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-200">
                        <img
                          src={item.image || 'https://placehold.co/400x200/E0F2F7/000000?text=Equipment'}
                          className="w-full h-48 object-cover rounded-md mb-4"
                          alt="Equipment"
                        />
                        <h3 className="text-lg font-bold text-gray-800">{item.title || 'N/A'}</h3>
                        <div className="mt-4 space-y-2 text-sm text-gray-600">
                          <p><strong>Owner:</strong> {item.user ? `${item.user.fName} ${item.user.lName}` : 'N/A'}</p>
                          <p><strong>Price/Day:</strong> ₹{(item.dailyRate || 0).toLocaleString()}</p>
                          <p><strong>Type:</strong> {item.type || 'N/A'}</p>
                          <p><strong>Location:</strong> {item.location?.city || 'N/A'}</p>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => {
                              setSelectedEquipment(item);
                              setBookingStep(0);
                            }}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleCartAction(item)}
                            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
                              cartItems.some(i => i._id === item._id) 
                                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                          >
                            {cartItems.some(i => i._id === item._id) ? 'Remove' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                      )) : (
                        <div className="col-span-full text-center py-12">
                          <WrenchScrewdriverIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-xl font-medium text-gray-700">No equipment available</h3>
                          <p className="text-gray-500 mt-2">Check back later for farming equipment</p>
                        </div>
                      )}
                    </div>
                  )}



                  

                  {activeSubTab === 'contractFarmingLands' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {contractFarmingLands.length > 0 ? contractFarmingLands.map(land => (
                        <div key={land._id} className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-200">
                          <img
                            src={land.image}
                            className="w-full h-48 object-cover rounded-md mb-4"
                            alt="Land"
                          />
                          <h3 className="text-lg font-bold text-gray-800">{land.title}</h3>
                          <div className="mt-4 space-y-2 text-sm text-gray-600">
                            <p><strong>Location:</strong> {land.location}</p>
                            <p><strong>Size:</strong> {land.size}</p>
                            <p><strong>Soil Type:</strong> {land.soilType}</p>
                            <p><strong>Price/Acre:</strong> ₹{land.pricePerAcre?.toLocaleString()}</p>
                            <p><strong>Lease Duration:</strong> {land.leaseDuration}</p>
                          </div>
                          <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <button
                              onClick={() => setSelectedLand(land)}
                              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleCartAction(land)}
                              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
                                cartItems.some(i => i._id === land._id) 
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {cartItems.some(i => i._id === land._id) ? 'Remove' : 'Add to Cart'}
                            </button>
                          </div>
                        </div>
                      )) : (
                        <div className="col-span-full text-center py-12">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h3 className="text-xl font-medium text-gray-700">No contract farming lands available</h3>
                          <p className="text-gray-500 mt-2">Check back later for available lands</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeSubTab === 'rentalLands' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rentalLands.length > 0 ? rentalLands.map(land => (
                        <div key={land._id} className="bg-white p-6 rounded-lg shadow-md border border-green-100 hover:shadow-lg transition-shadow duration-200">
                          <img
                            src={land.image}
                            className="w-full h-48 object-cover rounded-md mb-4"
                            alt="Land"
                          />
                          <h3 className="text-lg font-bold text-gray-800">{land.title}</h3>
                          <div className="mt-4 space-y-2 text-sm text-gray-600">
                            <p><strong>Location:</strong> {land.location}</p>
                            <p><strong>Size:</strong> {land.size}</p>
                            <p><strong>Soil Type:</strong> {land.soilType}</p>
                            <p><strong>Rental Price:</strong> ₹{land.rentalPrice?.toLocaleString()}/month</p>
                            <p><strong>Min Lease:</strong> {land.minLease}</p>
                          </div>
                          <div className="mt-4 flex flex-col sm:flex-row gap-2">
                            <button
                              onClick={() => setSelectedLand(land)}
                              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleCartAction(land)}
                              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
                                cartItems.some(i => i._id === land._id) 
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {cartItems.some(i => i._id === land._id) ? 'Remove' : 'Add to Cart'}
                            </button>
                          </div>
                        </div>
                      )) : (
                        <div className="col-span-full text-center py-12">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <h3 className="text-xl font-medium text-gray-700">No rental lands available</h3>
                          <p className="text-gray-500 mt-2">Check back later for available lands</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'ongoingDeals' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Ongoing Deals</h2>
                  
                  {negotiationRequests.filter(n => n.status === 'accepted').length === 0 ? (
                    <div className="text-center py-10">
                      <ClipboardDocumentCheckIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700">No ongoing deals</h3>
                      <p className="text-gray-500 mt-2">Accepted negotiations will appear here</p>
                      <button
                        onClick={() => setActiveTab('contracts')}
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        Browse Contracts
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {negotiationRequests
                        .filter(n => n.status === 'accepted')
                        .map(deal => (
                          <OngoingDealsCard key={deal._id} deal={deal} />
                        ))}
                    </div>
                  )}
                </div>
              )}

              {selectedDeal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-2xl relative shadow-lg animate-scale-in">
                    <button
                      onClick={() => setSelectedDeal(null)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                    
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {selectedDeal.contractId?.title || 'Deal Details'}
                      </h2>
                      <div className="flex items-center gap-2 text-gray-600">
                        <UsersIcon className="w-4 h-4" />
                        <span>With {getFarmerName(selectedDeal.farmer)}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Deal Information</h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Finalized Price</p>
                            <p className="text-lg font-semibold">
                              ₹{selectedDeal.proposedPrice?.toLocaleString() || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Original Price</p>
                            <p className="text-gray-700">
                              ₹{(selectedDeal.contractId?.price || 0).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Quantity</p>
                            <p className="text-gray-700">
                              {selectedDeal.contractId?.quantity || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Quality</p>
                            <p className="text-gray-700">
                              {selectedDeal.contractId?.quality || 'Standard'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="text-gray-700">
                              {selectedDeal.contractId?.location || 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Agreement Date</p>
                            <p className="text-gray-700">
                              {new Date(selectedDeal.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Negotiation Details</h3>
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-500 mb-1">Your Message</p>
                          <p className="text-gray-700">{selectedDeal.message || 'No message provided'}</p>
                        </div>
                        
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-sm text-gray-500 mb-1">Farmer's Response</p>
                          <p className="text-gray-700">Accepted the proposed price</p>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-gray-800 mb-3">Next Steps</h3>
                          <div className="flex flex-wrap gap-2">
                            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                              Confirm Payment
                            </button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                              Track Shipment
                            </button>
                            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
                              Download Agreement
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'farmers' && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
                    <h2 className="text-2xl font-bold mb-1">Registered Farmers</h2>
                    <p className="text-green-100 mb-6">Connect with farmers across India</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {farmers.length > 0 ? farmers.map(farmer => (
                        <div key={farmer._id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 group">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative">
                              <img 
                                src={farmer.image}
                                className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                                alt="Farmer"
                                onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${farmer.name}&background=random`}
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                                {farmer.name}
                              </h3>
                              <p className="text-gray-600 text-sm">{farmer.location}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span>{farmer.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span>{farmer.location}</span>
                            </div>
                          </div>
                          
                          <div className="mt-6 flex gap-3">
                            <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                              Contact
                            </button>
                            <button 
                              onClick={() => setActiveTab('contracts')}
                              className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                            >
                              View Contracts
                            </button>
                          </div>
                        </div>
                      )) : (
                        <div className="col-span-full text-center py-12">
                          <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-xl font-medium text-gray-700">No farmers found</h3>
                          <p className="text-gray-500 mt-2">Farmers will appear when they register</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'negotiations' && (
                <NegotiationRequests />
              )}

              {activeTab === 'mandiRates' && (
                <MandiRatesSection />
              )}
            </>
          )}
        </main>
      </div>

      {showProfileForm && (
        <ProfileForm 
          profile={profile} 
          onUpdate={updateProfile}
          onClose={() => setShowProfileForm(false)}
          notification={notification}
          setNotification={setNotification}
        />
      )}

      {showCart && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-2xl relative shadow-lg animate-scale-in">
            <button
              onClick={() => setShowCart(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
                <button
                  onClick={() => { setActiveTab('contracts'); setShowCart(false); }}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  Browse Contracts
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item._id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || 'https://placehold.co/60x60/E0F2F7/000000?text=Item'}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        alt={item.title || 'Item'}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/60x60/E0F2F7/000000?text=Item' }}
                      />
                      <div>
                        <h3 className="text-gray-800 font-medium">{item.title || item.name || 'N/A'}</h3>
                        <p className="text-gray-600 text-sm">
                          {item.price ? `₹${item.price.toLocaleString()}` : `₹${item.pricePerDay?.toLocaleString()}/day`}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCartAction(item)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium flex-shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-800">
                      ₹{cartItems.reduce((sum, item) => sum + (item.price || item.pricePerDay || 0), 0).toLocaleString()}
                    </span>
                  </div>
                  <button className="w-full px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedContract && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md lg:max-w-2xl relative shadow-lg animate-scale-in">
            <button
              onClick={() => setSelectedContract(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={selectedContract.image || 'https://placehold.co/400x300/E0F2F7/000000?text=Product+Details'}
                className="w-full h-64 object-cover rounded-lg"
                alt="Contract"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/E0F2F7/000000?text=Product+Details' }}
              />
              <div className="space-y-4 text-gray-700">
                <h2 className="text-2xl font-bold text-gray-800">{selectedContract.title || 'N/A'}</h2>
                <p className="text-gray-600">{selectedContract.description || 'No description available.'}</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Farmer:</strong> {getFarmerName(selectedContract.farmer)}</p>
                  <p><strong>Location:</strong> {selectedContract.location || 'N/A'}</p>
                  <p><strong>Price:</strong> ₹{(selectedContract.price || 0).toLocaleString()}</p>
                  <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedContract.status === 'Active' ? 'bg-green-100 text-green-700' :
                      selectedContract.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>{selectedContract.status || 'N/A'}</span></p>
                  <p><strong>Quantity:</strong> {selectedContract.quantity || 'N/A'}</p>
                  <p><strong>Quality:</strong> {selectedContract.quality || 'Standard'}</p>
                 
                </div>
                 <div className="mt-4">
        <h3 className="text-gray-800 font-medium mb-2">Send Negotiation</h3>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proposed Price (₹)
          </label>
          <input
            type="number"
            value={proposedPrice}
            onChange={(e) => setProposedPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-green-400"
            placeholder="Enter your proposed price"
          />
        </div>
        <textarea
          value={negotiationMessage}
          onChange={(e) => setNegotiationMessage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-green-400"
          placeholder="Type your negotiation message..."
          rows="3"
        />
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={viewAllDetails}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
                    >
                      <InformationCircleIcon className="w-5 h-5" />
                      All Details
                    </button>
                    <button
                      onClick={sendNegotiation}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

     {selectedEquipment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-4xl relative shadow-lg animate-scale-in max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setSelectedEquipment(null);
                setBookingStep(0);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            {bookingStep >= 1 ? (
              renderEquipmentBooking()
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="mb-4">
                    <img
                      src={selectedEquipment.image || 'https://placehold.co/600x400/E0F2F7/000000?text=Equipment'}
                      className="w-full h-64 object-cover rounded-lg"
                      alt="Equipment"
                    />
                  </div>
                  
                  {selectedEquipment.photos && selectedEquipment.photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {selectedEquipment.photos.map((photo, idx) => (
                        <img 
                          key={idx}
                          src={photo}
                          className="w-full h-24 object-cover rounded-md border"
                          alt={`Equipment photo ${idx+1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedEquipment.title || 'Equipment'}</h2>
                    <p className="text-gray-600">{selectedEquipment.description || 'No description available'}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Daily Rate</p>
                      <p className="text-xl font-bold">₹{selectedEquipment.dailyRate?.toLocaleString() || 'N/A'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Security Deposit</p>
                      <p className="text-xl font-bold">₹{selectedEquipment.securityDeposit?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <InformationCircleIcon className="w-5 h-5 text-blue-500" />
                        Basic Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="font-medium">{selectedEquipment.category || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Type</p>
                          <p className="font-medium">{selectedEquipment.type || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Model</p>
                          <p className="font-medium">{selectedEquipment.model || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Year Bought</p>
                          <p className="font-medium">{selectedEquipment.yearBought || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Work Type</p>
                          <p className="font-medium">{selectedEquipment.workType || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fuel Type</p>
                          <p className="font-medium">{selectedEquipment.fuelType || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Condition</p>
                          <p className="font-medium">{selectedEquipment.condition || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p className="font-medium">{selectedEquipment.status || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <ClipboardDocumentCheckIcon className="w-5 h-5 text-green-500" />
                        Rental Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Rental Period</p>
                          <p className="font-medium">{selectedEquipment.rentPeriod || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Advance Booking</p>
                          <p className="font-medium">
                            {selectedEquipment.advanceBooking} {selectedEquipment.bookingUnit || 'days'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fuel Policy</p>
                          <p className="font-medium">{selectedEquipment.fuelPolicy || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Handover Method</p>
                          <p className="font-medium">{selectedEquipment.handoverMethod || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Late Return Penalty</p>
                          <p className="font-medium">
                            ₹{selectedEquipment.lateReturnPenalty?.toLocaleString() || 'N/A'} 
                            {selectedEquipment.penaltyUnit ? ` per ${selectedEquipment.penaltyUnit}` : ''}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Cleaning Requirements</p>
                          <p className="font-medium">{selectedEquipment.cleaningRequirements || 'None'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Discount</p>
                          <p className="font-medium">
                            {selectedEquipment.discount} 
                            {selectedEquipment.discountType === 'percentage' ? '%' : '₹'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Usage Restriction</p>
                          <p className="font-medium">{selectedEquipment.usageRestriction || 'None'}</p>
                        </div>
                      </div>
                    </div>
                    
                   <div>
  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
    Location & Availability
  </h3>
  
  <div className="space-y-4">
    {/* Distance section */}
    <div>
      <p className="text-sm text-gray-500">Distance From You</p>
      <p className="font-medium">{distance || 'N/A'} km</p>
    </div>
    
    {/* Distance information box */}
    <div className="bg-blue-50 p-3 rounded-lg">
      <div className="flex items-center gap-2 text-blue-700">
        <InformationCircleIcon className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm">
          This equipment is approximately {distance || 'N/A'} km from your location
        </p>
      </div>
    </div>
    
    {/* Return location (if different) */}
    {!selectedEquipment.returnLocationSame && selectedEquipment.returnLocation && (
      <div>
        <p className="text-sm text-gray-500">Return Location</p>
        <p className="font-medium">{selectedEquipment.returnLocation.address || 'N/A'}</p>
      </div>
    )}
    
    {/* Available dates */}
    {selectedEquipment.availability && selectedEquipment.availability.length > 0 && (
      <div>
        <p className="text-sm text-gray-500 mb-2">Available Dates</p>
        <div className="flex flex-wrap gap-2">
          {selectedEquipment.availability.map((date, idx) => (
            <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              {new Date(date).toLocaleDateString()}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
</div>
                    
                    {selectedEquipment.accessories && selectedEquipment.accessories.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <WrenchScrewdriverIcon className="w-5 h-5 text-yellow-500" />
                          Included Accessories
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedEquipment.accessories.map((item, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedEquipment.damageProtocol && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Damage Protocol
                        </h3>
                        <div className="bg-red-50 p-4 rounded-lg">
                          {Object.entries(selectedEquipment.damageProtocol).map(([key, value]) => (
                            <div key={key} className="mb-2">
                              <p className="text-sm font-medium text-red-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                              <p className="text-red-700">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <UserCircleIcon className="w-5 h-5 text-purple-500" />
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Owner</p>
                          <p className="font-medium">
                            {selectedEquipment.user?.fName} {selectedEquipment.user?.lName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Primary Contact</p>
                          <p className="font-medium">{selectedEquipment.primaryContact || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Emergency Contact</p>
                          <p className="font-medium">{selectedEquipment.emergencyContact || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{selectedEquipment.user?.email || 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setBookingStep(1)}
                      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                      Book Now
                    </button>
                    <button className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium">
                      Contact Owner
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {selectedLand && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-2xl relative shadow-lg animate-scale-in">
            <button
              onClick={() => setSelectedLand(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={selectedLand.image}
                className="w-full h-64 object-cover rounded-lg"
                alt="Land"
              />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedLand.title}</h2>
                <p className="text-gray-600">{selectedLand.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{selectedLand.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-medium">{selectedLand.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Soil Type</p>
                    <p className="font-medium">{selectedLand.soilType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Water Source</p>
                    <p className="font-medium">{selectedLand.waterSource}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {activeSubTab === 'contractFarmingLands' ? 'Price/Acre' : 'Rental Price'}
                    </p>
                    <p className="font-medium">
                      ₹{activeSubTab === 'contractFarmingLands' 
                        ? selectedLand.pricePerAcre?.toLocaleString() 
                        : selectedLand.rentalPrice?.toLocaleString()}
                      {activeSubTab === 'rentalLands' && '/month'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {activeSubTab === 'contractFarmingLands' ? 'Lease Duration' : 'Min Lease'}
                    </p>
                    <p className="font-medium">
                      {activeSubTab === 'contractFarmingLands' 
                        ? selectedLand.leaseDuration 
                        : selectedLand.minLease}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      handleCartAction(selectedLand);
                      setSelectedLand(null);
                    }}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
                      cartItems.some(i => i._id === selectedLand._id) 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {cartItems.some(i => i._id === selectedLand._id) 
                      ? 'Remove from Cart' 
                      : 'Add to Cart'}
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-medium">
                    Contact Owner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showScanner && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md relative shadow-lg animate-scale-in">
            <button
              onClick={() => setShowScanner(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <ImageScanner />
          </div>
        </div>
      )}

      {showNotificationsModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 sm:p-8 w-full max-w-md relative shadow-lg animate-scale-in">
            <button
              onClick={() => setShowNotificationsModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <Notifications />
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;