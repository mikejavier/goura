<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="user.profile_image_url" :alt="user.name">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{user.name}}</p>
          <p class="subtitle is-6">@{{user.screen_name}}</p>
        </div>
      </div>
      <div class="content">
        {{user.description}}
        <hr>
      </div>
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tweets</p>
            <p class="is-size-4">{{user.statuses_count}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Following</p>
            <p class="is-size-4">{{user.friends_count}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Followers</p>
            <p class="is-size-4">{{user.followers_count}}</p>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
};
</script>
