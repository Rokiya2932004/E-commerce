setTimeout(() => {
  document.querySelector(".loading").style.visibility = "hidden";
}, 500);

let noProduct = document.querySelector(".noProduct");
let pay_now = document.querySelector(".pay-now");
let ProductList_Cart = JSON.parse(localStorage.getItem("ProductList_Cart"))||[];
let payPrice = 0;

if (ProductList_Cart.length > 0) { 
    noProduct.classList.add("d-none");
  pay_now.classList.remove("d-none");
  displayProduct();
} else {
  ProductList_Cart = [];
    noProduct.classList.remove("d-none");
    pay_now.classList.add("d-none");
}
// if (JSON.parse(localStorage.getItem("ProductList_Cart"))) {
//   ProductList_Cart = JSON.parse(localStorage.getItem("ProductList_Cart"));
//   noProduct.classList.add("d-none");
//   pay_now.classList.remove("d-none");
//   displayProduct();
// } else {
//   ProductList_Cart = [];
//   noProduct.classList.remove("d-none");
//   pay_now.classList.add("d-none");
// }

function displayProduct() {
  let cartTable = ``;
  let totalPrice = 0;

  // console.log("pagePath : " + pagePath);
  for (let i = 0; i < ProductList_Cart.length; i++) {
    let pagePath = window.location.pathname;
    let imgSrc = ProductList_Cart[i].image;
    // console.log("before : "+imgSrc);

    if (pagePath.includes("/pages/") && !imgSrc.includes("../")) {
      imgSrc = "../" + imgSrc;
    }

    //  console.log("after : "+imgSrc);

    cartTable += `
     <li class="row justify-content-center py-3 align-items-center border-1 border-bottom ">
                            <div class=" item-details col-4 d-flex flex-column flex-md-row align-items-center text-center text-md-start">
                              <div class="img-cart-container pe-3 ">
                                <img src="${imgSrc}" alt="${
      ProductList_Cart[i].name
    }" style="width:100px">
                              </div>
                              <div class="item-text-info">
                                <h5>${ProductList_Cart[i].name}</h5>
                              </div>
                            </div>
                            <div class="col-3 ">${
                              ProductList_Cart[i].price
                            }</div>
                            <div class="col-3 d-flex flex-column flex-md-row align-items-center text-center text-md-start">
                              <input type="number" id="quantity-${i}" class="form-control text-center w-50 bg-white" value="${ProductList_Cart[i].quantity}" disabled>
                              <button class="btn btn-info crudBtn editBtn text-light" onclick="editProduct(${i})">Edit</button>
                              <button class="btn bg-danger bg-opacity-75 crudBtn deleBtn" onclick="delete_prouduct(${i})"><i class="fa-solid fa-trash-can text-light"></i></button>
                            </div>
                            <div class="col-2 text-center text-md-start">$${Number(ProductList_Cart[i].price.substring(1)) * ProductList_Cart[i].quantity}</div>
                           </li> `;
    totalPrice += Number(ProductList_Cart[i].price.substring(1)) * ProductList_Cart[i].quantity;
  }
  document.querySelector(".cartlist").innerHTML = cartTable;
  console.log(totalPrice);
  payPrice = totalPrice;
  // totalPriceEle.innerHTML = `Total Price Is : <b class="text-success">${totalPrice} $</b>    `;
}
// function isProductInList(proData) { 
//   return ProductList_Cart.some(function (product) {
//     return (
//       product.image === proData.image &&
//       product.name === proData.name &&
//       product.price === proData.price
//     );
//   });
// }
function editProduct(index) {
  let quantityInput = document.getElementById(`quantity-${index}`);
  let button = event.target;
  if (button.textContent == "Edit") {
    quantityInput.disabled = false;
    button.textContent = "Save";
    button.classList.add("bg-success");
  } else if (button.textContent == "Save") {
    ProductList_Cart[index].quantity = parseInt(quantityInput.value, 10);
    button.textContent = "Edit";
    localStorage.setItem("ProductList_Cart", JSON.stringify(ProductList_Cart));
    quantityInput.disabled = true;
    displayProduct();
  }
}
function delete_prouduct(id) {
  ProductList_Cart.splice(id, 1);
  console.log(ProductList_Cart);
  localStorage.setItem("ProductList_Cart", JSON.stringify(ProductList_Cart));
  displayProduct();
  if (ProductList_Cart.length === 0) {
    noProduct.classList.remove("d-none");
    pay_now.classList.add("d-none");
   }
}
let numberPro = document.querySelector(".pay-now");
console.log(numberPro);

let confirm_pay = document.getElementById("confirm_pay");
let priceText = document.querySelector(".Total_price");
function openConfirm() { 
  priceText.innerText ="$ "+ payPrice;
  confirm_pay.style.visibility = "visible";
  confirm_pay.style.top = "50%";
  confirm_pay.style.transform = "translate(-50%, -50%) scale(1)";
}
function closeConfirm() { 
  confirm_pay.style.top = "0";
  confirm_pay.style.visibility = "hidden";
}
let Payed = document.getElementById("Payed");
function openSuccess() { 
  closeConfirm();
  Payed.style.visibility = "visible";
  Payed.style.top = "50%";
  Payed.style.transform = "translate(-50%, -50%) scale(1)";
  setTimeout(() => {
    Payed.style.top = "0";
    Payed.style.visibility = "hidden";

     }, 1500);
  // ProductList_Cart = [];
  //  localStorage.setItem("ProductList_Cart", JSON.stringify(ProductList_Cart));
  // displayProduct();
  //    noProduct.classList.remove("d-none");
  //    pay_now.classList.add("d-none");
}