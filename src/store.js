import { createStore } from 'vue';

const store = createStore({
  state: {
    movies: [
      {
        id: "1",
        title: "Star Wars: Revenge of the Sith",
        text: "Three years into the Clone Wars, Obi-Wan pursues a new threat, while Anakin is lured by Chancellor Palpatine into a sinister plot to rule the galaxy.",
        image: "/src/assets/starwars.jpg",
        video: "/src/assets/StarWars.mp4",
      },
    ],
    likedMovies: [], // Liked en disliked movies worden hier opgeslagen
    currentVideo: null,
  },
  getters: {
    getMovies(state) {
      return state.movies;
    },
    getLikedMovies(state) {
      return state.likedMovies;
    },
    getCurrentVideo(state) {
      return state.currentVideo;
    },
  },
  mutations: {
    setVideo(state, videoUrl) {
      state.currentVideo = videoUrl;
    },
    likeMovie(state, movie) {
      const existingMovie = state.likedMovies.find((m) => m.id === movie.id);
      if (existingMovie) {
        existingMovie.liked = true;
      } else {
        state.likedMovies.push({ ...movie, liked: true });
      }
    },
    dislikeMovie(state, movie) {
      const existingMovie = state.likedMovies.find((m) => m.id === movie.id);
      if (existingMovie) {
        existingMovie.disliked = true;
      } else {
        state.likedMovies.push({ ...movie, disliked: true });
      }
    },
  },
});

export default store;
