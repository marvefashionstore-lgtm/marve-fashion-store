const products=[
{name:"Elegant Pearl Bangles",cat:"Jewellery",price:1200,old:1600,off:20,rating:"4.8",img:"https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=90"},
{name:"Women's Rose Gold Watch",cat:"Watches",price:2550,old:3000,off:15,rating:"4.9",img:"https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=90"},
{name:"Diamond Necklace Set",cat:"Jewellery",price:1950,old:2390,off:18,rating:"4.7",img:"https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=90"},
{name:"Stylish Handbag",cat:"Bags",price:2300,old:2950,off:22,rating:"4.8",img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=90"},
{name:"Premium Sunglasses",cat:"Sunglasses",price:1250,old:1490,off:16,rating:"4.6",img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=90"},
{name:"Hair Accessories Set",cat:"Accessories",price:650,old:740,off:12,rating:"4.7",img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=90"},
{name:"Classic Pearl Necklace",cat:"Jewellery",price:1450,old:1750,off:17,rating:"4.8",img:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=90"},
{name:"Minimal Black Watch",cat:"Watches",price:2190,old:2700,off:19,rating:"4.8",img:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=90"}
];

let cart=JSON.parse(localStorage.getItem("marveCart")||"[]"),wishlist=[];

function money(n){return "৳"+n.toLocaleString("en-BD")}

function renderProducts(list=products){
 const grid=document.getElementById("productGrid");
 grid.innerHTML=list.map((p,i)=>`<article class="product">
 <div class="product-image">
 <img src="${p.img}" alt="${p.name}" loading="lazy">
 <span class="sale">-${p.off}%</span>
 <button class="heart" onclick="addWish(${i})">♡</button>
 </div>
 <div class="product-info">
 <h3>${p.name}</h3>
 <div class="stars">★★★★★ <span>(${p.rating})</span></div>
 <div class="price">${money(p.price)} <span class="old">${money(p.old)}</span></div>
 <button class="add" onclick="addCart(${i})">🛒 ADD TO CART</button>
 </div>
 </article>`).join("");
}

function addCart(i){
 cart.push(products[i]);
 localStorage.setItem("marveCart",JSON.stringify(cart));
 updateCounts();
 toast(products[i].name+" — Cart-এ যোগ হয়েছে");
}

function addWish(i){
 wishlist.push(products[i]);
 document.getElementById("wishCount").textContent=wishlist.length;
 toast("Wishlist-এ যোগ হয়েছে");
}

function updateCounts(){
 document.getElementById("cartCount").textContent=cart.length;
}

function openCart(){
 const box=document.getElementById("cartItems");
 const total=document.getElementById("cartTotal");

 if(!cart.length){
   box.innerHTML="<p>আপনার cart এখনো খালি।</p>";
   total.textContent="";
 }else{
   box.innerHTML=cart.map((p,i)=>`
   <div class="cart-line">
   <span>${p.name}</span>
   <b>${money(p.price)} <button onclick="removeCart(${i})">×</button></b>
   </div>`).join("");

   total.textContent="Total: "+money(cart.reduce((s,p)=>s+p.price,0));
 }

 document.getElementById("cartModal").classList.add("show");
}

function removeCart(i){
 cart.splice(i,1);
 localStorage.setItem("marveCart",JSON.stringify(cart));
 updateCounts();
 openCart();
}

function checkout(){
 if(!cart.length){
   toast("আগে একটি product cart-এ যোগ করুন");
   return;
 }

 const lines=cart.map(p=>`${p.name} — ${money(p.price)}`).join("%0A");
 const total=money(cart.reduce((s,p)=>s+p.price,0));

 window.open(
 "https://wa.me/8801712345678?text="+
 encodeURIComponent(
 "Hello MARVE, I want to order:%0A"+
 lines+
 "%0A%0ATotal: "+
 total+
 "%0AName:%0APhone:%0AAddress:"
 ),
 "_blank"
 );
}

function openAccount(){
 document.getElementById("accountModal").classList.add("show");
}

function openWishlist(){
 document.getElementById("wishText").textContent=
 wishlist.length?
 wishlist.map(x=>x.name).join(", "):
 "Your wishlist is empty.";

 document.getElementById("wishModal").classList.add("show");
}

function closeModal(id){
 document.getElementById(id).classList.remove("show");
}

function filterCategory(cat,btn){
 if(btn){
  document.querySelectorAll(".filter-row button")
  .forEach(x=>x.classList.remove("active"));

  btn.classList.add("active");
 }

 const list=cat==="All"?
 products:
 products.filter(p=>p.cat===cat);

 renderProducts(list);

 document.getElementById("shop")
 .scrollIntoView({behavior:"smooth"});
}

function searchProducts(){
 const q=document.getElementById("search")
 .value.toLowerCase().trim();

 renderProducts(
 q?
 products.filter(p=>
 (p.name+" "+p.cat)
 .toLowerCase()
 .includes(q)
 ):
 products
 );

 document.getElementById("shop")
 .scrollIntoView({behavior:"smooth"});
}

function toggleMenu(){
 document.getElementById("nav").classList.toggle("open");
}

function toast(msg){
 const t=document.getElementById("toast");
 t.textContent=msg;
 t.classList.add("show");

 setTimeout(
 ()=>t.classList.remove("show"),
 2200
 );
}

function subscribe(){
 const e=document.getElementById("email")
 .value.trim();

 toast(
 e?
 "Thanks for subscribing to MARVE!":
 "Please enter your email."
 );
}

updateCounts();
renderProducts();
