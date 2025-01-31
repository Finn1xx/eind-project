<script>
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const movies = computed(() => store.getters.getMovies);
    const movie = ref(null);

    onMounted(() => {
      const movieId = route.params.id;
      movie.value = movies.value.find((m) => m.id == movieId);
    });

    return {
      movie,
    };
  },
};
</script>

<template>
  <div v-if="movie" class="movie-container">
    <h1>{{ movie.title }}</h1>
    <video controls autoplay :src="movie.video"></video>
  </div>
  <div v-else>
    <p>Loading movie...</p>
  </div>
</template>

<style scoped>
.movie-container {
  text-align: center;
  padding: 20px;
}

video {
  width: 80%;
  max-width: 1000px;
}
</style>
