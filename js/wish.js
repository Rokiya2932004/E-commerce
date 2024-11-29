setTimeout(() => {
  document.querySelector(".loading").style.visibility = "hidden";
}, 500);

let heart = document.querySelectorAll(".favHeart");
let noWish = document.querySelector(".noWish");
let clearWish = document.querySelector(".clearWish");
let WishList = JSON.parse(localStorage.getItem("WishList")) || [];
// let numberPro = document.querySelector(".numListWish");
// console.log(numberPro.children[0].textContent);

if (WishList.length > 0) {
  noWish.classList.add("d-none");
  clearWish.classList.remove("d-none");
  displayProduct();
} else {
  noWish.classList.remove("d-none");
  clearWish.classList.add("d-none");
}

function displayProduct() {
  let wish_list = ``;
  for (let i = 0; i < WishList.length; i++) {
    wish_list += `
        <li class="row d-flex justify-content-between py-3 align-items-center border-1 border-bottom">
            <div class="item-details col-4 d-flex flex-column flex-md-row align-items-center text-center text-md-start">
                <div class="img-cart-container pe-3">
                    <img src="../${WishList[i].image}" style="width:100px">
                </div>
                <div class="item-text-info">
                    <h5>${WishList[i].name}</h5>
                </div>
            </div>
            <div class="col-4 m-0 p-0">${WishList[i].price}</div>
            <div class="col-4 d-flex justify-content-center">
                <div class="ms-5 bg-danger d-flex justify-content-center align-items-center rounded-4" style="width:60px; height:50px;">
                    <i class="fa-solid fa-heart-crack fa-xl" style="color: #fff;" data-id="${i}"></i>
                </div>
            </div>
        </li>`;
  }
  document.querySelector(".wishlist").innerHTML = wish_list;
  document.querySelectorAll(".fa-heart-crack").forEach(function (icon) {
    icon.style.cursor = "pointer";
    icon.addEventListener("click", function (e) {
      let id = e.target.getAttribute("data-id");
      deleteWish(id);
    });
  });
}


function isItemInWishList(proData) {
  return WishList.some(function (item) {
    return (
      item.image === proData.image &&
      item.name === proData.name &&
      item.price === proData.price
    );
  });
}

function deleteWish(id) {
  WishList.splice(id, 1);
  localStorage.setItem("WishList", JSON.stringify(WishList));
  displayProduct();
  if (WishList.length === 0) {
    noWish.classList.remove("d-none");
    clearWish.classList.add("d-none");
  }
}

function deleteAllWishes() {
  WishList = [];
  localStorage.setItem("WishList", JSON.stringify(WishList));
  displayProduct();
  noWish.classList.remove("d-none");
  clearWish.classList.add("d-none");
}

clearWish.addEventListener("click", function () {
  deleteAllWishes();
});

// let HeartIcon = document.querySelectorAll(".HeartIcon");
heart.forEach(function (favHeart) {
  favHeart.style.cursor = "pointer";
  favHeart.addEventListener("click", function (e) {
    let favItem = e.target.closest(".Fav-item");
    if (favItem) {
      e.target.classList.toggle("text-danger");
      // HeartIcon.closest(".HeartIcon .favHeart")
      addWishItems(favItem);
    }
  });
});