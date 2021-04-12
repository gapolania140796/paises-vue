<!-- En este componente se dibujan todos los paises -->
<template>
  <section class="countries-section">
    <v-row no-gutters>
      <!-- Buscador por pais -->
      <div class="countries-section__input-group">
        <input
          height="56"
          class="countries-section__input"
          placeholder="Buscar por país…"
          v-model="keywords"
        />
      </div>
      <!-- Filtro por continente -->
      <div class="countries-section__dropdown">
        <v-select
          :items="items"
          v-model="region"
          color="black"
          label="Filtrar por continente"
          hide-selected="true"
          dense
          solo
        ></v-select>
      </div>
    </v-row>

    <!-- Se usa esta plantilla para mostrar los datos mas relevantes de cada país-->
    <v-layout wrap class="countries-section__card-container">
      <v-skeleton-loader
        v-show="loading"
        class="countries-section__card"
        v-for="(item, index) in 20"
        :key="index"
        type="card"
        max-width="264"
        width="100%"
        min-height="336"
      ></v-skeleton-loader>

      <v-card
        class="countries-section__card"
        v-for="(country, index) in filteredCountries"
        :key="index"
        max-width="264"
        min-height="336"
        :to="'/about/' + country.name"
      >
        <v-img class="white--text align-end" height="160" :src="country.flag">
        </v-img>

        <v-card-text class="countries-section__card--text">
          <ul class="countries-section__card--list">
            <li class="countries-section__card--list-header">
              {{ country.name }}
            </li>
            <li class="countries-section__card--list-item">
              <strong>Población:</strong>
              {{
                country.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </li>
            <li class="countries-section__card--list-item">
              <strong>continente:</strong> {{ country.region }}
            </li>
            <li class="countries-section__card--list-item">
              <strong>Capital:</strong> {{ country.capital }}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-layout>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  /* Estructurar el modelo de datos */
  data: () => ({
    items: ["Africa", "America", "Asia", "Europe", "Oceania"],
    keywords: "",
    region: "",
    results: [],
    loading: true,
  }),
  methods: {},
  /* Filtrar los paises */ 
  computed: {
    ...mapGetters(["countries"]),
    filteredCountries() {
      return this.countries.filter((country) => {
        return (
          country.name.toLowerCase().match(this.keywords.toLowerCase()) &&
          country.region.match(this.region)
        );
      });
    },
  },
  /* Esperar unos segundos para cargar las imagenes */
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
