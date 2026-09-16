
function startSlider(sliderClass) {

    const slides = document.querySelectorAll("." + sliderClass + " img");

    let current = 0;

    setInterval(() => {

        // 今の画像を消す
        slides[current].style.opacity = 0;

        // 次の画像へ
        current++;

        // 4枚目の次は1枚目
        if (current >= slides.length) {
            current = 0;
        }

        // 次の画像を表示
        slides[current].style.opacity = 1;

    }, 3000);
}


// PC
startSlider("pc_slider");

// スマホ
startSlider("sp_slider");






const area = document.getElementById("spot-list");

// spotsからランダムに15件選ぶ
const randomSpots = [...spots]
    .sort(() => Math.random() - 0.5)
    .slice(0, 15);

randomSpots.forEach(spot => {

    area.innerHTML += `
        <div class="indexcard">

            <ul>
                <li><img src="img/Ellipse 63.jpg"></li>
                <li><h4>${spot.timei}</h4></li>
            </ul>

            <img src="${spot.image}" class="spotinimg" loading="lazy">

            <label class="like">
                <input type="checkbox">
                <span></span>
            </label>

            <a href="#">↧</a>

            <p class="spotname">${spot.name}</p>

            <p class="spotintext">${spot.short}</p>

        </div>
    `;

});


// カードを取得
let cards = Array.from(document.querySelectorAll(".indexcard"));

// カードを複製して後ろに追加
cards.forEach(card => {
    const clone = card.cloneNode(true);
    area.appendChild(clone);
});

// 複製後のカードを再取得
cards = Array.from(document.querySelectorAll(".indexcard"));

let currentIndex = 0;

// 中央のカードを判定
function updateCenter() {

    const listCenter = area.getBoundingClientRect().left
        + area.clientWidth / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach(card => {

        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;

        const distance = Math.abs(listCenter - cardCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
        }
    });

    cards.forEach(card => {
        card.classList.remove("center");
    });

    if (closestCard) {
        closestCard.classList.add("center");
    }
}

area.addEventListener("scroll", updateCenter);


// 自動スライド
function autoSlide() {

    currentIndex++;

    // 124枚を超えたら最初に戻る
    if (currentIndex >= cards.length) {
        currentIndex = 0;
    }

    const card = cards[currentIndex];

    const listCenter = area.clientWidth / 2;
    const cardCenter =
        card.offsetLeft + card.offsetWidth / 2;

    area.scrollTo({
        left: cardCenter - listCenter,
        behavior: "smooth"
    });
}

setInterval(autoSlide, 3000);