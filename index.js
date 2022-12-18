const axios = require("axios");
const cheerio = require("cheerio");
const app = require("express")();
const selectRandom = () => {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
  ];
  var randomNumber = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomNumber];
};
let user_agent = selectRandom();
let header = {
  "User-Agent": `${user_agent}`,
};

app.get("/api/reddit/subreddit/:subreddit", (req, res) => {
  const subreddit = req.params.subreddit;
  const url = `https://old.reddit.com/r/${subreddit}/top/`;
  axios(url, header)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const reddit = [];
      $("div#siteTable > div.link").each(function () {
        const title = $(this).find("p.title > a.title").text();
        const url = $(this).find("p.title > a.title").attr("href");
        const author = $(this).find("p.tagline > a.author").text();
        const comments = $(this).find("p.tagline > a.comments").text();
        const score = $(this).find("div.score.unvoted").text();
        reddit.push({
          title,
          url,
          author,
          comments,
          score,
        });
      });
      res.json(reddit);
    })
    .catch(console.error);
});

app.get("/api/reddit/tags/:tag", (req, res) => {
  const tag = req.params.tag;
  const url = `https://old.reddit.com/search/?q=${tag}&include_over_18=off&t=all&sort=top`
  console.log(url)
  axios(url, header)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const reddit = [];
      // console.log(html)
      $("div.contents > div.search-result-link").each(function () {
        const title = $(this).find("a.search-title").text();
        const url = $(this).find("a.search-title").attr("href");
        const author = $(this).find("a.author").text();
        const score = $(this).find("div.score.unvoted").text();
        reddit.push({
          title,
          url,
          author,
          score,
        });
      });
      res.json(reddit);
    })
    .catch(console.error);
})

// return trending videos of youtube (NOT WORKING)
app.get("/api/youtube/trending", (req, res) => {
  const query = req.params.query;
  const url = `https://www.youtube.com/feed/trending`;
  // console.log(url)
  axios(url, header)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const youtube = [];
      console.log($("div#contents").length);
      $("div#contents > ytd-video-renderer").each(function () {
        const title = $(this).find("h3#video-title").text();
        const url = $(this).find("h3#video-title").attr("href");
        const author = $(this).find("div#byline-container").text();
        const views = $(this)
          .find("div#metadata-line > span#metadata-line")
          .text();
        const time = $(this)
          .find("div#metadata-line > span#metadata-line")
          .text();
        youtube.push({
          title,
          url,
          author,
          views,
          time,
        });
      });

      res.json(youtube);
    })
    .catch(console.error);
});

// return the search results of twitter (NOT WORKING)
app.get("/api/twitter/:query", (req, res) => {
  const query = req.params.query;
  const url = `https://twitter.com/search?q=${query}`;
  axios(url, header)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const twitter = [];
      // console.).html())
      console.log($.html())
      $('[data-testid=tweetText]').each(function () {
        const title = "";
        $(this > span).each(function () {
          title += $(this).text();
        });
        twitter.push({
          title,
        });
      });
      res.json(twitter);
    })
    .catch(console.error);
});

// return the search results of duckduckgo
app.get("/api/duckduckgo/:query", (req, res) => {
  const query = req.params.query;
  const url = `https://duckduckgo.com/html/?q=${query}`;
  axios(url, header)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const duckduckgo = [];
      $("div#links > div.result").each(function () {
        const title = $(this).find("a.result__a").text();
        const url = $(this).find("a.result__a").attr("href");
        const description = $(this).find("a.result__snippet").text();
        duckduckgo.push({
          title,
          url,
          description,
        });
      });
      res.json(duckduckgo);
    })
    .catch(console.error);
});

// return the search results of stackoverflow
app.get("/api/stackoverflow/:query", (req, res) => {
  const query = req.params.query;
  const url = `https://stackoverflow.com/search?q=${query}`;
  axios(url, header)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const stackoverflow = [];
      $("div.js-post-summary").each(function () {
        const title = $(this).find("h3 > a").text();
        const url = $(this).find("h3 > a").attr("href");
        const description = $(this).find("div.excerpt").text();
        stackoverflow.push({
          title,
          url,
          description,
        });
      });
      res.json(stackoverflow);
    })
    .catch(console.error);
});

// return the search results of stackoverflow tags
app.get("/api/stackoverflow/tags/:query", (req, res) => {
  const query = req.params.query;
  const url = `https://stackoverflow.com/questions/tagged/${query}`;
  axios(url, header)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const stackoverflow = [];
      $("div.js-post-summary").each(function () {
        const title = $(this).find("h3 > a").text();
        const url = $(this).find("h3 > a").attr("href");
        const description = $(this).find("div.excerpt").text();
        stackoverflow.push({
          title,
          url,
          description,
        });
      });
      res.json(stackoverflow);
    })
    .catch(console.error);
});

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
