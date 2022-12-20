# Social-Scraper
Social Scraper is a a node api which aims to scrape the web and provide the data you need. 

## Endpoints:
The current list of working endpoints are:
1. Reddit > subreddit search - http://social-scraper-one.vercel.app/api/reddit/subreddit/{query}
2. Reddit > complete search - http://social-scraper-one.vercel.app/api/reddit/tags/{query}
3. Duckduckgo > complete search - http://social-scraper-one.vercel.app/api/duckduckgo/{query}
4. Stackoverflow > tags search - http://social-scraper-one.vercel.app/api/stackoverflow/tags/{query}

## Setup
This is a simple node backend api. Just clone and do a quick `npm i`

## Under development
The following endpoints are in development:
1. Twitter
2. Youtube

## Contributing ideas
Contributing in any field is highly appreciated but currently, we would highly appreciate:
1. A better error handling (if can't fetch or process properly then proper error response needs to be sent.
2. Expanding the list of endpoints.
3. Expanding the list of headers so we can avoid being detected as script.

## Related projects
1. [The Social Collection](https://github.com/Ilikepizza2/The-Social-Collection), a browser extension based on sentiment analysis package (Social-Sentiment)
2. [Social Sentiment](https://www.npmjs.com/package/social-sentiment), an npm package for sentiment analysis of results fetched from this api.
3. [Ilikepizza2](https://github.com/Ilikepizza2), A link to my repo
