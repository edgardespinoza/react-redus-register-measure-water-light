import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the state
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  products: Product[];
  productsNumber: number;
}

const initialState: CartState = {
  products: [],
  productsNumber: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
      state.productsNumber += action.payload.quantity;
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );

      if (index !== -1) {
        state.productsNumber -= state.products[index].quantity;

        state.products.splice(index, 1);
      }
    },
    incrementInCart: (state: CartState, action: PayloadAction<string>) => {
      const product = state.products.find((item) => item.id === action.payload);

      if (product) {
        product.quantity += 1;
        state.productsNumber += 1;
      }
    },
    decrementInCart: (state: CartState, action: PayloadAction<string>) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (!product) {
        return;
      }

      if (product.quantity === 1) {
        const index = state.products.findIndex(
          (item) => item.id === action.payload
        );
        if (index !== -1) {
          state.products.splice(index, 1);
        }
      } else {
        product.quantity -= 1;
      }

      state.productsNumber -= 1;
    },
  },
});

export const { addToCart, removeFromCart, incrementInCart, decrementInCart } =
  cartSlice.actions;

export default cartSlice.reducer;
