"use strict";
/** Aqui configuramos la manera en que consumimos los servicio de los paises */
import Vue from "vue";
import axios from "axios";

let config = {

};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Antes que se envíe la solicitud
    return config;
  },
  function(error) {
    // Cuando genera un error
    return Promise.reject(error);
  }
);

// Aqui se agregan los intercerptores
_axios.interceptors.response.use(
  function(response) {
    // Aqui obtengo la respuesta
    return response;
  },
  function(error) {
    // Error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
