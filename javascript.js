const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click",function(){

    hamburger.classList.toggle("active");

    nav.classList.toggle("active");

    overlay.classList.toggle("active");

});
overlay.addEventListener("click",function(){

    hamburger.classList.remove("active");

    nav.classList.remove("active");

    overlay.classList.remove("active");

});


//spot
let category = [
    "食べ物",
    "歴史",
    "観光",
    "イベント"
];

function showSpots(category){

    const area = document.getElementById("item_ul");

    area.innerHTML = "";

    spots
        .filter(spot => spot.category === category)
        .forEach(spot => {

                        area.innerHTML += `
                <div class="card">
                    <ul>
                        <li><img src="img/Ellipse 67.png"></li>
                        <li><h3>${spot.timei}</h3></li>
                    </ul>

                    <img src="${spot.image}" class="spotimg" data-id="${spot.id}">

                    <label class="like">
                        <input type="checkbox">
                        <span></span>
                    </label>

                    <a href="#">↧</a>

                    <p class="spotname">${spot.name}</p>

                    <p class="spottext">${spot.short}</p>

                    <button class="detail-btn" data-id="${spot.id}">
                        もっと見る
                    </button>
                </div>
            `;

        });

}
const buttons = document.querySelectorAll("#category li");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        showSpots(button.dataset.category);

    });

});
showSpots("観光");

document.addEventListener("click", (e) => {

    if (
        e.target.classList.contains("detail-btn") ||
        e.target.classList.contains("spotimg")
    ) {

        const id = Number(e.target.dataset.id);
        const item = spots.find(spot => spot.id === id);

        document.getElementById("modal-img").src = item.image;
        document.getElementById("modal-name").textContent = item.name;
        document.getElementById("modal-text").textContent = item.text;
        document.getElementById("modal-post").textContent = item.post;
        document.getElementById("modal-address").textContent = item.address;
        document.getElementById("modal-tell").textContent = item.tell;
        document.getElementById("modal-map").innerHTML = item.map;
        document.getElementById("homepage").innerHTML =
    `<a href="${item.homepage}" target="_blank">ホームページ</a>`;

        document.getElementById("item_overlay").classList.add("active");
    }

});


const item_overlay = document.getElementById("item_overlay");
const modal = document.getElementById("modal");
const close = document.getElementById("close");

// ×ボタン
close.addEventListener("click", () => {
    item_overlay.classList.remove("active");
});

// 背景
item_overlay.addEventListener("click", () => {
    item_overlay.classList.remove("active");
});

// モーダル内
modal.addEventListener("click", (e) => {
    e.stopPropagation();
});


