<script>
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  setup() {
    const store = useStore();
    let movies = store.getters.getMovies;
    let currentVideo = ref(null);
    const user = ref(null);

    const setVideo = (videoUrl) => {
      store.commit("setVideo", videoUrl);
      currentVideo.value = store.getters.getCurrentVideo;
    };

    // Controleer de inlogstatus van de gebruiker
    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
      });
    });

    // Uitloggen functie
    const logout = async () => {
      await signOut(auth);
      user.value = null;
      window.location.href = "/login"; // Stuur naar login na uitloggen
    };

    return {
      movies,
      setVideo,
      currentVideo,
      user,
      logout,
    };
  },
};
</script>

<template>
  <header>
    <nav class="navbar navigatiebalk neon-btn navbar-expand-lg bg-light">
      <div class="container-fluid navigatiebalk">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse navigatiebalk_ul" id="navbarNav">
          <ul class="navbar-nav navigatiebalk_ul_li">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/liked">Liked Movies</RouterLink>
            </li>
            <li class="nav-item" v-if="!user">
              <RouterLink class="nav-link" to="/register">Register</RouterLink>
            </li>
            <li class="nav-item" v-if="!user">
              <RouterLink class="nav-link" to="/login">Login</RouterLink>
            </li>
            <li class="nav-item" v-if="user">
              <a class="nav-link" @click="logout">Uitloggen</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>


button {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;
}
</style>
