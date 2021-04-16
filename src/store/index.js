import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      cart: [],
      urlAPI: "http://127.0.0.1:8000/api/",
      userData: {}
    };
  },
  mutations: {
    addCart(state, data) {
      let flag = false
      if(state.cart[0]){
        for(let i = 0; i < state.cart.length; i++){
          if(state.cart[i].id == data.id){
            state.cart[i].quantity++
            flag = true
          }
        }
      }
      if(flag) return
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
    },
    removeAllCart(state) {
      state.cart = []
    },
    saveUserData(state, data) {
      state.userData = data
    }
  },
  actions: {
    addCart(context, data) {
      context.commit('addCart', data);
    },
    removeCart(context, index) {
      context.commit('removeCart', index);
    },
    removeAllCart(context) {
      context.commit('removeAllCart');
    },
    saveUserData(context, index) {
      context.commit('saveUserData', index);
    }
  },
  getters: {
    cart(state) {
      return state.cart;
    },
    urlAPI(state) {
      return state.urlAPI;
    },
    userData(state) {
      return state.userData;
    },
    memory(state) {
      return (memoryId) => {
        return state.memories.find((memory) => memory.id === memoryId);
      };
    },
  },
});

export default store;
