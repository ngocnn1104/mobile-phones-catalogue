import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    brands: {
      data: [],
      size: 10,
      query: ""
    },
    selectedBrand: null,
    cart: []
  },
  mutations: {
    setBrands(state, value) {
      state.brands.data = [...value];
    },

    setSelectedBrand(state, brandIndex) {
      if (state.selectedBrand !== brandIndex) {
        state.selectedBrand = brandIndex;
      } else {
        state.selectedBrand = null;
      }
    },

    incrementBrandsSize(state) {
      state.brands.size = state.brands.size + 10;
    },

    setBrandQuery(state, value) {
      state.brands.query = value;
    },

    updateCart(state, item) {
      const phoneIndex = state.cart.findIndex(phone => phone.slug === item.slug);
      if (phoneIndex >= 0) {
        const currentQuantity = state.cart[phoneIndex].quantity;
        state.cart.splice(phoneIndex, 1, {
          ...item,
          quantity: item.quantity + currentQuantity
        });
      } else {
        state.cart.push({...item});
      }
    }
  },
  actions: {
  },
  getters: {
    filteredBrands(state) {
      const {query, data} = state.brands;
      return data.filter(brand => {
        if (query) {
          return brand.brand_name.toLowerCase().includes(query.toLowerCase());
        }
        return brand;
      });
    },

    brandsWithSize(state, getters) {
      const {filteredBrands} = getters;
      return filteredBrands.slice(0, state.brands.size);
    },

    cartCount(state) {
      const {cart} = state;
      if (cart.length > 0) {
        return cart.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
      }
      return 0;
    }
  }
})
