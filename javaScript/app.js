const cardContainer = document.querySelector("#cardContainer");
let productImg;
let productTitle;
let productPrice;
let productBtn;

let btnArray;

fetch("/products.json")
	.then((response) => response.json())
	.then((data) => drawSite(data));

let drawSite = (obj) => {
	for (let i = 0; i < obj.products.length; i++) {
		let img = document.createElement("img");
		img.className = "productImg";
		let h3 = document.createElement("h3");
		h3.className = "productTitle";
		let p = document.createElement("p");
		p.className = "productPrice";
		let btn = document.createElement("button");
		btn.className = "btn";
		btn.innerText = "בדוק הנחה";
		let card = document.createElement("div");
		card.className = "card";
		let containerArr = [img, h3, p, btn];
		containerArr.forEach((element) => {
			card.appendChild(element);
		});
		cardContainer.appendChild(card);
	}
	productImg = document.querySelectorAll(".productImg");
	productTitle = document.querySelectorAll(".productTitle");
	productPrice = document.querySelectorAll(".productPrice");
	productBtn = document.querySelectorAll(".btn");
	let count = 0;
	obj.products.forEach((data) => {
		for (const [key, value] of Object.entries(data)) {
			switch (key) {
				case "img":
					productImg[count].src = value;
					break;
				case "name":
					productTitle[count].innerHTML = value;
					break;
				case "price":
					productPrice[count].innerHTML = value;
					break;

				default:
					"";
					break;
			}
		}
		count++;
	});
	setTimeout(() => {
		cardContainer.style.opacity = 1;
	}, 500);
};

document.addEventListener("click", btnClicked);
let message = (json, evt) => {
	console.log(json);
	if (evt.path[1].innerHTML.includes("אבטיח")) {
		alert(`יש לנו הנחה של ${json.watermelon} על המוצר! `);
	} else if (evt.path[1].innerHTML.includes("תפוח עץ")) {
		alert(`יש לנו הנחה של ${json.apple} על המוצר! `);
	} else {
		alert(`אין לנו היום הנחה על המוצר הזה, אבל מי יודע מה יהיה מחר 😃 `);
	}
};
function btnClicked(event) {
	let element = event.target;
	let json;
	if (element.classList[0] === "btn") {
		fetch("/discount.json")
			.then((response) => response.json())
			.then((data) => message(data, event));
	}
}
