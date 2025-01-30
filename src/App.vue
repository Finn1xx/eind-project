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
            <!-- Register en Login knoppen zichtbaar als de gebruiker niet ingelogd is -->
            <li class="nav-item" v-if="!user">
              <RouterLink class="nav-link" to="/register">Register</RouterLink>
            </li>
            <li class="nav-item" v-if="!user">
              <RouterLink class="nav-link" to="/login">Login</RouterLink>
            </li>
            <!-- Uitloggen knop zichtbaar als de gebruiker ingelogd is -->
            <li class="nav-item" v-if="user">
              <a class="nav-link" @click="logout">Uitloggen</a>
            </li>

            <!-- Like en Dislike knoppen alleen zichtbaar als de gebruiker ingelogd is -->
            <li class="nav-item" v-if="user">
              <button @click="likeMovie" class="btn btn-primary">Like</button>
            </li>
            <li class="nav-item" v-if="user">
              <button @click="dislikeMovie" class="btn btn-danger">Dislike</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  setup() {
    const store = useStore();
    const user = ref(null);

    // Voeg je like en dislike methods toe
    const likeMovie = () => {
      // Voeg hier je logica toe om een film te liken
      console.log("Film geliket!");
    };

    const dislikeMovie = () => {
      // Voeg hier je logica toe om een film te disliken
      console.log("Film gedisliket!");
    };

    // Controleer de inlogstatus van de gebruiker
    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
      });
    });

    // Uitlogfunctie
    const logout = async () => {
      await signOut(auth);
      user.value = null;
      window.location.href = "/login"; // Stuur naar login na uitloggen
    };

    return {
      user,
      likeMovie,
      dislikeMovie,
      logout,
    };
  },
};
</script>

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
