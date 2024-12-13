const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

function getWelcomeMessage() {
  return 'Welcome to my service';
}

app.get('/welcome', (req, res) => {
  res.send(getWelcomeMessage());
});

function getGreetingMessage(username) {
  return 'Hello, ' + username + '!';
}

app.get('/greet', (req, res) => {
  let username = req.query.username;
  res.send(getGreetingMessage(username));
});

function checkPassword(password) {
  let result = 'weak';
  if (password.length > 15) result = 'strong';
  return result;
}

app.get('/check-password', (req, res) => {
  let password = req.query.password;
  res.send(checkPassword(password));
});

function getSum(num1, num2) {
  return num1 + num2;
}

app.get('/sum', (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);
  res.send(getSum(num1, num2).toString());
});

function getSubscriptionStatus(username, isSubscribed) {
  if (isSubscribed === 'true') return username + ' is subscribed.';
  else return username + ' is not subscribed.';
}

app.get('/subscription-status', (req, res) => {
  let username = req.query.username;
  let isSubscribed = req.query.isSubscribed;
  res.send(getSubscriptionStatus(username, isSubscribed));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
