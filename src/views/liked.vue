<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const likedMovies = ref([...store.getters.getLikedMovies]); // ✅ Reactieve lijst

    const resetLikes = () => {
      store.commit("resetLikesDislikes");
      likedMovies.value = []; // ✅ UI direct updaten zonder refresh
    };

    const showResetButton = computed(() => likedMovies.value.length > 0);


    // ✅ UI bijwerken wanneer Vuex-winkel verandert
    watch(
      () => store.getters.getLikedMovies,
      (newLikedMovies) => {
        likedMovies.value = [...newLikedMovies];
      }
    );

    return {
      likedMovies,
      resetLikes,
      showResetButton
    };
  },
};
</script>

<template>
  <body>
    
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>my liked movies</h2>
          <div v-if="likedMovies.length === 0">
            <p>You havent liked any movie.</p>
          </div>
          <div class="row d-flex justify-content-center"  v-else>
            <div v-for="movie in likedMovies" :key="movie.id" class="movie-card col-5">
              <img :src="movie.image" :alt="movie.title" />
              <h3>{{ movie.title }}</h3>
              <p>Status: {{ movie.liked ? "❤️ Geliket" : "💔 Gedisliket" }}</p>
            </div>
            <a v-if="showResetButton" @click="resetLikes">Reset Likes</a>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>
.movie-card {
  padding: 10px;
  margin: 10px;
}

img{
  width: 100%;
}

body{
  background: rgb(53, 76, 130);
  min-height: 82.5vh;
}

h2{
  color: white;
  text-align: center;
  padding-top: 2rem;
}

p, h3{
  color: white;
  text-align: center;
}

a{
  color: white !important;
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  font-weight: bold;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
  max-width: 100%;


}

a:hover{
  scale: 1.1;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);

}
</style>
