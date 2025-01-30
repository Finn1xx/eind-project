<template>
  <div class="register-container">
    <h2>Maak een account aan</h2>
    <form @submit.prevent="registerUser">
      <div>
        <label for="email">E-mail:</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Wachtwoord:</label>
        <input v-model="password" type="password" required minlength="6" />
      </div>
      <div>
        <label for="confirmPassword">Bevestig wachtwoord:</label>
        <input v-model="confirmPassword" type="password" required />
      </div>
      <button type="submit">Registreren</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase"; // Firebase importeren
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const registerUser = async () => {
      if (password.value !== confirmPassword.value) {
        errorMessage.value = "Wachtwoorden komen niet overeen!";
        return;
      }

      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        alert("Account succesvol aangemaakt!");
        router.push("/login");
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    return { email, password, confirmPassword, errorMessage, registerUser };
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
