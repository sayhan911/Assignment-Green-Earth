// load categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
};
// load plants by category
const loadCategory = (id) => {
  let url = "";
  if (id === "all") {
    url = "https://openapi.programming-hero.com/api/plants";
  } else {
    url = `https://openapi.programming-hero.com/api/category/${id}`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayCategory(data.plants));
};
// load plant details
const loadPlantDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  plantDetails(data.plants);
};
// display plant details in modal
const plantDetails = (tree) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">${tree.name}</h2>
      <img src="${tree.image}" alt="${tree.name}" class="w-full h-60 object-cover rounded mb-3">
      <p class="mb-2"><span class="font-semibold">Category:</span> ${tree.category}</p>
      <p class="mb-2"><span class="font-semibold">Price:</span> ৳${tree.price}</p>
      <p class="text-gray-700 mb-2"><span class="font-semibold">Description:</span> ${tree.description}</p>
      
    `;
  document.getElementById("my_modal_1").showModal();
};
// display tree cards
const displayCategory = (trees) => {
  const treeContainer = document.getElementById("trees-container");
  treeContainer.innerHTML = "";

  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-lg shadow-md overflow-hidden flex flex-col";
    card.innerHTML = `
      <img src="${tree.image}" alt="${
      tree.tree_name
    }" class="w-full h-40 object-cover">
      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 onclick="loadPlantDetails(${
            tree.id
          })" class="font-semibold text-lg cursor-pointer hover:text-green-700 transform transition duration-300 ease-in-out">${
      tree.name
    }</h3>
          <p class="text-sm text-gray-600 mt-1">${tree.description.slice(
            0,
            50
          )}...</p>
        </div>
        <div class="flex items-center justify-between mt-3">
          <span class="text-green-700 text-xs bg-green-100 px-2 py-1 rounded-2xl">${
            tree.category
          }</span>
          <span class="font-bold">৳${tree.price}</span>
        </div>
        <button class="mt-3 bg-[#17803D] text-white py-2 rounded-3xl hover:bg-green-300 hover:text-black transform transition duration-300 ease-in-out">
          Add to Cart
        </button>
      </div>
    `;
    treeContainer.appendChild(card);
    const addBtn = card.querySelector("button");
    addBtn.onclick = () => addToCart(tree);
  });
};
// Hover and active of categories
const setActiveCategory = (clickedLi) => {
  const lis = document.querySelectorAll("#categories li");
  lis.forEach((li) => {
    li.classList.remove("bg-[#17803D]", "text-white");
    li.classList.add("hover:bg-green-200");
  });
  clickedLi.classList.add("bg-[#17803D]", "text-white");
  clickedLi.classList.remove("hover:bg-green-200");
};
// Display Categories
const displayCategories = (allCategories) => {
  const categoriesContainer = document.getElementById("categories");
  categoriesContainer.innerHTML = "";

  // All Trees option
  const allTrees = document.createElement("li");
  allTrees.className =
    "p-1.5 pl-2 rounded-sm cursor-pointer bg-[#17803D] text-white";
  allTrees.textContent = "All Trees";
  allTrees.addEventListener("click", () => {
    setActiveCategory(allTrees);
    loadCategory("all");
  });
  categoriesContainer.appendChild(allTrees);
  // others options
  allCategories.forEach((category) => {
    const li = document.createElement("li");
    li.className = "p-1.5 pl-2 rounded-sm cursor-pointer hover:bg-green-200";
    li.textContent = category.category_name;
    li.addEventListener("click", () => {
      setActiveCategory(li);
      loadCategory(category.id);
    });
    categoriesContainer.appendChild(li);
  });
  setActiveCategory(allTrees);
  loadCategory("all");
};
// cart functionality
const updateTotal = () => {
  let total = 0;
  const cartItems = document.getElementById("cart-items").children;

  for (const item of cartItems) {
    const priceText = item.querySelector("p").innerText;
    const price = Number(priceText.split(" ")[0].slice(1));
    total += price;
  }
  document.getElementById("cart-total").innerText = "৳" + total;
};
const addToCart = (tree) => {
  const cartItems = document.getElementById("cart-items");
  const li = document.createElement("li");
  li.className =
    "flex justify-between items-center bg-green-100 p-2 mb-2 rounded";
  li.innerHTML = `
    <div>
      <h2 class="text-sm font-medium mb-1">${tree.name}</h2>
      <p class="text-gray-500 text-xs">৳${tree.price} &#215; 1</p>
    </div>
    <div>
      <i class="fa-solid fa-xmark text-sm font-light text-gray-500 cursor-pointer"></i>
    </div>
  `;
  cartItems.appendChild(li);
  li.querySelector("i").onclick = () => {
    li.remove();
    updateTotal();
  };
  updateTotal();
  const modal = document.getElementById("my_modal_5");
  document.getElementById("cart-success-name").innerText = tree.name;
  modal.showModal();
};
loadCategories();
