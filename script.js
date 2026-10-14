const PRODUCTS = [
  {id:1,name:"Studio Wireless Headphones",category:"Tech",price:79.00,tag:"BESTSELLER",rating:"4.9",reviews:128,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85",description:"Comfort-first sound for everyday listening."},
  {id:2,name:"Everyday Minimal Watch",category:"Style",price:64.00,tag:"POPULAR",rating:"4.8",reviews:96,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85",description:"A clean, timeless detail for every outfit."},
  {id:3,name:"Cloud Ceramic Mug Set",category:"Home",price:28.00,tag:"NEW",rating:"4.9",reviews:54,image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=85",description:"A calm start to your morning ritual."},
  {id:4,name:"Everywhere Everyday Tote",category:"Accessories",price:42.00,tag:"STAFF PICK",rating:"4.7",reviews:82,image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=85",description:"Room for the essentials and then some."},
  {id:5,name:"Pocket Bluetooth Speaker",category:"Tech",price:39.00,tag:"GREAT FIND",rating:"4.8",reviews:73,image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=85",description:"Small size, room-filling sound."},
  {id:6,name:"Soft Knit Everyday Throw",category:"Home",price:52.00,tag:"COZY PICK",rating:"4.9",reviews:61,image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",description:"A soft layer for slow evenings."},
  {id:7,name:"Classic Sun Frames",category:"Style",price:32.00,tag:"TRENDING",rating:"4.6",reviews:47,image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85",description:"An easy finishing touch for sunny days."},
  {id:8,name:"Daily Carry Crossbody",category:"Accessories",price:58.00,tag:"BESTSELLER",rating:"4.8",reviews:104,image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85",description:"Keep the little essentials close at hand."}
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const money = (value) => new Intl.NumberFormat("en-US", {style:"currency",currency:"USD"}).format(value);
const readStore = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } };
let cart = readStore("novacart-cart", []);
let wishlist = readStore("novacart-wishlist", []);
let showWishlist = false;
let toastTimer;

function saveState() {
  localStorage.setItem("novacart-cart", JSON.stringify(cart));
  localStorage.setItem("novacart-wishlist", JSON.stringify(wishlist));
}
function notify(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}
function productCard(product) {
  const wished = wishlist.includes(product.id);
  return `<article class="product-card">
    <div class="product-image-wrap">
      <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/600x700/eeefe9/343a31?text=NovaCart'">
      <span class="product-tag">${product.tag}</span>
      <button class="wish-button ${wished ? "active" : ""}" data-wish="${product.id}" aria-label="${wished ? "Remove from" : "Add to"} wishlist" aria-pressed="${wished}">${wished ? "♥" : "♡"}</button>
      <button class="quick-add" data-add="${product.id}">＋ Add to bag</button>
    </div>
    <div class="product-info"><div class="product-category">${product.category}</div><div class="product-title-row"><span class="product-title">${product.name}</span><span class="product-price">${money(product.price)}</span></div><div class="product-rating"><span>★★★★★</span> ${product.rating} (${product.reviews})</div></div>
  </article>`;
}
function renderProducts() {
  const search = $("#searchInput").value.trim().toLowerCase();
  const category = $("#categoryFilter").value;
  const sort = $("#sortFilter").value;
  let list = PRODUCTS.filter(p => (!showWishlist || wishlist.includes(p.id)) && (category === "All" || p.category === category) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search));
  if (sort === "low") list.sort((a,b)=>a.price-b.price);
  if (sort === "high") list.sort((a,b)=>b.price-a.price);
  if (sort === "name") list.sort((a,b)=>a.name.localeCompare(b.name));
  $("#productGrid").innerHTML = list.map(productCard).join("");
  $("#productGrid").classList.toggle("hidden", list.length === 0);
  $("#emptyState").classList.toggle("hidden", list.length !== 0);
  $("#resultsCount").textContent = `${list.length} product${list.length === 1 ? "" : "s"}${showWishlist ? " in your wishlist" : " to explore"}`;
  $("#wishlistToggle").setAttribute("aria-pressed", String(showWishlist));
  $("#wishlistToggle").style.color = showWishlist ? "#a43f45" : "";
}
function updateCounts() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  $("#cartCount").textContent = count;
  $("#drawerCartCount").textContent = `(${count})`;
  $("#wishlistCount").textContent = wishlist.length;
  $("#cartSubtotal").textContent = money(cart.reduce((sum,item)=>sum + PRODUCTS.find(p=>p.id===item.id).price*item.quantity,0));
}
function renderCart() {
  $("#cartItems").innerHTML = cart.map(item => {
    const p = PRODUCTS.find(product => product.id === item.id);
    if (!p) return "";
    return `<div class="cart-line"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${money(p.price)}</p><div class="quantity-control"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">＋</button></div><button class="remove-item" data-remove="${p.id}">Remove</button></div><strong>${money(p.price*item.quantity)}</strong></div>`;
  }).join("");
  const empty = cart.length === 0;
  $("#cartEmpty").classList.toggle("hidden", !empty);
  $("#cartItems").classList.toggle("hidden", empty);
  $("#cartFooter").classList.toggle("hidden", empty);
  updateCounts();
}
function addToCart(id) {
  const item = cart.find(item => item.id === id);
  if (item) item.quantity++;
  else cart.push({id,quantity:1});
  saveState(); renderCart(); notify(`${PRODUCTS.find(p=>p.id===id).name} added to your bag.`);
}
function toggleWishlist(id) {
  if (wishlist.includes(id)) { wishlist = wishlist.filter(item => item !== id); notify("Removed from wishlist."); }
  else { wishlist.push(id); notify("Saved to your wishlist."); }
  saveState(); renderProducts(); updateCounts();
}
function openCart() {
  $("#cartDrawer").classList.add("open");
  $("#overlay").classList.add("open");
  $("#cartDrawer").setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  $("#cartDrawer").classList.remove("open");
  $("#overlay").classList.remove("open");
  $("#cartDrawer").setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}
function resetFilters() {
  $("#searchInput").value = "";
  $("#categoryFilter").value = "All";
  $("#sortFilter").value = "featured";
  showWishlist = false;
  renderProducts();
}

$("#productGrid").addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  const wish = event.target.closest("[data-wish]");
  if (add) addToCart(Number(add.dataset.add));
  if (wish) toggleWishlist(Number(wish.dataset.wish));
});
$("#cartItems").addEventListener("click", event => {
  const qty = event.target.closest("[data-qty]");
  const remove = event.target.closest("[data-remove]");
  if (qty) {
    const item = cart.find(i => i.id === Number(qty.dataset.qty));
    if (item) item.quantity += Number(qty.dataset.delta);
    cart = cart.filter(i => i.quantity > 0);
    saveState(); renderCart();
  }
  if (remove) { cart = cart.filter(i => i.id !== Number(remove.dataset.remove)); saveState(); renderCart(); }
});
$("#searchInput").addEventListener("input", renderProducts);
$("#categoryFilter").addEventListener("change", renderProducts);
$("#sortFilter").addEventListener("change", renderProducts);
$("#clearFilters").addEventListener("click", resetFilters);
$("#resetSearch").addEventListener("click", resetFilters);
$$("[data-category]").forEach(button => button.addEventListener("click", () => {
  $("#categoryFilter").value = button.dataset.category;
  showWishlist = false;
  renderProducts();
  $("#shop").scrollIntoView({behavior:"smooth"});
}));
$("#wishlistToggle").addEventListener("click", () => {
  showWishlist = !showWishlist;
  $("#categoryFilter").value = "All";
  renderProducts();
  $("#shop").scrollIntoView({behavior:"smooth"});
  if (showWishlist && wishlist.length === 0) notify("Tap the heart on a product to save it here.");
});
$("#cartToggle").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);
$("#continueShopping").addEventListener("click", () => { closeCart(); $("#shop").scrollIntoView({behavior:"smooth"}); });
document.addEventListener("keydown", event => { if(event.key === "Escape") closeCart(); });

$("#checkoutButton").addEventListener("click", () => {
  if (!cart.length) return;
  const total = cart.reduce((sum,item)=>sum+PRODUCTS.find(p=>p.id===item.id).price*item.quantity,0);
  $("#checkoutSummary").innerHTML = `${cart.map(item=>{const p=PRODUCTS.find(x=>x.id===item.id);return `${item.quantity} × ${p.name} — ${money(p.price*item.quantity)}`;}).join("<br>")}<hr><strong>Demo total: ${money(total)}</strong>`;
  $("#checkoutDialog").showModal();
});
$("#closeCheckout").addEventListener("click", () => $("#checkoutDialog").close());
$("#checkoutForm").addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const orderCode = "NC-" + Math.random().toString(36).slice(2,8).toUpperCase();
  $("#checkoutDialog").close();
  closeCart();
  cart = [];
  saveState(); renderCart(); renderProducts();
  event.currentTarget.reset();
  notify(`Demo order ${orderCode} created locally. No payment was taken.`);
});
$("#newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  $("#newsletterMessage").textContent = "Thanks! This demo doesn't send or store emails.";
  event.currentTarget.reset();
});
$("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();