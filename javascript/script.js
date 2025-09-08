// load categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
};
// load plants by category
const loadCategory = (id) => {
  let url = ""
  if (id === "all") {
    url = "https://openapi.programming-hero.com/api/plants";
  } else {
    url = `https://openapi.programming-hero.com/api/category/${id}`;
  }
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayCategory(data.plants));
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
          <h3 class="font-semibold text-lg">${tree.name}</h3>
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
        <button class="mt-3 bg-[#17803D] text-white py-2 rounded-3xl hover:bg-green-300 hover:text-black transition">
          Add to Cart
        </button>
      </div>
    `;
    treeContainer.appendChild(card);
  });
};
// Hover and active
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
loadCategories();
