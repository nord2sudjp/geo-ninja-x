<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" v-model="password" />
      </div>
      <div class="field">
        <label for="alias">Alias</label>
        <input type="text" v-model="alias" />
      </div>
      <div class="field center">
        <button class="btn deep-purple">Signup</button>
      </div>
      <p v-if="feedback" class="red-text">{{feedback}}</p>
    </form>
  </div>
</template>
<script>
import slugify from "slugify";
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "Signup",
  data() {
    return {
      email: null,
      password: null,
      alias: null,
      slug: null,
      feedback: null
    };
  },
  methods: {
    signup() {
      if (!this.email || !this.password || !this.alias) {
        this.feedback = "Please enter Email, Password and Alias";
        return;
      }
      this.slug = slugify(this.alias, {
        replacement: "-",
        remove: /[$*_+~.()'"|!\-:@]/g,
        lower: true
      });
      //console.log(this.slug);
      let ref = db.collection("users").doc(this.slug);
      ref.get().then(doc => {
        if (doc.exists) {
          this.feedback = "This Alias aleady exist.";
          return;
        }
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            //console.log("user:", user.user.uid);
            ref.set({
              alias: this.alias,
              geolocation: null,
              user_id: user.user.uid
            });
          })
          .then(() => {
            this.$router.push({ name: "GMap" });
          })
          .catch(err => {
            console.log(err);
            this.feedback = err.message;
          });
        //this.feedback = "This Alias is free to use.";
      });
      this.feedback = null;
    }
  }
};
</script>

<style>
.signup {
  max-width: 300px;
  margin-top: 40px;
}

.signup h2 {
  font-size: 1.6em;
}

.signup .field {
  margin-bottom: 10px;
}
</style>

