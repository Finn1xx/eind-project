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
  <body>
    
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>My movies</h2>
          <div v-if="likedMovies.length === 0">
            <p>You havent liked any movies.</p>
          </div>
          <div class="row d-flex justify-content-center"  v-else>
            <div v-for="movie in likedMovies" :key="movie.id" class="movie-card col-5">
              <img :src="movie.image" :alt="movie.title" />
              <h3>{{ movie.title }}</h3>
              <p>Status: {{ movie.liked ? "❤️ Geliket" : "💔 Gedisliket" }}</p>
            </div>
          </div>
          <a class="backto"> <RouterLink class="nav-link" to="/">Back to movies</RouterLink></a>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
.backto{
  display: flex;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding-bottom: 2rem;
}
.backto a{
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.backto a:hover{
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.movie-card {
  padding: 10px;
  margin: 10px;
}

img{
  width: 100%;
}

body{
  background: rgb(53, 76, 130);
}

h2{
  color: white;
  text-align: center;
  padding-top: 2rem;
}

p, h3{
  color: white;
}
</style>
