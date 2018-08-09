<template>
  <div class="box">
    <p class="retweeted-label" v-if="isRetweeted()">
      <span class="icon is-small has-text-success"><i class="fas fa-retweet"></i></span>
      {{retweetedUserName}} Retweeted
    </p>

    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img :src="tweetOwner.profile_image_url">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{tweetOwner.name}}</strong>
            <small>@{{tweetOwner.screen_name}}</small>
            <small>{{tweet.created_at}}</small>
            <br>
            <span v-if="hasReplayScreenName()">
              <small>Replying to @{{tweet.in_reply_to_screen_name}}</small>
              <br>
            </span>
            {{tweet.text}}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item" @click.prevent="goToTweet(tweet.id_str)">
              <span class="icon is-small"><i class="fas fa-reply"></i></span>
            </a>
            <a class="level-item">
              <div :class="{'has-text-success': tweet.retweeted}">
                <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                <span class="is-size-6" v-if="!!tweet.retweet_count">
                  {{tweet.retweet_count}}
                </span>
              </div>
            </a>
            <a class="level-item">
              <div :class="{'has-text-danger': tweet.favorited}">
                <span class="icon is-small"><i class="fas fa-heart"></i></span>
                <span class="is-size-6" v-if="!!tweet.favorite_count">
                  {{tweet.favorite_count}}
                </span>
              </div>
            </a>
          </div>
        </nav>
      </div>
      <div class="media-right">
        <button class="delete"></button>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'TweetItem',
  props: {
    payload: {
      required: true,
      type: Object,
    },
  },
  computed: {
    tweet() {
      return this.payload.retweeted ? this.payload.retweeted_status : this.payload;
    },
    retweetedUserName() {
      return this.payload.user.name;
    },
    tweetOwner() {
      return this.tweet.user;
    },
  },
  methods: {
    hasReplayScreenName() {
      return !!this.tweet.in_reply_to_screen_name && this.tweet.in_reply_to_status_id;
    },
    isRetweeted() {
      return this.payload.retweeted;
    },
    goToTweet(tweetId) {
      window.open(`https://twitter.com/${this.tweetOwner.screen_name}/status/${tweetId}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.retweeted-label {
  margin-bottom: 1rem;
}
</style>
