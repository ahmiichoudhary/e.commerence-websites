const products=[
{id:1,name:"Utility Crossbody",category:"Wear",price:4200,tag:"THE DAILY",rating:"★★★★★",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",desc:"Hands-free and ready to go."},
{id:2,name:"Studio Headphones",category:"Tech",price:8900,tag:"HOT DROP",rating:"★★★★★",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",desc:"Tune the noise out."},
{id:3,name:"Concrete Form Vase",category:"Space",price:3100,tag:"NEW",rating:"★★★★☆",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80",desc:"A sculptural little statement."},
{id:4,name:"Everyday Street Sneaker",category:"Wear",price:7600,tag:"FAN FAVORITE",rating:"★★★★★",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",desc:"Comfort with some attitude."},
{id:5,name:"Pocket Sound Speaker",category:"Tech",price:5600,tag:"SMALL BUT LOUD",rating:"★★★★☆",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80",desc:"Take your soundtrack outside."},
{id:6,name:"Soft Form Throw",category:"Space",price:4800,tag:"SLOW DOWN",rating:"★★★★★",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80",desc:"For nights in and slow starts."},
{id:7,name:"Canvas Everyday Tote",category:"Wear",price:2600,tag:"UNDER 3K",rating:"★★★★☆",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80",desc:"Carry your whole little world."},
{id:8,name:"Desk Glow Lamp",category:"Space",price:3900,tag:"GOOD LIGHT",rating:"★★★★★",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",desc:"Light for late-night ideas."}
];
const $=s=>document.querySelector(s),grid=$("#productGrid"),drawer=$("#drawer"),shade=$("#shade"),toast=$("#toast");
let category="All",cart=JSON.parse(localStorage.getItem("urbanloom-bag")||"[]"),toastTimer;
const money=n=>"Rs. "+new Intl.NumberFormat("en-PK").format(n);
function ping(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200)}
function renderProducts(){
 const query=$("#searchInput").value.trim().toLowerCase();
 let list=products.filter(p=>(category==="All"||p.category===category)&&`${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(query));
 if($("#sortSelect").value==="low")list.sort((a,b)=>a.price-b.price);
 if($("#sortSelect").value==="high")list.sort((a,b)=>b.price-a.price);
 grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-img"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="tag">${p.tag}</span><button class="add-btn" data-add="${p.id}">＋ ADD TO BAG</button></div><div class="product-info"><div><h3>${p.name}</h3><p>${p.category.toUpperCase()} / OBJECT ${String(p.id).padStart(3,"0")}</p></div><span class="price">${money(p.price)}</span></div><div class="rating">${p.rating} <span style="color:#888"> · community pick</span></div></article>`).join("");
 $("#emptyState").hidden=!!list.length;
}
function persist(){localStorage.setItem("urbanloom-bag",JSON.stringify(cart))}
function add(id){const found=cart.find(i=>i.id===id);if(found)found.qty++;else cart.push({id,qty:1});persist();renderCart();ping("Added to your bag. Good choice.")}
function qty(id,d){const item=cart.find(i=>i.id===id);if(!item)return;item.qty+=d;if(item.qty<=0)cart=cart.filter(i=>i.id!==id);persist();renderCart()}
function renderCart(){
 const count=cart.reduce((n,i)=>n+i.qty,0),total=cart.reduce((n,i)=>n+products.find(p=>p.id===i.id).price*i.qty,0);
 $("#cartCount").textContent=count;$("#drawerCount").textContent=`[${count}]`;$("#subtotal").textContent=money(total);$("#checkoutTotal").textContent=money(total);
 $("#cartEmpty").hidden=count!==0;$("#cartBottom").hidden=count===0;
 $("#cartItems").innerHTML=cart.map(i=>{const p=products.find(p=>p.id===i.id);return `<article class="cart-row"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><p>${money(p.price)}</p><div class="qty"><button data-qty="${p.id}" data-d="-1">−</button><span>${i.qty}</span><button data-qty="${p.id}" data-d="1">＋</button></div><button class="remove" data-remove="${p.id}">REMOVE</button></div><span class="row-price">${money(p.price*i.qty)}</span></article>`}).join("");
}
function openBag(){drawer.classList.add("open");shade.classList.add("open");drawer.setAttribute("aria-hidden","false");document.body.classList.add("lock")}
function closeBag(){drawer.classList.remove("open");shade.classList.remove("open");drawer.setAttribute("aria-hidden","true");document.body.classList.remove("lock")}
function openCheckout(){if(!cart.length){ping("Your bag is empty. Go explore.");return}closeBag();$("#checkoutModal").classList.add("open");document.body.classList.add("lock");$("#checkoutForm").hidden=false;$("#orderSuccess").hidden=true}
function closeCheckout(){$("#checkoutModal").classList.remove("open");document.body.classList.remove("lock")}
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(b)add(Number(b.dataset.add))});
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;category=b.dataset.filter;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
document.querySelectorAll(".cat-card").forEach(b=>b.addEventListener("click",()=>{category=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter===category));renderProducts();$("#shop").scrollIntoView({behavior:"smooth"})}));
$("#searchInput").addEventListener("input",renderProducts);$("#sortSelect").addEventListener("change",renderProducts);
$("#searchToggle").addEventListener("click",()=>{$("#shop").scrollIntoView({behavior:"smooth"});$("#searchInput").focus()});
$("#openCart").addEventListener("click",openBag);$("#closeCart").addEventListener("click",closeBag);$("#continueShopping").addEventListener("click",closeBag);shade.addEventListener("click",closeBag);
$("#cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(b)qty(Number(b.dataset.qty),Number(b.dataset.d));if(r){cart=cart.filter(i=>i.id!==Number(r.dataset.remove));persist();renderCart()}});
$("#checkoutBtn").addEventListener("click",openCheckout);$("#closeCheckout").addEventListener("click",closeCheckout);$("#checkoutModal").addEventListener("click",e=>{if(e.target===$("#checkoutModal"))closeCheckout()});
$("#checkoutForm").addEventListener("submit",e=>{e.preventDefault();$("#checkoutForm").hidden=true;$("#orderSuccess").hidden=false});
$("#finishOrder").addEventListener("click",()=>{cart=[];persist();renderCart();closeCheckout();ping("Demo complete. Thanks for stopping by.")});
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsletterMessage").textContent="You're on the list (demo). Stay curious.";$("#emailInput").value=""});
$("#menuToggle").addEventListener("click",()=>$("#nav").classList.toggle("open"));$("#nav").querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeBag();closeCheckout();$("#nav").classList.remove("open")}});
$("#year").textContent=new Date().getFullYear();renderProducts();renderCart();
