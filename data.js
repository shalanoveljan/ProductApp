const dvProducts = document.getElementById("dvProducts");
const categoryList = document.getElementById("categoryList");
const wishListDdl = document.getElementById("wishListDdl");
const txtSearch = document.getElementById("txtSearch");

const PRODUCTS = [
  {
    id: 1,
    name: "Laptop",
    price: 999.99,
    desc: "lorem ipsum dot color",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 699.99,
    desc: "lorem ipsum dot color",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Headphones",
    price: 99.99,
    desc: "lorem ipsum dot color",
    category: "Electronics",
  },
  {
    id: 4,
    name: "T-shirt",
    price: 19.99,
    desc: "lorem ipsum dot color",
    category: "Clothing",
  },
  {
    id: 5,
    name: "Jeans",
    price: 49.99,
    desc: "lorem ipsum dot color",
    category: "Clothing",
  },
  {
    id: 6,
    name: "Backpack",
    price: 79.99,
    desc: "lorem ipsum dot color",
    category: "Accessories",
  },
  {
    id: 7,
    name: "Watch",
    price: 149.99,
    desc: "lorem ipsum dot color",
    category: "Accessories",
  },
  {
    id: 8,
    name: "Desk Lamp",
    price: 29.99,
    desc: "lorem ipsum dot color",
    category: "Home & Office",
  },
  {
    id: 9,
    name: "Coffee Mug",
    price: 9.99,
    desc: "lorem ipsum dot color",
    category: "Home & Office",
  },
  {
    id: 10,
    name: "Notebook",
    price: 4.99,
    desc: "lorem ipsum dot color",
    category: "Home & Office",
  },
];

const addUserEventListeners = () => {
  txtSearch.addEventListener("keyup", onFlySearch);
};

const addAllEventListeners = () => {
  addUserEventListeners();
};

const CARD_OBJECTS_KEYS = {
  allCategories: "allCategories",
};

let currentCategory = CARD_OBJECTS_KEYS.allCategories;


const onFlySearch = (e) => {
  let searchStr = e.target.value;
  let data = PRODUCTS.filter((product) => product.name.includes(searchStr));
  bindCards(data, currentCategory);
};

let wishlistArr = [];

const createCard = (data) => {
  let col4 = document.createElement("div");
  col4.className = "col-4 mb-3";
  let hfCardId = document.createElement("input");
  hfCardId.type = "hidden";
  hfCardId.id = data.id;
  let hfCardCategory = document.createElement("input");
  hfCardCategory.type = "hidden";
  hfCardCategory.id = data.category;
  let card = document.createElement("div");
  card.className = "card";
  let cardHeader = document.createElement("div");
  cardHeader.className =
    "card-header d-flex justify-content-between align-items-center";
  let h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.textContent = data.name;
  let i = document.createElement("i");
  i.className = "fa-regular fa-heart";
  if (wishlistArr.includes(data.name)) i.classList.add("fa-solid");
  i.addEventListener("click", () => {
    i.classList.toggle("fa-solid");
    addToWishList(data.name);
  });
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  let desc = document.createElement("p");
  desc.textContent = data.desc;
  let span = document.createElement("span");
  span.textContent = data.price;

  let cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex gap-3";

  let btnAddToCard = document.createElement("button");
  btnAddToCard.className = "btn btn-primary";
  btnAddToCard.textContent = "Add to card";
  btnAddToCard.addEventListener("click", () => {
    let quantity = document.getElementById(`txtQuantity${data.id}`).value;
    if (quantity > 0) console.log(`Name: ${data.name} \nQuantity: ${quantity}`);
  });
  let btnDecrease = document.createElement("button");
  btnDecrease.className = "btn btn-sm btn-outline-secondary";
  btnDecrease.textContent = "-";
  btnDecrease.addEventListener("click", () => {
    let inputElm = document.getElementById(`txtQuantity${data.id}`);
    if (inputElm.value > 0) inputElm.value--;
  });
  let inputQuantity = document.createElement("input");
  inputQuantity.type = "text";
  inputQuantity.className = "form-control w-25";
  inputQuantity.id = `txtQuantity${data.id}`;
  inputQuantity.value = 0;
  let btnIncrease = document.createElement("button");
  btnIncrease.className = "btn btn-sm btn-outline-secondary";
  btnIncrease.textContent = "+";
  btnIncrease.addEventListener("click", () => {
    let inputElm = document.getElementById(`txtQuantity${data.id}`);
    inputElm.value++;
  });

  col4.appendChild(card);
  col4.appendChild(hfCardId);
  col4.appendChild(hfCardCategory);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  cardHeader.appendChild(h5);
  cardHeader.appendChild(i);
  cardBody.appendChild(desc);
  cardBody.appendChild(span);
  cardFooter.appendChild(btnAddToCard);
  cardFooter.appendChild(btnDecrease);
  cardFooter.appendChild(inputQuantity);
  cardFooter.appendChild(btnIncrease);
  return col4;
};

const addToWishList = (name) => {
  if (wishlistArr.includes(name)) {
    wishlistArr = wishlistArr.filter((x) => x != name);
  } else {
    wishlistArr.push(name);
  }
  wishListDdl.innerHTML = "";
  wishlistArr.forEach((wish) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.className = "dropdown-item";
    a.href = "#";
    a.textContent = wish;
    li.appendChild(a);
    wishListDdl.appendChild(li);
  });
};
const bindCards = (cardData, category) => {
  dvProducts.innerHTML = "";
  if (category == CARD_OBJECTS_KEYS.allCategories) {
    cardData.forEach((data) => {
      let card = createCard(data);
      dvProducts.appendChild(card);
    });
  } else {
    cardData
      .filter((card) => card.category == category)
      .forEach((data) => {
        let card = createCard(data);
        dvProducts.appendChild(card);
      });
  }
};

const getCategories = (cardData) => {
  categoryList.innerHTML = "";
  let allCategories = document.createElement("li");
  allCategories.className = "list-group-item active";
  allCategories.textContent = "All Categories";
  categoryList.appendChild(allCategories);
  allCategories.addEventListener("click", (e) => {
    bindCards(cardData, CARD_OBJECTS_KEYS.allCategories);
    Array.from(categoryList.querySelectorAll("li")).forEach((x) => {
      x.classList.remove("active");
    });
    e.target.classList.add("active");
    currentCategory = CARD_OBJECTS_KEYS.allCategories;
  });
  let categoryArray = [];
  cardData.forEach((data) => {
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = data.category;
    li.addEventListener("click", (e) => {
      bindCards(cardData, data.category);
      Array.from(categoryList.querySelectorAll("li")).forEach((x) => {
        x.classList.remove("active");
      });
      e.target.classList.add("active");
      currentCategory = data.category;
    });
    if (!categoryArray.includes(data.category)) categoryList.appendChild(li);
    categoryArray.push(data.category);
  });
};
const onLoad = () => {
  bindCards(PRODUCTS, CARD_OBJECTS_KEYS.allCategories);
  getCategories(PRODUCTS);
  addAllEventListeners();
};
document.addEventListener("DOMContentLoaded", onLoad);