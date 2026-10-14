# NovaCart — E-commerce Demo Store

NovaCart is a responsive, front-end e-commerce storefront built with plain HTML, CSS, and JavaScript. It is designed to be published on **GitHub Pages** without a build step.

## Features

- Responsive home page and product catalog
- Product search, category filters, and price/name sorting
- Add-to-cart, quantity updates, remove items, and subtotal calculation
- Wishlist saved in browser local storage
- Demo checkout dialog and demo newsletter form
- Keyboard-friendly buttons, labels, and reduced-motion support
- No framework, package manager, or build step required

## Project files

```text
NovaCart/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

1. Download and extract the ZIP.
2. Open `index.html` in a browser.
3. An internet connection is needed for Google Fonts and remote Unsplash product images.

You can also use VS Code with the Live Server extension for a local preview.

## Publish with GitHub Pages

1. Sign in to GitHub and create a **new public repository** named `novacart` (or any name you prefer).
2. Extract the ZIP on your computer.
3. Open the repository and select **Add file → Upload files**.
4. Upload `index.html`, `style.css`, `script.js`, and `README.md` from the extracted folder. Make sure `index.html` is at the repository root, not inside an extra nested folder.
5. Commit the files to the `main` branch.
6. In your repository, open **Settings → Pages**.
7. Under **Build and deployment**, select **Deploy from a branch**.
8. Select branch `main` and folder `/(root)`, then click **Save**.
9. Wait for GitHub Pages to publish the site. Your URL will usually look like:
   `https://YOUR-USERNAME.github.io/novacart/`

If you name the repository `YOUR-USERNAME.github.io`, the site URL will instead be:
`https://YOUR-USERNAME.github.io/`

## Customize the store

- **Store name:** Find `NovaCart` / `nova` in `index.html` and update the visible branding.
- **Products:** Edit the `PRODUCTS` array at the top of `script.js`. Each item has an `id`, `name`, `category`, `price`, `tag`, `rating`, `reviews`, `image`, and `description`.
- **Categories:** Keep product categories consistent with the options in `index.html`.
- **Colors and styling:** Edit CSS variables near the top of `style.css`.
- **Currency:** The demo currently displays prices in USD. Change the `money()` function in `script.js` to use a different currency if needed.

## Important limitations

This is a **front-end demo**, not a complete production commerce backend.

- Cart and wishlist data are saved in the visitor's browser only.
- The checkout is a demonstration and does not process payment, send orders, or securely store customer information.
- The newsletter form does not send emails.
- Product photos are loaded from external Unsplash URLs and need an internet connection.

For real orders, payment processing, customer accounts, inventory, and order management, connect a secure backend or commerce provider. Never place secret API keys in front-end files or a public GitHub repository.

## License

You may adapt this starter project for your own learning or storefront. Check the terms of any third-party images or services you use before launching commercially.
