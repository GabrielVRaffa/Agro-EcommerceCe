import React, { createContext, useContext, useState, useEffect } from 'react';

// Tempo de expiração em milissegundos (2 horas)
const EXPIRATION_TIME = 2 * 60 * 60 * 1000;

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    const savedTimestamp = localStorage.getItem('cartTimestamp');

    if (savedCart && savedTimestamp) {
      const now = Date.now();
      const timestamp = parseInt(savedTimestamp, 10);

      if (now - timestamp < EXPIRATION_TIME) {
        setCartItems(JSON.parse(savedCart));
      } else {
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTimestamp');
      }
    }
  }, []);

  // Atualizar localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTimestamp', Date.now().toString());
  }, [cartItems]);

  const addToCart = (produto, quantidade) => {
    if (quantidade < 10) return;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === produto.id);
      if (existing) {
        return prev.map(item =>
          item.id === produto.id
            ? { ...item, quantity: item.quantity + quantidade }
            : item
        );
      } else {
        return [...prev, { ...produto, quantity: quantidade }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 10) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
