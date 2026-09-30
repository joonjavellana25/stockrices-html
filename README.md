# Tech Stock Prices

## How to Use

1. [Get a free API key from Alpha Vantage](https://www.alphavantage.co/support/#api-key).
2. Copy `.env.example` to `.env` and set `ALPHA_VANTAGE_API_KEY`.
3. Run `node server.js` and open [http://localhost:8000/](http://localhost:8000/).

`.env` is listed in `.gitignore` and should never be committed.

> **Note:**  
> Alpha Vantage limits to 5 requests per minute. This project adds a 1.2 second delay between API calls to comply.  
> For production use, consider a backend proxy or a paid plan.

## Running Locally with Node.js

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Open a terminal in the project directory.
3. Run the included server so `.env` is loaded and never exposed as a static file:

```bash
node server.js
```

Visit [http://localhost:8000/](http://localhost:8000/) in your browser.

## Deployment

You can host your static HTML on any static hosting provider such as:

- [Vercel](https://vercel.com/) (Node.js ready)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

**To deploy with Node.js to platforms like Vercel or Netlify:**
- Deploy the project directory, including your HTML and (if used) `server.js`.
- If using Vercel, it will detect and deploy the Node.js server automatically if present, or deploy static if you omit it.

> **Security Note:**  
> Avoid exposing your API key in public client-side JavaScript or public repos. Use environment variables and a backend proxy for production if needed.


