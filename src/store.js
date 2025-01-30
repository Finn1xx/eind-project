import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      currentVideo: null,
      likedMovies: JSON.parse(localStorage.getItem("likedMovies")) || [],
      user: JSON.parse(localStorage.getItem("user")) || null, // ✅ Herstel ingelogde gebruiker
movies: [
  {
    id: "1",
    title: "Star Wars: Revenge of the Sith",
    text: "Three years into the Clone Wars, Obi-Wan pursues a new threat...",
    image: "/src/assets/starwars.jpg",
    video: "/src/assets/StarWars.mp4",
  },
  {
    id: "2",
    title: "Oppenheimer",
    text: "The story of American scientist, J. Robert Oppenheimer...",
    image: "/src/assets/oppenheimer.jpeg",
    video: "/src/assets/Oppenheimer.mp4",
  },
  {
    id: "3",
    title: "Hacksaw Ridge",
    text: "World War II American Army Medic Desmond T. Doss...",
    image: "/src/assets/hacksawridge.jpeg",
    video: "/src/assets/Hacksaw.mp4",
  },
  {
    id: "4",
    title: "Interstellar",
    text: "When Earth becomes uninhabitable in the future...",
    image: "/src/assets/interstellar.jpg",
    video: "/src/assets/Interstellar.mp4",
  },
  {
    id: "5",
    title: "Annabelle: Creation",
    text: "Twelve years after the tragic death of their little girl...",
    image: "/src/assets/annabelle.jpg",
    video: "/src/assets/ANNABELLE.mp4",
  },
  {
    id: "6",
    title: "Spider-Man: Far from Home",
    text: "Following the events of Avengers: Endgame (2019)...",
    image: "/src/assets/spiderman.jpg",
    video: "/src/assets/SPIDER-MAN.mp4",
  },
  {
    id: "7",
    title: "Inception",
    text: "A thief who steals corporate secrets through dream-sharing technology...",
    image: "/src/assets/inception.jpeg",
    video: "/src/assets/Inception.mp4",
  },
  {
    id: "8",
    title: "Tenet",
    text: "Armed with only the word Tenet, and fighting for survival...",
    image: "/src/assets/tenet.jpg",
    video: "/src/assets/tenet.mp4",
  }
]
    };
  },

  getters: {
    getMovies: (state) => state.movies,
    getCurrentVideo: (state) => state.currentVideo,
    getLikedMovies: (state) => state.likedMovies,
    isAuthenticated: (state) => state.user !== null, // ✅ Zorg ervoor dat isAuthenticated juist werkt
  },

  mutations: {
    setVideo: (state, videoUrl) => {
      state.currentVideo = videoUrl;
    },

    likeMovie: (state, movie) => {
      const index = state.likedMovies.findIndex((m) => m.id === movie.id);
      if (index === -1) {
        state.likedMovies.push({ ...movie, liked: true, disliked: false });
      } else {
        state.likedMovies[index].liked = true;
        state.likedMovies[index].disliked = false;
      }
      localStorage.setItem("likedMovies", JSON.stringify(state.likedMovies)); // ✅ Bewaren in localStorage
    },

    dislikeMovie: (state, movie) => {
      const index = state.likedMovies.findIndex((m) => m.id === movie.id);
      if (index === -1) {
        state.likedMovies.push({ ...movie, liked: false, disliked: true });
      } else {
        state.likedMovies[index].liked = false;
        state.likedMovies[index].disliked = true;
      }
      localStorage.setItem("likedMovies", JSON.stringify(state.likedMovies)); // ✅ Bewaren in localStorage
    },

    setUser: (state, user) => {
      console.log("Ingelogde gebruiker:", user); // Debugging
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user)); // ✅ Ingelogde gebruiker opslaan
    },

    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // ✅ Uitloggen en verwijderen uit storage
      console.log("User is uitgelogd");
    },
  },
});
