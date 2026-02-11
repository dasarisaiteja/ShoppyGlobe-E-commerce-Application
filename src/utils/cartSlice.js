import { createSlice } from '@reduxjs/toolkit';

// This slice manages our shopping cart logic
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // collects the products
  },
  reducers: {
    // 1. Function to add an item to the cart
    addToCart: function(state, action) {
      const productToAdd = action.payload;
      
      // We check if the item is already in our list
      const existingItem = state.items.find(function(item) {
        return item.id === productToAdd.id;
      });
      
      if (existingItem) {
        // If we found it, just add 1 to the quantity
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        // If it's a new item we add it to the list and set quantity to 1
        const newItem = { ...productToAdd, quantity: 1 };
        state.items.push(newItem);
      }
    },

    // 2. Function to delete an item from the cart
    removeFromCart: function(state, action) {
      const idToDelete = action.payload;
      // We keep every item EXCEPT the one that matches the ID
      state.items = state.items.filter(function(item) {
        return item.id !== idToDelete;
      });
    },

    // 3. Function to change the quantity 
    updateQuantity: function(state, action) {
      const itemId = action.payload.id;
      const newQty = action.payload.quantity;

      const itemToChange = state.items.find(function(item) {
        return item.id === itemId;
      });

      if (itemToChange) {
        // We set the new quantity that we received
        itemToChange.quantity = newQty;
      }
    },

    // 4. Function to empty the whole cart (for checkout)
    clearCart: function(state) {
      state.items = [];
    },
  },
});

// We export the functions so our components can use them
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;


// Get the list of items
export const selectCartItems = function(state) {
  return state.cart.items;
};

// Calculate total items 
export const selectCartTotal = function(state) {
  let totalCount = 0;
  state.cart.items.forEach(function(item) {
    totalCount = totalCount + item.quantity;
  });
  return totalCount;
};

// Calculate total price
export const selectCartTotalPrice = function(state) {
  let totalPrice = 0;
  state.cart.items.forEach(function(item) {
    const itemCost = item.price * item.quantity;
    totalPrice = totalPrice + itemCost;
  });
  return totalPrice;
};

export default cartSlice.reducer;  