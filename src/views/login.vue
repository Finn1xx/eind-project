<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p>Don't have an account? <RouterLink to="/register">Register</RouterLink></p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();

    const handleLogin = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/'); // Navigeer naar homepagina na succesvolle login
      } catch (err) {
        error.value = 'Invalid credentials, please try again.';
      }
    };

    return {
      email,
      password,
      error,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
form {
  display: flex;
  flex-direction: column;
}
form .form-group {
  margin-bottom: 15px;
}
form button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
form button:hover {
  background-color: #0056b3;
}
.error {
  color: red;
}
</style>
