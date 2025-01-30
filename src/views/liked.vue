<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    let likedMovies = store.getters.getLikedMovies;

    return {
      likedMovies,
    };
  },
};
</script>

<template>
  <div class="container">
    <h2>Mijn Gelikete Films</h2>
    <div v-if="likedMovies.length === 0">
      <p>Je hebt nog geen films geliket.</p>
    </div>
    <div v-else>
      <div v-for="movie in likedMovies" :key="movie.id" class="movie-card">
        <img :src="movie.image" :alt="movie.title" />
        <h3>{{ movie.title }}</h3>
        <p>Status: {{ movie.liked ? "❤️ Geliket" : "💔 Gedisliket" }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  text-align: center;
}
</style>
