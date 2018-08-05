<template>
<div>
  <nav class="navbar is-link" role="navigation" aria-label="main navigation">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">Goura</router-link>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </div>
  </nav>
  <div class="container is-fluid">
    <div class="section columns">
      <div class="column is-3">
        <profile-card :user="user" v-if="!!user" />
      </div>
      <div class="column is-9">
        <tweet-list :tweets="userFeed" v-if="!!userFeed" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import http from '@/services/http';
import ProfileCard from '@/components/ProfileCard';
import TweetList from '@/components/TweetList';

export default {
  name: 'Home',
  components: {
    ProfileCard,
    TweetList,
  },
  data() {
    return {
      user: null,
      userFeed: null,
    };
  },
  methods: {
    setUser(payload) {
      this.user = payload;
    },
    setUserFeed(payload) {
      this.userFeed = payload;
    },
    fetchUser() {
      http.get('/me')
        .then(res => this.setUser(res.data));
    },
    fetchUserFeed() {
      http.get('/me/feed')
        .then(res => this.setUserFeed(res.data));
    },
  },
  created() {
    this.fetchUser();
    this.fetchUserFeed();
  },
};
</script>

