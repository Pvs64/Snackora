import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { toast } from 'react-hot-toast';

const Addresses = () => {
  const { user, addAddress, updateAddress, deleteAddress } = useUser();
  const [form, setForm] = useState({ street: '', city: '', country: '' });
  const [editingAddressId, setEditingAddressId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to manage addresses');
      return;
    }
    if (!form.street.trim() || !form.city.trim() || !form.country.trim()) {
      toast.error('Please fill all address fields');
      return;
    }
    if (editingAddressId) {
      updateAddress(editingAddressId, form);
      setEditingAddressId(null);
    } else {
      addAddress({ street: form.street, city: form.city, country: form.country });
    }
    setForm({ street: '', city: '', country: '' });
  };

  const handleEdit = (address) => {
    setForm({ street: address.street, city: address.city, country: address.country });
    setEditingAddressId(address.id);
  };

  const handleDelete = (addressId) => {
    deleteAddress(addressId);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-4">{editingAddressId ? 'Edit Address' : 'Add Address'}</h2>
      {user ? (
        <>
          <form onSubmit={handleSubmit} className="w-full max-w-md mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Street</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">City</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Country</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              {editingAddressId ? 'Update Address' : 'Save Address'}
            </button>
            {editingAddressId && (
              <button
                type="button"
                onClick={() => {
                  setEditingAddressId(null);
                  setForm({ street: '', city: '', country: '' });
                }}
                className="ml-4 text-gray-600 dark:text-gray-300"
              >
                Cancel Edit
              </button>
            )}
          </form>
          {user.addresses?.length > 0 ? (
            <ul className="w-full max-w-2xl">
              {user.addresses.map((address) => (
                <li key={address.id} className="border-b py-4 flex justify-between items-center">
                  <span>
                    {address.street}, {address.city}, {address.country}
                  </span>
                  <div>
                    <button
                      onClick={() => handleEdit(address)}
                      className="text-blue-500 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No addresses saved.</p>
          )}
        </>
      ) : (
        <p>Please log in to view and manage your addresses.</p>
      )}
    </div>
  );
};

export default Addresses;