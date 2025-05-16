import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const exists = state.find(item => item._id === action.payload._id);
      if (exists) {
        // If it already exists, increase quantity
        return state.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Else, add new item with quantity 1
      return [...state, { ...action.payload, quantity: 1 }];

    case 'INCREMENT_QUANTITY':
      return state.map(item =>
        item._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case 'DECREMENT_QUANTITY':
      return state.map(item =>
        item._id === action.payload
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );

    case 'REMOVE_FROM_CART':
      return state.filter(item => item._id !== action.payload);

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
