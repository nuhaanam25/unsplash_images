const accessKey = "ys9HIn8ZSRzMtkkdTyHOaI6yf1c_NvNCqtwE9d3glLY";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;



async function searchImages() {
    keyword = searchBox.value;
     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

     const response = await fetch(url);
     const data = await response.json();

     if (page === 1) {
        searchResult.innerHTML = "";
     }
     console.log(data);

     const results = data.results;

     results.map((result) => {
        const imageContainer = document.createElement("div");
        imageContainer.className = "image-item";
        
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description || "Image";
        image.addEventListener("click", () => {
            openModal(result.urls.regular);
        });
        
        const description = document.createElement("p");
        description.className = "image-description";
        description.textContent = result.alt_description || result.description || "No description";
        
        imageContainer.appendChild(image);
        imageContainer.appendChild(description);
        searchResult.appendChild(imageContainer);
     });
     showMoreBtn.style.display = "block";

}
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});
showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.querySelector(".close");

function openModal(imageSrc) {
    modal.style.display = "flex";
    modalImage.src = imageSrc;
}

function closeModal() {
    modal.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
