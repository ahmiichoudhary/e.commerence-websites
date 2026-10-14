# URBANLOOM — E-commerce Front-End Demo

A second, visually distinct storefront concept made with HTML, CSS, and vanilla JavaScript. It uses a bold editorial streetwear aesthetic, a different font pairing, acid-lime and orange accents, oversized typography, and a monochrome campaign image.

## Files

- `index.html` — page structure and sections
- `style.css` — visual design, typography, responsive layouts, drawer and modal
- `script.js` — products, filtering, sorting, search, shopping bag, and demo checkout
- `README.md` — setup and deployment guide

## Features

- Responsive mobile and desktop layout
- Product grid with PKR price display
- Search, category filters, and price sorting
- Shopping bag with quantity updates, removal, and saved browser state
- Checkout preview (does not process a real payment)
- Newsletter demo interaction

## Run locally

Download/extract the project and open `index.html` in your browser. For a smoother development workflow, open the folder in Visual Studio Code and use the Live Server extension.

## Deploy on GitHub Pages

1. Create a repository on GitHub, for example `urbanloom`.
2. Upload all four files into the repository root.
3. Open **Settings → Pages**.
4. Under Build and deployment, select **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for the deployment to complete. GitHub will show the live URL, typically `https://YOUR-USERNAME.github.io/urbanloom/`.

## Customize

- Edit the `products` array in `script.js` to change products, prices, categories, and image URLs.
- The price formatter currently displays Pakistani Rupees (PKR); it does not convert currencies.
- Change the CSS variables at the top of `style.css` to customize colors and fonts.
- Images are remote Unsplash URLs and require internet access. Replace them with images you have rights to use.

## Important

This is a static front-end demo. Checkout does not create orders or take payments, and the newsletter form does not subscribe users to a real mailing list. For production, connect a secure backend or e-commerce service. Never expose private API keys in browser JavaScript.

## Third-party assets

Google Fonts and remote image URLs are loaded from their respective providers. Review their terms before using this project commercially.
