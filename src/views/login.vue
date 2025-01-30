<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="E-mailadres" required />
        <input v-model="password" type="password" placeholder="Wachtwoord" required />
        <button type="submit">Inloggen</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { useRouter } from "vue-router"; // Vue Router importeren
  import { signInWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase";  // Zorg dat dit het juiste pad is
  
  export default {
    setup() {
      const email = ref("");
      const password = ref("");
      const errorMessage = ref("");
      const router = useRouter(); // Router-instantie ophalen
  
      const login = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
          console.log("Ingelogd als:", userCredential.user);
          errorMessage.value = "";
  
          // 🔹 Doorgestuurd naar homepage na succesvol inloggen 🔹
          router.push("/");
        } catch (error) {
          errorMessage.value = "Fout bij inloggen: " + error.message;
        }
      };
  
      return { email, password, errorMessage, login };
    }
  };
  </script>
  
  <style scoped>
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
  