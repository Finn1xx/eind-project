import { createStore } from "vuex";
import { db } from "@/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


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
    text: "Three years into the Clone Wars, Obi-Wan pursues a new threat, while Anakin is lured by Chancellor Palpatine into a sinister plot to rule the galaxy.",
    image: "/src/assets/starwars.jpg",
    video: "/src/assets/StarWars.mp4",
  },
  {
    id: "2",
    title: "Oppenheimer",
    text: "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
    image: "/src/assets/oppenheimer.jpeg",
    video: "/src/assets/Oppenheimer.mp4",
  },
  {
    id: "3",
    title: "Hacksaw Ridge",
    text: "World War II American Army Medic Desmond T. Doss, serving during the Battle of Okinawa, refuses to kill people and becomes the first man in American history to receive the Medal of Honor without firing a shot.",
    image: "/src/assets/hacksawridge.jpeg",
    video: "/src/assets/Hacksaw.mp4",
  },
  {
    id: "4",
    title: "Interstellar",
    text: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    image: "/src/assets/interstellar.jpg",
    video: "/src/assets/Interstellar.mp4",
  },
  {
    id: "5",
    title: "Annabelle: Creation",
    text: "Twelve years after the tragic death of their little girl, a doll-maker and his wife welcome a nun and several girls from a shuttered orphanage into their home, where they become the target of the doll-maker's possessed creation, Annabelle.",
    image: "/src/assets/annabelle.jpg",
    video: "/src/assets/ANNABELLE.mp4",
  },
  {
    id: "6",
    title: "Spider-Man: Far from Home",
    text: "Following the events of Avengers: Endgame (2019), Spider-Man must step up to take on new threats in a world that has changed forever.",
    image: "/src/assets/spiderman.jpg",
    video: "/src/assets/SPIDER-MAN.mp4",
  },
  {
    id: "7",
    title: "Inception",
    text: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    image: "/src/assets/inception.jpeg",
    video: "/src/assets/Inception.mp4",
  },
  {
    id: "8",
    title: "Tenet",
    text: "Armed with only the word Tenet, and fighting for the survival of the entire world, CIA operative, The Protagonist, journeys through a twilight world of international espionage on a global mission that unfolds beyond real time.",
    image: "/src/assets/tenet.jpg",
    video: "/src/assets/tenet.mp4",
  },
  {
    id: "9",
    title: "The Matrix",
    text: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    image: "/src/assets/matrix.jpg",
    video: "/src/assets/matrix.mp4",
  },
  {
    id: "10",
    title: "Zodiac",
    text: "Between 1968 and 1983, a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer, an unidentified individual who terrorizes Northern California with a killing spree.",
    image: "/src/assets/zodiac.jpg",
    video: "/src/assets/zodiac.mp4",
  },
  {
    id: "10",
    title: "The Dark Knight",
    text: "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
    image: "/src/assets/dark.jpg",
    video: "/src/assets/dark.mp4",
  },
]

    };
  },

  getters: {
    getMovies: (state) => state.movies,
    getCurrentVideo: (state) => state.currentVideo,
    getLikedMovies: (state) => state.likedMovies,
    isAuthenticated: (state) => state.user !== null,
  },

  mutations: {
    setVideo: (state, videoUrl) => {
      state.currentVideo = videoUrl;
    },

    setLikedMovies: (state, likedMovies) => {
      state.likedMovies = likedMovies;
    },

    likeMovie: (state, movie) => {
      const index = state.likedMovies.findIndex((m) => m.id === movie.id);
      if (index === -1) {
        state.likedMovies.push({ ...movie, liked: true, disliked: false });
      } else {
        state.likedMovies[index].liked = true;
        state.likedMovies[index].disliked = false;
      }
    },

    dislikeMovie: (state, movie) => {
      const index = state.likedMovies.findIndex((m) => m.id === movie.id);
      if (index === -1) {
        state.likedMovies.push({ ...movie, liked: false, disliked: true });
      } else {
        state.likedMovies[index].liked = false;
        state.likedMovies[index].disliked = true;
      }
    },

    setUser: (state, user) => {
      console.log("Ingelogde gebruiker:", user);
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    logoutUser: (state) => {
      state.user = null;
      state.likedMovies = []; // ✅ Maak likedMovies leeg bij uitloggen
      localStorage.removeItem("user");
      console.log("User is uitgelogd");
    },
  },

  actions: {
    async fetchUserMovies({ commit, state }) {
      if (!state.user) return;

      const userRef = doc(db, "users", state.user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        commit("setLikedMovies", docSnap.data().likedMovies || []);
      } else {
        await setDoc(userRef, { likedMovies: [] });
        commit("setLikedMovies", []);
      }
    },

    async likeMovie({ commit, state }, movie) {
      if (!state.user) return;

      const userRef = doc(db, "users", state.user.uid);
      await updateDoc(userRef, {
        likedMovies: arrayUnion({ id: movie.id, liked: true, disliked: false }),
      });

      commit("likeMovie", movie);
    },

    async dislikeMovie({ commit, state }, movie) {
      if (!state.user) return;

      const userRef = doc(db, "users", state.user.uid);
      await updateDoc(userRef, {
        likedMovies: arrayUnion({ id: movie.id, liked: false, disliked: true }),
      });

      commit("dislikeMovie", movie);
    }
  }
});