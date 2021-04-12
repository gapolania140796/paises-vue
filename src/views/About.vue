<!-- Aqui configuramos la vista inicial -->
<template>
  <v-container>
    <country :countryName="countryName" />
  </v-container>
</template>

<script>
// @ is an alias to /src
import Country from "@/components/Country.vue";

export default {
  name: "about",
  props: ["countryName"],
  components: {
    Country
  }
};
</script>
