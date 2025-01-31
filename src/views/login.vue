<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const login = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        store.commit("setUser", userCredential.user); // Zet gebruiker in Vuex
        router.push("/"); // Stuur naar homepagina
      } catch (error) {
        errorMessage.value = "Fout bij inloggen: " + error.message;
      }
    };

    return {
      email,
      password,
      login,
      errorMessage,
    };
  },
};
</script>

<template>
  
  <body>
    <div class="container">
      <div class="row">
        <div class="col-10">
          <h2>Login</h2>
          <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Wachtwoord" required />
            <button type="submit">Inloggen</button>
          </form>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </body>
</template>

<style scoped>

body{
  background: rgb(53, 76, 130);
  height: 77vh;
}

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.row{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
max-width: 300px;
margin: 50px auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 5px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
input {
display: block;
width: 100%;
margin-bottom: 10px;
padding: 8px;
}
button {
width: 100%;
padding: 10px;
background: #007bff;
color: white;
border: none;
cursor: pointer;
}
.error {
color: red;
margin-top: 10px;
}


</style>
