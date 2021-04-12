/** Se cargan las librerias de vue, axios para consumir los servicios */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: "store"
});

export default new Vuex.Store({
  strict: true,
  plugins: [vuexLocalStorage.plugin],
  state: {
    countries: []
  },
  mutations: {
    gotData(state, countries) {
      state.countries = countries;
    }
  },
  actions: {
    async getData({ commit }) {
      try {
        // Se usa el servicio restcountries para obtener todos los paises
        const GET_COUNTRIES = await axios.get(
          "https://restcountries.eu/rest/v2/all"
        );

        const COUNTRIES = GET_COUNTRIES.data;

        commit("gotData", COUNTRIES);
      } catch (err) {
        commit("gotData", err);
      }
    }
  },
  getters: {
    countries: state => {
      return state.countries;
    }
  }
});
