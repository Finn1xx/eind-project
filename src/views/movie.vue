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
    <body>
        <div class="container d-flex justify-content-center">
            <div class="row">
                <div class="col-12">
                    <div v-if="movie" class="movie-container">
                      <h1>{{ movie.title }}</h1>
                      <video controls :src="movie.video"></video>
                        <div class="col-4">
                            <p class="card-text">{{ movie.text }}</p>
                        </div>
                    </div>
                    <div v-else>
                      <p>Loading movie...</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>

*{
    color: white;
}
.movie-container {
  text-align: center;
  padding: 20px;
}

h1{
    padding-bottom: 2rem;
}

video{
  width: 100%;
}

.col-4{
    text-align: left;
}


body{
  background: rgb(53, 76, 130);
  height: 82.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
