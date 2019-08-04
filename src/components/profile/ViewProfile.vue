<template>
  <div class="view-profile container">
    <div class="card">
      <h2 v-if="profile" class="deep-purple-text center">{{profile.alias}}'s wall</h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="deep-purple-text">{{ comment.from}}</div>
          <div class="grey-text text-darken-2">{{comment.content}}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a Comment</label>
          <input type="text" name="comment" v-model="newComment" />
        </div>
        <p v-if="feedback">{{ feedback }}</p>
      </form>
    </div>
  </div>
</template>


<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  data() {
    return {
      profile: null,
      comments: [],
      newComment: null,
      user: null,
      feedback: null
    };
  },
  methods: {
    addComment() {
      if (!this.newComment) {
        this.feedback = "Enter your comment.";
        return;
      }
      this.feedback = null;
      db.collection("comments")
        .add({
          to: this.$route.params.id,
          from: this.user.id,
          content: this.newComment,
          time: Date.now()
        })
        .then(() => {
          this.newComment = null;
        });
    }
  },
  created() {
    let ref = db.collection("users");
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.user = doc.data();
          this.user.id = doc.id;
        });
      });

    ref
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profile = user.data();
        console.log(this.profile);
      });

    db.collection("comments")
      .where("to", "==", this.$route.params.id)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if ((change.type = "added")) {
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content
            });
          }
        });
      });
  }
};
</script>

<style>
.view-profile .card {
  padding: 10px;
  margin-top: 10px;
}
.view-profile h2 {
  margin-top: 0px;
  font-size: 2em;
}

.view-profile li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
