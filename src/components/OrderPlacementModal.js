import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { toast } from 'react-hot-toast';

const OrderPlacementModal = ({ isOpen, onClose, onPlaceOrder, totalAmount, cartItems }) => {
  const { user, addAddress } = useUser();
  const [selectedAddress, setSelectedAddress] = useState('');
  const [newAddress, setNewAddress] = useState({ street: '', city: '', country: '' });

  if (!isOpen) return null;

  const handleAddAddress = () => {
    if (newAddress.street.trim() && newAddress.city.trim() && newAddress.country.trim()) {
      addAddress({ id: Date.now(), ...newAddress });
      setNewAddress({ street: '', city: '', country: '' });
      toast.success('Address added!');
    } else {
      toast.error('Please fill all address fields');
    }
  };

  const handleSubmit = () => {
    if (!selectedAddress && (!newAddress.street.trim() || !newAddress.city.trim() || !newAddress.country.trim())) {
      toast.error('Please select or enter a valid address');
      return;
    }
    const address = selectedAddress || `${newAddress.street}, ${newAddress.city}, ${newAddress.country}`;
    onPlaceOrder({ address, items: cartItems, total: totalAmount, date: new Date().toISOString() });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Select Delivery Address</h2>
        {user?.addresses?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold dark:text-gray-300">Saved Addresses</h3>
            {user.addresses.map((addr) => (
              <div key={addr.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="address"
                  value={`${addr.street}, ${addr.city}, ${addr.country}`}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  className="text-amber-500"
                />
                <span className="dark:text-gray-300">{`${addr.street}, ${addr.city}, ${addr.country}`}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mb-4">
          <h3 className="font-semibold dark:text-gray-300">Add New Address</h3>
          <input
            type="text"
            value={newAddress.street}
            onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
            placeholder="Street"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-2"
          />
          <input
            type="text"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            placeholder="City"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-2"
          />
          <input
            type="text"
            value={newAddress.country}
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
            placeholder="Country"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-2"
          />
          <button
            onClick={handleAddAddress}
            className="mt-2 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
          >
            Add Address
          </button>
        </div>
        <button
          onClick={() => alert('Google Maps integration not implemented')}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Select on Google Maps
        </button>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacementModal;