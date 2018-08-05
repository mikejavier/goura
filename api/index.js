require('dotenv').config();
const express = require('express');
const OAuth = require('oauth');
const session = require('express-session');
const cors = require('cors');
const app = express();
const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.CONSUMER_KEY,
  process.env.CONSUMER_SECRET,
  '1.0A',
  process.env.API_URL_CALLBACK,
  'HMAC-SHA1'
);

app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: true
}));

app.use(cors());

app.get('/auth', function (req, res) {
  oauth.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret, results) {
    if (error) {
      res.send(error);
    } else {
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      res.redirect("https://twitter.com/oauth/authorize?oauth_token=" + req.session.oauthRequestToken);
    }
  });
});

app.get('/auth/twitter/callback', function (req, res) {
  oauth.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send(error);
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      res.end();
    }
  });
});

app.get('/me', function name(req, res) {
  oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json',
    process.env.ACCESS_TOKEN,
    process.env.ACCESS_TOKEN_SECRET,
    function (error, twitterResponseData, result) {
      if (error) {
        res.end(JSON.stringify(error));
        return;
      }

      res.end(twitterResponseData);
    });
});

app.get('/me/feed', function name(req, res) {
  oauth.get('https://api.twitter.com/1.1/statuses/user_timeline.json?count=100',
    process.env.ACCESS_TOKEN,
    process.env.ACCESS_TOKEN_SECRET,
    function (error, twitterResponseData, result) {
      if (error) {
        res.end(JSON.stringify(error));
        return;
      }

      res.end(twitterResponseData);
    });
});

app.listen(3000, () => {
  console.log('server on...');
});