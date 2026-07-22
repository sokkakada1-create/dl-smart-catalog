let currentLang = "km";
let activeCategory = "all";

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const categoryList = $("#categoryList");
const productGrid = $("#productGrid");
const searchInput = $("#searchInput");
const sortSelect = $("#sortSelect");
const resultCount = $("#resultCount");
const emptyState = $("#emptyState");
const modal = $("#modal");

function t(obj){ return obj[currentLang] || obj.en || ""; }
function money(value){
  return new Intl.NumberFormat("en-US",{style:"currency",currency:SETTINGS.currency,maximumFractionDigits:2}).format(value);
}
function renderCategories(){
  categoryList.innerHTML = CATEGORIES.map(c => `<button class="category-btn ${c.id===activeCategory?"active":""}" data-id="${c.id}">${c.icon} ${c[currentLang]}</button>`).join("");
  categoryList.querySelectorAll("button").forEach(btn => btn.addEventListener("click",()=>{
    activeCategory = btn.dataset.id;
    renderCategories();
    renderProducts();
  }));
}
function filteredProducts(){
  const q = searchInput.value.trim().toLowerCase();
  let list = PRODUCTS.filter(p=>{
    const categoryMatch = activeCategory==="all" || p.category===activeCategory;
    const haystack = [p.id,...Object.values(p.name),...Object.values(p.description),...Object.values(p.material),p.size].join(" ").toLowerCase();
    return categoryMatch && haystack.includes(q);
  });
  if(sortSelect.value==="priceAsc") list.sort((a,b)=>a.price-b.price);
  if(sortSelect.value==="priceDesc") list.sort((a,b)=>b.price-a.price);
  if(sortSelect.value==="name") list.sort((a,b)=>t(a.name).localeCompare(t(b.name)));
  return list;
}
function renderProducts(){
  const list = filteredProducts();
  const countText = currentLang==="km" ? `${list.length} ផលិតផល` : currentLang==="zh" ? `${list.length} 个产品` : `${list.length} products`;
  resultCount.textContent = countText;
  emptyState.classList.toggle("hidden", list.length>0);
  productGrid.innerHTML = list.map(p=>`
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${p.image}" alt="${t(p.name)}">
        <span class="badge">${t(p.badge)}</span>
      </div>
      <div class="product-body">
        <span class="product-code">${p.id}</span>
        <h3 class="product-title">${t(p.name)}</h3>
        <div class="product-meta">${p.size}<br>${t(p.material)}</div>
        <div class="product-footer">
          <strong class="price">${money(p.price)}</strong>
          <button class="detail-btn" data-product="${p.id}">
            ${currentLang==="km"?"មើលលម្អិត":currentLang==="zh"?"查看详情":"Details"}
          </button>
        </div>
      </div>
    </article>`).join("");
  productGrid.querySelectorAll(".detail-btn").forEach(btn=>btn.addEventListener("click",()=>openModal(btn.dataset.product)));
}
function openModal(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  $("#modalImage").src = p.image;
  $("#modalImage").alt = t(p.name);
  $("#modalId").textContent = p.id;
  $("#modalTitle").textContent = t(p.name);
  $("#modalDescription").textContent = t(p.description);
  $("#modalSize").textContent = p.size;
  $("#modalMaterial").textContent = t(p.material);
  $("#modalPrice").textContent = money(p.price);
  const msg = encodeURIComponent(`Hello DL Advertising & Printing, I want a quotation for ${p.id} - ${t(p.name)}`);
  $("#quoteBtn").href = `https://t.me/${SETTINGS.telegramUsername}?text=${msg}`;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeModal(){
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}
function applyLanguage(){
  document.documentElement.lang = currentLang;
  $$("[data-km][data-en][data-zh]").forEach(el=>el.textContent=el.dataset[currentLang]);
  $$(".language-switcher button").forEach(btn=>btn.classList.toggle("active",btn.dataset.lang===currentLang));
  searchInput.placeholder = currentLang==="km" ? "ស្វែងរកផលិតផល..." : currentLang==="zh" ? "搜索产品..." : "Search products...";
  renderCategories();
  renderProducts();
}
function setupContacts(){
  $("#telegramLink").href = `https://t.me/${SETTINGS.telegramUsername}`;
  $("#facebookLink").href = SETTINGS.facebookUrl;
  $("#phoneLink").href = `tel:${SETTINGS.phone}`;
}
$$(".language-switcher button").forEach(btn=>btn.addEventListener("click",()=>{
  currentLang=btn.dataset.lang;
  applyLanguage();
}));
searchInput.addEventListener("input",renderProducts);
sortSelect.addEventListener("change",renderProducts);
modal.addEventListener("click",e=>{if(e.target.dataset.close==="true")closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
$("#year").textContent = new Date().getFullYear();
setupContacts();
applyLanguage();
