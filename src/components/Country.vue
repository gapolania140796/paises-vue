<!-- Esta plantilla es usada para mostrar los datos del pais -->
<template>
  <section class="about-section">
    <v-btn class="btn-primary" @click="$router.go(-1)">&larr; Atras</v-btn>

    <div class="about-section__text-block">
      <div class="about-section__img-container text-md-center">
        <img
          :src="country.flag"
          :alt="country.name"
          class="about-section__img"
        />
      </div>

      <div class="about-section__text-container">
        <h1 class="about-section__list-heading">{{ country.name }}</h1>

        <ul class="about-section__list">
          <li class="about-section__list-item">
            <span class="font-weight-bold">Nombre nativo:</span>
            {{ country.nativeName }}
          </li>
          <li class="about-section__list-item">
            <span class="font-weight-bold">Población:</span>
            {{
              country.population
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }}
          </li>
          <li class="about-section__list-item">
            <span class="font-weight-bold">continente:</span> {{ country.region }}
          </li>
          <li class="about-section__list-item">
            <span class="font-weight-bold">Sub continente:</span>
            {{ country.subregion }}
          </li>
          <li class="about-section__list-item">
            <span class="font-weight-bold">Capital:</span> {{ country.capital }}
          </li>
          <li class="about-section__list-item mt-sm-40">
            <span class="font-weight-bold">Dominio de nivel superior:</span>
            {{ country.topLevelDomain[0] }}
          </li>
          <li class="about-section__list-item">
            <span class="font-weight-bold">Monedas:</span>
            {{
              country.currencies[0].symbol
                ? `(${country.currencies[0].symbol}) ${country.currencies[0].name}`
                : `${country.currencies[0].name}`
            }}
          </li>
          <li class="about-section__list-item">
            <span class="font-weight-bold">Idiomas:</span>
            {{ showListName(country.languages).join(", ") }}
          </li>
        </ul>

        <div class="about-section__borders--container">
          <span
            class="about-section__borders font-weight-bold"
            v-if="country.borders != ''"
          >
            Países vecinos:
            <v-btn
              v-for="(country, index) in borderCountry"
              class="btn-secondary"
              :key="index"
              :to="'/about/' + country.name.replace(/\s\([\w\s\.]+\)/gi, '')"
            >
              {{ country.name.replace(/\s\([\w\s\.]+\)/gi, "") }}
            </v-btn>
          </span>

          <span class="about-section__borders font-weight-bold" v-else
            >Border Countries: <strong class="font-weight-normal">None</strong>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["countryName"],
  data: () => ({
    loading: true
  }),

  computed: {
    /* Mapear los paises */
    ...mapGetters(["countries"]),
    countryData() {
      return this.countries.filter(country => {
        return country.name.toLowerCase().match(this.countryName.toLowerCase());
      });
    },
    /* Obtener el pais */
    country() {
      return this.countryData[0];
    },
    /* Obtener los paises vecinos*/
    borderCountry() {
      return this.countries.filter(country => {
        const countryBorders = this.country.borders;
        const regexBorders = new RegExp(countryBorders.join("|", "gi"));
        return country.alpha3Code.match(regexBorders);
      });
    }
  },

  /* Esperar un par de segundo para cargar los contenidos */
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },

  methods: {
    showListName(list) {
      return list.map(item => item.name);
    }
  }
};
</script>
