setTimeout(() => {
  document.querySelector(".loading").style.visibility = "hidden";
}, 500);

$(document).ready(function () {
  $(".owl-carousel-deals").owlCarousel({
    items: 1,
    dots: false,
    nav: true,
    loop: true,
    autoplay: true,
    autoplaySpeedTimeout: 1000,
  });
});
$(document).ready(function () {
  $(".owl-carousel-macbook").owlCarousel({
    items: 1,
    nav: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
  });
});
$(".multiple-items").slick({
  centerMode: true,
  centerPadding: "60px",
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 1,
      },
    },
  ],
});
$(document).ready(function () {
  $(".owl-carousel-LatestReviews").owlCarousel({
    dots: false,
    nav: true,
    loop: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });
});
$(document).ready(function () {
  $(".owl-carousel-Recently-Viewed").owlCarousel({
    dots: false,
    nav: true,
    loop: true,
    autoplay: false,
    margin: 10,
    autoplaySpeed: 2000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 6,
      },
    },
  });
});
$(document).ready(function () {
  $(".owl-carousel-brand").owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: false,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      1000: {
        items: 2,
      },
    },
  });
});

window.addEventListener("scroll", function () {
  let navbar = document.querySelector(".nav-section");
  if (window.scrollY >= 123.66) {
    navbar.classList.replace("position-sticky", "position-fixed");
  } else {
    navbar.classList.replace("position-fixed", "position-sticky");
  }
});
//-------------- Start Logic ------------

let AddingCart = document.querySelectorAll(".Add-Cart .btn");
let ProductList_Cart = [];
if (JSON.parse(localStorage.getItem("ProductList_Cart"))) {
  ProductList_Cart = JSON.parse(localStorage.getItem("ProductList_Cart"));
} else {
  ProductList_Cart = [];
}

// Add Product Item
function addedProduct(item) {
  // console.log(item.children[0].children[0].getAttribute("src"));

  let imgSrc = item.children[0].children[0].getAttribute("src");
  let proData = {
    image: imgSrc,
    name: item.children[1].children[1].children[1].innerText,
    price: item.children[1].children[0].textContent,
    quantity: 1,
  };
  ProductList_Cart.push(proData);
  localStorage.setItem("ProductList_Cart", JSON.stringify(ProductList_Cart));
  // AddingCart.innerHTML = "Removing";
  item.children[2].children[0].innerHTML = "Remove Cart";
  item.children[2].classList.add("bg-danger");
}


function delete_prouduct(item) {
  let imgSrc = item.children[0].children[0].getAttribute("src");
  let indexToRemove = ProductList_Cart.findIndex(function (product) {
    return product.image === imgSrc;
  });
  if (indexToRemove !== -1) {
    ProductList_Cart.splice(indexToRemove, 1);
    localStorage.setItem("ProductList_Cart", JSON.stringify(ProductList_Cart));
  }
  item.children[2].children[0].innerHTML = "Add Cart";
  item.children[2].classList.remove("bg-danger");
  // console.log(  item.children[2].children[0].innerHTML);
}
AddingCart.forEach(function (product) {
  product.addEventListener("click", function (e) {
    let Item = e.target.parentNode.parentNode;
    if (product.innerText == "Add Cart") {
      addedProduct(Item);
    }
    else if (product.innerText == "Remove Cart") { 
      delete_prouduct(Item);
    }
  });
});
// End adding

// Add Wish Item
let heart = document.querySelectorAll(".favHeart");
let WishList = [];

// if (JSON.parse(localStorage.getItem("WishList"))) {
//     WishList = JSON.parse(localStorage.getItem("WishList"));
// } else {
//     WishList = [];
// }

function addWishItems(item) {
    let imgSrc = item.querySelector("img").getAttribute("src");
    let proData = {
        image: imgSrc,
        name: item.querySelector(".info .price span:first-child").innerText,
        price: item.querySelector(".info .price span:last-child").textContent,
    };

    if (!isItemInWishList(proData)) {
        WishList.push(proData);
        localStorage.setItem("WishList", JSON.stringify(WishList));
    }
}

function isItemInWishList(proData) {
    return WishList.some(function (item) {
        return item.image === proData.image && item.name === proData.name && item.price === proData.price;
    });
}

heart.forEach(function (favHeart) {
    favHeart.addEventListener("click", function (e) {
      let favItem = e.target.closest(".Fav-item");
      let HeartIcon = e.target.closest(".Fav-item .HeartIcon .favHeart");
      console.log(favItem);
      console.log(HeartIcon);
      if (favItem) {
        addWishItems(favItem);
        HeartIcon.style.color="red";
        }
    });
});


// let heart = document.querySelectorAll(".favHeart");
// let Fav_item = document.querySelectorAll(".Fav-item");
// // console.log(heart);
// let WishList=[];

// if (JSON.parse(localStorage.getItem("WishList"))) {
//     WishList = JSON.parse(localStorage.getItem("WishList"));
//   } else {
//     WishList = [];
//     // noProduct.classList.remove("d-none");
// }
//   function addWishItems(item) {
//     console.log(item.children[1].getAttribute("src"));
//     let imgSrc = item.children[1].getAttribute("src");
//     let proData = {
//       image: imgSrc,
//       name: item.children[2].children[1].children[0].innerText,
//       price: item.children[2].children[1].children[1].textContent,
//     };
//     WishList.push(proData);
//     localStorage.setItem("WishList", JSON.stringify(WishList));
//     // AddingCart.innerHTML = "Removing";
//     // item.children[2].children[0].innerHTML = "Remove Cart";
//     // item.children[2].classList.add("bg-danger");
// }
// Fav_item.forEach(function (favitem) { 
//   favitem.addEventListener("click", function (e) {
//     if (heart) {
        
//       addWishItems(favitem);   
//       }
//     })
// })
