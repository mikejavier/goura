<template>
  <div>
    <tweet-item v-for="tweet in tweets" :key="tweet.id_str" :payload="tweet"/>
  </div>
</template>

<script>
import TweetItem from '@/components/TweetItem';

export default {
  name: 'TweetList',
  components: {
    TweetItem,
  },
  props: {
    tweets: {
      required: true,
      type: Array,
    },
  },
};
</script>
