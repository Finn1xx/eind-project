<script>
import { useStore } from "vuex";
import { ref, onMounted, watch } from "vue";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  setup() {
    const store = useStore();
    const user = ref(store.getters.getUser);
    const movies = ref(store.getters.getMovies);
    const currentVideo = ref(null);
    console.log(user)

    const setVideo = (videoUrl) => {
      store.commit("setVideo", videoUrl);
      currentVideo.value = store.getters.getCurrentVideo;
    };

    // Controleer loginstatus bij laden
    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          store.commit("setUser", currentUser);
          user.value = currentUser;
        } else {
          store.commit("logoutUser");
          user.value = null;
        }
      });
    });

    const logout = async () => {
      await signOut(auth);
      store.commit("logoutUser");
      user.value = null;
      window.location.href = "/login";
    };

    // Update de `user` als Vuex verandert
    watch(
      () => store.getters.getUser,
      (newUser) => {
        user.value = newUser;
      }
    );

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
            <li class="nav-item" v-if="user" style="display: flex; align-items: center;">
              <a class="nav-link logout-btn" @click="logout">Log out</a>
            </li>
          </ul>
          <span v-if="user" class="user-email">{{ user.email }}</span>  
        </div>
      </div>
    </nav>
  </header>

  
  <RouterView />
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

.navbar-nav a{
  color: white !important;
}
button {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;
}

.user-email{
  font-weight: bold;
  color: white;
}

footer {
  background: rgb(26, 58, 130);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  font-weight: bold;
  color: white;
  border-top: 0.2rem outset;
  border-color: white;
}



</style>
