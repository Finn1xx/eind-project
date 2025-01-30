<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const movies = computed(() => store.getters.getMovies);
    const likedMovies = computed(() => store.getters.getLikedMovies);
    const currentVideo = computed(() => store.getters.getCurrentVideo);
    const selectedMovie = ref(null);
    const isLoggedIn = computed(() => store.getters.isAuthenticated); // Gebruik de getter hier

    // Controleer of de gebruiker correct is ingelogd
    onMounted(() => {
      console.log("Is logged in:", isLoggedIn.value); // Debugging
    });

    const setVideo = (movie) => {
      store.commit("setVideo", movie.video);
      selectedMovie.value = movie;
    };

    const likeMovie = (movie) => {
      store.commit("likeMovie", movie);
    };

    const dislikeMovie = (movie) => {
      store.commit("dislikeMovie", movie);
    };

    const isLiked = (movie) => {
      return likedMovies.value.some((m) => m.id === movie.id && m.liked);
    };

    const isDisliked = (movie) => {
      return likedMovies.value.some((m) => m.id === movie.id && m.disliked);
    };

    return {
      movies,
      likeMovie,
      dislikeMovie,
      setVideo,
      currentVideo,
      isLiked,
      isDisliked,
      selectedMovie,
      isLoggedIn,
    };
  },
};
</script>

<template>
  <!-- <div class="watch-button-container">
    <button 
      v-if="selectedMovie" 
      @click="setVideo(selectedMovie)" 
      class="button_watch_movie">
      Watch Movie
    </button>
  </div> -->

  <div class="carousel-indicators">
    <button
      v-for="(movie, index) in movies"
      :key="index"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      :data-bs-slide-to="index"
      :class="{ active: index === 0 }"
      :aria-label="'Slide ' + (index + 1)"
    ></button>
  </div>

  <body>

  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div
        v-for="(movie, index) in movies"
        :key="movie.id"
        class="carousel-item"
        :class="{ active: index === 0 }"
        :style="{ backgroundImage: 'url(' + movie.image + ')' }"
      >
      </div>
    </div>

    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <div class="container-fluid background-color">
    <div class="row allcards ">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="card col-4 col-lg-2 col-md-1 card_hover"
        :style="{
        backgroundImage: `linear-gradient(185deg, rgba(0, 212, 255, 0.4) 13%, rgba(7, 7, 135, 0.8) 57%), url(${movie.image})`,
        width: '18rem',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
}"
      >
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">{{ movie.text }}</p>
          <button @click="likeMovie(movie)" class="like-btn" :class="{ liked: isLiked(movie) }">👍 Like</button>
          <button @click="dislikeMovie(movie)" class="dislike-btn" :class="{ disliked: isDisliked(movie) }">👎 Dislike</button>
          <a href="#videoplr" @click="setVideo(movie)" class="button_watch_movie">Watch Movie</a>
        </div>
      </div>
    </div>

    <div class="row">
        <div id="videoplr" class="videoplayer col-12">
          <video controls autoplay :src="currentVideo"></video>
        </div>
        <div class="btn btn-danger">
          <a class="getup" href="#">Click here to get Up</a>
        </div>
      </div>
    </div>
  </body>

  <footer>
    <div class="container">
      <div class="row text-center">
        <div class="col-12">
          <p>©2023 FinnSiepers Netherlands, Inc. All rights reserved.</p>
        </div>
        <div class="col-12 d-flex justify-content-center">
          <ul class="d-flex justify-content-center">
            <li><a href="">Privacy Policy</a></li>
            <li><a href="">Terms & Conditions</a></li>
            <li><a href="">Cookies Policy</a></li>
            <li><a href="">Return Policy</a></li>
            <li><a href="">Disclaimer</a></li>
            <li><a href="">EULA</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>

</template>

<style scoped>

a{
  text-decoration: none;
}

.allcards {
  transform: translateY(-125px);
  gap: 4rem;
  display: flex;
  justify-content: center;


}

.allcards h5, p{
  color: white;
  text-align: center;
}

.card_hover .card-body {
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.card_hover:hover .card-body {
  opacity: 1;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
}
.card_hover:hover {
  transform: scale(1.1);
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
}
.card_hover {
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
}

.like-btn,
.dislike-btn {
  margin: 5px;
  padding: 10px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
}

.like-btn {
  background-color: #28a745;
  color: white;
}

.like-btn.liked {
  background-color: #155724;
}

.dislike-btn {
  background-color: #dc3545;
  color: white;
}

.dislike-btn.disliked {
  background-color: #721c24;
}

.videoplayer video {
  height: 100vh;
  width: 100%;
}

.background-color {
  background: rgb(26, 58, 130);
}

.carousel-item {
  height: 100vh;
  background-size: cover;
  background-position: center;
}

footer {
  background: rgb(26, 58, 130);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  font-weight: bold;
  color: white;
}

/* Toegevoegd voor de "Watch Movie" knop bovenaan */
.watch-button-container {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.button_watch_movie {
  background-color: #007bff;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button_watch_movie:hover {
  background-color: #0056b3;
}

.carousel-indicators{
  top: 10%;

}
</style>
