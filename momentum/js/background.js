const IMAGE_PATH = "img/";
const images = [
    "3.jpg", "5.jpg", "6.jpg", "7.jpg", "10.jpg"
    , "11.jpg", "12.jpg", "13.jpg", "14.jpg"
    , "15.jpg", "16.jpg", "17.jpg", "18.jpg"
    , "21.jpg", "22.jpg", "24.jpg"
];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("div");

bgImage.className = "bgImage";
bgImage.style.backgroundImage = `url(${IMAGE_PATH}${chosenImage})`;

document.body.appendChild(bgImage);