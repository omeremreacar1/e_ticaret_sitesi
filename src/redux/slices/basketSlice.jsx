import { createSlice } from "@reduxjs/toolkit";

const getBasketFromStorage = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return [];
};

const sendBasketToStorage = (products) => {
  localStorage.setItem("basket", JSON.stringify(products));
};

const initialState = {
  products: getBasketFromStorage(),
  drawer: false,
  totalAmount: 0,
};

export const basketSlice = createSlice({
  name: "basketSlice",
  initialState,
  reducers: {
    addProductToBasket: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id == action.payload.id
      );

      if (existingProduct) {
        existingProduct.counter += action.payload.counter;
      } else {
        state.products.push(action.payload);
      }

      sendBasketToStorage(state.products);
    },

    setDrawer: (state) => {
      state.drawer = !state.drawer;
    },

    calculateTotalAmount: (state) => {
      state.totalAmount = 0;
      state.products &&
        state.products.forEach((product) => {
          state.totalAmount += parseFloat(
            (product.counter * product.price).toFixed(1)
          );
        });
    },

    deleteSelectedProduct: (state, action) => {
      const arrayAfterDelete = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      state.products = [...arrayAfterDelete];
      sendBasketToStorage(arrayAfterDelete);
    },
  },
});

export const {
  addProductToBasket,
  setDrawer,
  calculateTotalAmount,
  deleteSelectedProduct,
} = basketSlice.actions;

export default basketSlice.reducer;
