const items = [
    {
        title: "Ириски",
        price: 100,
        img: "./img/ириски.jpg",
    },
    {
        title: "Банановый хлеб",
        price: 300,
        img: "./img/bananaBread.jpg",
    },
    {
        title: "Пирожное",
        price: 150,
        img: "./img/cake.jpg",
    },
    {
        title: "Шоколадные конфеты",
        price: 200,
        img: "./img/candy.jpg",
    },
    {
        title: "Вишня в шоколаде",
        price: 400,
        img: "./img/cherries.jpg",
    },
    {
        title: "Шоколад",
        price: 200,
        img: "./img/chocolate.jpg",
    },
    {
        title: "Синнабоны",
        price: 80,
        img: "./img/cinnamon.jpg",
    },
    {
        title: "Печенье",
        price: 90,
        img: "./img/cookies.jpg",
    },
    {
        title: "Круассаны",
        price: 120,
        img: "./img/croissant.jpg",
    },
    {
        title: "Пончики",
        price: 60,
        img: "./img/donuts.jpg",
    },
    {
        title: "Макарунсы",
        price: 300,
        img: "./img/macaroons.jpg",
    },
    {
        title: "Блинчики",
        price: 100,
        img: "./img/pancakes.jpg",
    },
];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });
    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
    const { title, img, price } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector("h1").textContent = title;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price} р`;

    return item;
}

const searchInput = document.querySelector("#search-input");

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    renderItems(currentState);
    sortControl.selectedIndex = 0;
}

searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");
sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case "expensive": {
            currentState.sort((a, b) => b.price - a.price);
            break;
        }
        case "cheap": {
            currentState.sort((a, b) => a.price - b.price);
            break;
        }
        case "alphabet": {
            currentState.sort((a, b) => sortByAlphabet(a, b));
            break;
        }
    }
    renderItems(currentState);
});