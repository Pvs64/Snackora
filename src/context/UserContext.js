import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const login = async ({ email, password, name }) => {
    setIsLoading(true);
    try {
      if (email === 'test@example.com' && password === 'password123') {
        const savedUser = localStorage.getItem('user');
        let newUser;
        if (savedUser) {
          newUser = JSON.parse(savedUser);
          newUser.email = email;
          newUser.name = name;
        } else {
          newUser = { id: 'user123', email, name, addresses: [], orderHistory: [] };
        }
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        toast.success(`Welcome, ${name}!`);
        return true;
      }
      throw new Error('Invalid email or password');
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  const addAddress = (address) => {
    const newAddress = { id: Date.now(), ...address };
    const updatedUser = {
      ...user,
      addresses: [...(user.addresses || []), newAddress],
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Address added!');
  };

  const updateAddress = (addressId, updatedAddress) => {
    const updatedUser = {
      ...user,
      addresses: user.addresses.map((addr) =>
        addr.id === addressId ? { ...addr, ...updatedAddress } : addr
      ),
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Address updated!');
  };

  const deleteAddress = (addressId) => {
    const updatedUser = {
      ...user,
      addresses: user.addresses.filter((addr) => addr.id !== addressId),
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Address deleted!');
  };

  const addOrder = (order) => {
    const updatedUser = {
      ...user,
      orderHistory: [...(user.orderHistory || []), order],
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem(`user-${user.id}-orders`, JSON.stringify(updatedUser.orderHistory));
    toast.success('Order added!');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, addAddress, updateAddress, deleteAddress, addOrder, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};