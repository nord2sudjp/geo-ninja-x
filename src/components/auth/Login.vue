<template>
  <div class="login container">
    <form class="card-panel" @submit.prevent="login">
      <h2 class="center deep-purple-text">Login</h2>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" v-model="password" />
      </div>
      <p v-if="feedback" class="red-text center">{{feedback}}</p>
      <div class="field">
        <button class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    };
  },
  methods: {
    login() {
      //console.log(this.email, this.password);
      if (!this.email || !this.password) {
        this.feedback = "Please enter email and password";
        return;
      }
      this.feedback = null;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          //console.log(user.user);
          this.$router.push({ name: "GMap" });
        })
        .catch(err => {
          this.feedback = err.message;
        });
    }
  }
};
</script>

<style>
.login {
  max-width: 300px;
  margin-top: 40px;
}

.login h2 {
  font-size: 1.6em;
}

.login .field {
  margin-bottom: 20px;
}
</style>


