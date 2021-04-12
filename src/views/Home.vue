<template>
  <v-container>
    <countries />
  </v-container>
</template>

<script>
// @ is an alias to /src
import Countries from "@/components/Countries.vue";

export default {
  name: "Home",
  components: {
    Countries
  }
};
</script>
