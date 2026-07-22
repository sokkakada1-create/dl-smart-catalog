const $ = selector => document.querySelector(selector);

function money(value){
  return new Intl.NumberFormat("en-US", {
    style:"currency",
    currency:SETTINGS.currency,
    maximumFractionDigits:2
  }).format(value);
}

function renderProducts(){
  const grid = $("#productGrid");
  grid.innerHTML = PRODUCTS.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-body">
        <span class="product-code">${product.id}</span>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-meta">${product.size}<br>${product.material}</div>
        <div class="product-footer">
          <strong class="price">${money(product.price)}</strong>
          <button class="detail-btn" type="button" data-product="${product.id}">មើលលម្អិត</button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".detail-btn").forEach(button => {
    button.addEventListener("click", () => openModal(button.dataset.product));
  });
}

function renderPortfolio(){
  const grid = $("#portfolioGrid");
  grid.innerHTML = PRODUCTS.map(product => `
    <article class="portfolio-item">
      <img src="${product.image}" alt="${product.name}">
      <div class="portfolio-label">${product.name}</div>
    </article>
  `).join("");
}

function openModal(id){
  const product = PRODUCTS.find(item => item.id === id);
  if(!product) return;

  $("#modalImage").src = product.image;
  $("#modalImage").alt = product.name;
  $("#modalId").textContent = product.id;
  $("#modalTitle").textContent = product.name;
  $("#modalDescription").textContent = product.description;
  $("#modalSize").textContent = product.size;
  $("#modalMaterial").textContent = product.material;
  $("#modalPrice").textContent = money(product.price);

  const message = encodeURIComponent(
    `Hello DL Advertising & Printing, I want a quotation for ${product.id} - ${product.name}`
  );

  $("#quoteBtn").href = `https://t.me/${SETTINGS.telegramUsername}?text=${message}`;
  $("#modal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  $("#modal").classList.add("hidden");
  document.body.style.overflow = "";
}

let currentShowcase = 0;
let showcaseTimer = null;
const SHOWCASE_DELAY = 5000;

function showShowcase(index){
  if(!PRODUCTS.length) return;

  currentShowcase = (index + PRODUCTS.length) % PRODUCTS.length;
  const product = PRODUCTS[currentShowcase];
  const image = $("#showcaseImage");

  image.classList.add("changing");
  setTimeout(() => {
    image.src = product.image;
    image.alt = product.name;
    $("#showcaseCode").textContent = product.id;
    $("#showcaseTitle").textContent = product.name;
    $("#showcaseDetailBtn").dataset.product = product.id;
    image.classList.remove("changing");
    renderShowcaseThumbs();
  }, 170);
}

function renderShowcaseThumbs(){
  const holder = $("#showcaseThumbs");
  holder.innerHTML = PRODUCTS.slice(0,6).map((product,index) => `
    <button class="showcase-thumb ${index === currentShowcase ? "active" : ""}"
      type="button"
      data-index="${index}"
      aria-label="${product.name}">
      <img src="${product.image}" alt="${product.name}">
    </button>
  `).join("");

  holder.querySelectorAll(".showcase-thumb").forEach(button => {
    button.addEventListener("click", () => {
      showShowcase(Number(button.dataset.index));
      restartShowcase();
    });
  });
}

function restartShowcase(){
  clearInterval(showcaseTimer);
  showcaseTimer = setInterval(() => showShowcase(currentShowcase + 1), SHOWCASE_DELAY);
}

function setupShowcase(){
  showShowcase(0);
  restartShowcase();

  $("#showcasePrev").addEventListener("click", () => {
    showShowcase(currentShowcase - 1);
    restartShowcase();
  });

  $("#showcaseNext").addEventListener("click", () => {
    showShowcase(currentShowcase + 1);
    restartShowcase();
  });

  $("#showcaseDetailBtn").addEventListener("click", event => {
    openModal(event.currentTarget.dataset.product);
  });

  let touchStartX = 0;
  const frame = document.querySelector(".showcase-main");
  frame.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX;
  }, {passive:true});

  frame.addEventListener("touchend", event => {
    const delta = event.changedTouches[0].screenX - touchStartX;
    if(Math.abs(delta) < 45) return;
    showShowcase(currentShowcase + (delta < 0 ? 1 : -1));
    restartShowcase();
  }, {passive:true});
}

function setupContact(){
  const telegram = `https://t.me/${SETTINGS.telegramUsername}`;
  $("#telegramLink").href = telegram;
  $("#facebookLink").href = SETTINGS.facebookUrl;
  $("#phoneLink").href = `tel:${SETTINGS.phone}`;
  $("#quickTelegram").href = telegram;
  $("#quickFacebook").href = SETTINGS.facebookUrl;
  $("#quickPhone").href = `tel:${SETTINGS.phone}`;
}

$("#modal").addEventListener("click", event => {
  if(event.target.dataset.close === "true") closeModal();
});

document.addEventListener("keydown", event => {
  if(event.key === "Escape") closeModal();
});

$("#menuButton").addEventListener("click", () => {
  $("#mainNav").classList.toggle("open");
});

$("#mainNav").querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => $("#mainNav").classList.remove("open"));
});

$("#year").textContent = new Date().getFullYear();

setupContact();
renderProducts();
renderPortfolio();
setupShowcase();
