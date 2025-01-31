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
    const newComment = ref("");

    // Haal de film op op basis van het ID
    onMounted(() => {
      const movieId = route.params.id;
      movie.value = movies.value.find((m) => m.id == movieId);
    });

    // Reacties ophalen voor de huidige film
    const movieComments = computed(() => {
      return store.getters.getCommentsByMovieId(movie.value?.id);
    });

    // Haal de ingelogde gebruiker op
    const userEmail = computed(() => store.state.user?.email || "Anoniem");

    // Commentaar toevoegen
    const submitComment = () => {
      if (newComment.value.trim()) {
        const comment = {
          user: userEmail.value, // Gebruik de e-mail van de ingelogde gebruiker
          text: newComment.value,
          movieId: movie.value.id,
        };
        store.commit("addComment", comment); // Voeg het comment toe via Vuex
        newComment.value = ""; // Maak het formulier leeg na verzending
      }
    };

    return {
      movie,
      newComment,
      movieComments,
      submitComment,
      userEmail, // Voeg userEmail toe aan de return om te gebruiken in de template
    };
  },
};
</script>

<template>
  <body>
    
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div v-if="movie" class="movie-container">
            <h1>{{ movie.title }}</h1>
            <video controls :src="movie.video"></video>
            <div class="col-4">
  
              <p class="card-text">{{ movie.text }}</p>
            </div>
        
            <div id="comments">
              <h2>Comments</h2>
              <div v-for="comment in movieComments" :key="comment.id" class="comment">
                <p><strong>{{ comment.user }}</strong>: {{ comment.text }}</p>
              </div>
        
              <!-- Comment Formulier -->
              <form @submit.prevent="submitComment">
                <textarea v-model="newComment" placeholder="Add a comment..." required></textarea>
                <button type="submit">Post Comment</button>
              </form>
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
.movie-container {
  text-align: center;
  padding: 20px;
}

h1{
  color: white;
}

p{
  color: white;
  text-align: left;
}

body{
  background-color: rgb(53, 76, 130);
}



#comments {
  margin-top: 30px;
  text-align: left;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);

}

video{
  height: 100%;
  width: 100%;
}


button:hover {
  scale: 1.1;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);

}
</style>
