import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      cart: [],
    };
  },
  mutations: {
    addCart(state, data) {
      const newPro = {
        id: data.id,
        name: data.name,
        image: data.image,
        description: data.description,
        price: data.price,
        quantity: data.quantity
      };
      state.cart.unshift(newPro);
    },
    removeCart(state, index) {
      state.cart.splice(index, 1);
    }
  },
  actions: {
    addCart(context, data) {
      context.commit('addCart', data);
    },
    removeCart(context, index) {
      context.commit('removeCart', index);
    }
  },
  getters: {
    cart(state) {
      return state.cart;
    },
    memory(state) {
      return (memoryId) => {
        return state.memories.find((memory) => memory.id === memoryId);
      };
    },
  },
});

export default store;
