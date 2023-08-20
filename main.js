var notification = document.getElementById("notification");
var disappearTimeout = undefined;
var autoBar = undefined;
var counter = 0;
var previousSlide = 1;
var currentSlide = 1;
var autoSlide = undefined;
const filters = new Set(['Tất cả']);
var taxPercentage = 0.05;
var searchinput = document.getElementById("search");
var searchinputmobile = document.getElementById("search-mobile");
var currentPage = 'page-1';

let productList = localStorage.getItem("productList");
if (!productList) {
    let productListFile = `[{"name":"Sashimi Hoàng đế","price":"349000","type":"Sashimi","description":"Gồm cá hồi, cá ngừ, cá trích, cá cam, tôm, mực, bạch tuộc và sò điệp","imageLink":"./assets/image/huyen-bui-a07BcNKwK5I-unsplash.jpg","size":"wide"},{"name":"Sashimi cá hồi","price":"69000","type":"Sashimi","description":"Gồm 5 miếng cá hồi","imageLink":"./assets/image/olivier-bergeron-q_QPkOpsAWk-unsplash.jpg","size":"medium"},{"name":"Sashimi cá ngừ","price":"65000","type":"Sashimi","description":"Gồm 5 miếng cá ngừ","imageLink":"./assets/image/pexels-kim-cruz-4071397.jpg","size":"medium"},{"name":"Sashimi bạch tuộc","price":"59000","type":"Sashimi","description":"Gồm 5 miếng bạch tuộc","imageLink":"./assets/image/Frozen-Japan-Octopus-Boiled-Leg-Tako-Sashimi-Cut-Photo.jpg","size":"medium"},{"name":"Sashimi cá trích","price":"89000","type":"Sashimi","description":"Gồm 5 miếng cá trích","imageLink":"./assets/image/Sashimi-Cá-trích-68k-1170x679.jpg","size":"medium"},{"name":"Cuốn California","price":"65000","type":"Sushi","description":"Gồm cơm Nhật, trứng cá chuồn, thanh cua, bơ và dưa leo","imageLink":"./assets/image/California-Maki-Wide.jpg","size":"wide"},{"name":"Cuốn lươn và bơ","price":"95000","type":"Sushi","description":"Gồm cơm Nhật, lươn và bơ","imageLink":"./assets/image/louis-hansel-6iFF6lMSfZQ-unsplash.jpg","size":"medium"},{"name":"Cuốn tempura","price":"49000","type":"Sushi","description":"Gồm cơm Nhật, bột tempura, bơ và trứng cá trích","imageLink":"./assets/image/pexels-abdurakhman-yarichev-17584953.jpg","size":"medium"},{"name":"Cuốn cá hồi","price":"79000","type":"Sushi","description":"Gồm cơm Nhật, cá hồi và sốt Mayonnaise","imageLink":"./assets/image/vinicius-benedit--1GEAA8q3wk-unsplash.jpg","size":"medium"},{"name":"Cuốn cá ngừ","price":"69000","type":"Sushi","description":"Gồm cơm Nhật, cá ngừ và bơ","imageLink":"./assets/image/ben-lei--sDWTQfqgFA-unsplash.jpg","size":"medium"},{"name":"Tempura tôm","price":"79000","type":"Tempura","description":"Gồm 6 con tôm và bột tempura","imageLink":"./assets/image/pexels-makafood-8953713.jpg","size":"wide"},{"name":"Tempura bạch tuộc","price":"69000","type":"Tempura","description":"Gồm 6 miếng bạch tuộc và bột tempura","imageLink":"./assets/image/7b0ce0c1f5a365b12410fa233f8c313d.jpg","size":"medium"},{"name":"Tempura rau củ","price":"59000","type":"Tempura","description":"Gồm bí ngòi, cà tím, khoai lang, bí đỏ, ớt chuông, nấm và bột tempura","imageLink":"./assets/image/R02443_Vegetable_Tempura.jpg","size":"medium"},{"name":"Bánh xèo Okonomiyaki","price":"59000","type":"Khai vị","description":"Gồm hải sản, sốt Mayonnaise, sốt Tonkatsu và cá ngừ bào","imageLink":"./assets/image/pancake-blog-header-image-1570px.jpg","size":"wide"},{"name":"Gyoza nhân thịt","price":"39000","type":"Khai vị","description":"Gồm 5 miếng Gyoza thịt heo","imageLink":"./assets/image/tasty_gyoza_japanese_16947_16x9.jpg","size":"medium"},{"name":"Takoyaki bạch tuộc","price":"39000","type":"Khai vị","description":"Gồm 6 viên Takoyaki bạch tuộc","imageLink":"./assets/image/Takoyaki_2048x2048.jpg","size":"medium"},{"name":"Salad Nhật chay","price":"49000","type":"Khai vị","description":"Gồm rong biển, giấm, dưa leo, cà rốt, củ cải trắng và củ dền","imageLink":"./assets/image/18KITCH_SPAN-superJumbo-v3.jpg","size":"medium"},{"name":"Súp miso","price":"15000","type":"Khai vị","description":"Gồm tương miso, rong biển và đậu hũ","imageLink":"./assets/image/Miso_soup_facebook.jpg","size":"medium"},{"name":"Trà sữa Matcha","price":"35000","type":"Thức uống","description":"Gồm sữa, trà xanh và trân châu đường đen","imageLink":"./assets/image/matcha_bubble_tea_2.jpg","size":"wide"},{"name":"Trà chanh","price":"19000","type":"Thức uống","description":"Gồm trà, chanh, đá và bạc hà","imageLink":"./assets/image/RFO-1400x919-IcedTea-8e156836-69f4-4433-8bae-c42e174212c1-0-1400x919.jpg","size":"medium"},{"name":"Rượu Sake","price":"69000","type":"Thức uống","description":"Được làm từ gạo và men","imageLink":"./assets/image/Tokoname-Sake-Cup.jpg","size":"medium"}]`;
    localStorage.setItem("productList", productListFile);
}
let cartList = localStorage.getItem("cartList");
if (!cartList) {
    let cartListFile = [];
    localStorage.setItem("cartList", JSON.stringify(cartListFile));
}
let deliveryList = localStorage.getItem("deliveryList");
if (!deliveryList) {
    let deliveryListFile = [];
    localStorage.setItem("deliveryList", JSON.stringify(deliveryListFile));
}
let orderHistory = localStorage.getItem("orderHistory");
if (!orderHistory) {
    let orderHistoryFile = [];
    localStorage.setItem("orderHistory", JSON.stringify(orderHistoryFile));
}
function loadScroll() {
    setTimeout(function () {
        document.getElementById('scroll-content').classList.remove('s-c-disappear');
    }, 1500);
}
loadScroll();
function toggleAccountMenu() {
    document.getElementById('account-menu-dim').classList.toggle('hidden');
    if (document.getElementById('account-menu').classList.contains('hidden')) {
        document.getElementById('account-menu').classList.toggle('hidden');
        setTimeout(function () {
            document.getElementById('account-menu').classList.toggle('a-m-disappear');
        }, 0.01);
    } else {
        document.getElementById('account-menu').classList.toggle('a-m-disappear');
        setTimeout(function () {
            document.getElementById('account-menu').classList.toggle('hidden');
        }, 200);
    }
}
function getAccountType() {
    let username = localStorage.getItem('userLogin');
    let accountType = '';
    let accountsJson = JSON.parse(localStorage.getItem("Acc"));
    accountsJson.forEach(item => {
        if (username == item.username) {
            accountType = item.type;
        }
    });
    return accountType;
}
function loadAvatar(id, letter) {
    if (letter == 'no-account') {
        document.getElementById(id).innerHTML += `<img src="./assets/image/user.png" alt="" style="width: 100%; height: 100%;">`
    } else {
        let letterSize = document.getElementById(id).style.height;
        document.getElementById(id).innerHTML += `<p class='avatar-letter' style='font-size: calc(${letterSize}/2)'>${letter}</p>`
    }
}
function loadAllAvatars(letter) {
    loadAvatar('nav-bar-avatar', letter);
    loadAvatar('account-menu-avatar', letter);
    loadAvatar('account-settings-avatar', letter);
}
function loadAccount() {
    let loginStatus = localStorage.getItem("hadLogged");
    let username = localStorage.getItem('userLogin');
    if (!loginStatus) {
        localStorage.setItem("hadLogged", 'false');
        loginStatus = localStorage.getItem("hadLogged");
    }
    if (loginStatus == "false") {
        loadAllAvatars('no-account');
        document.getElementById('username').innerHTML = 'Chưa có tài khoản';
        document.getElementById('account-type').classList.add('hidden');
        document.getElementById('account-settings').classList.add('hidden');
        document.getElementById('admin-page').classList.add('hidden');
        document.getElementById('logout').classList.add('hidden');
    } else {
        document.getElementById('username').innerHTML = username;
        let letter = username.charAt(0).toUpperCase();
        loadAllAvatars(letter);
        let accountType = getAccountType();
        if (accountType == 'admin') {
            document.getElementById('account-type').innerHTML = 'Quản trị viên';
        } else if (accountType == 'user') {
            document.getElementById('account-type').innerHTML = 'Khách hàng';
            document.getElementById('admin-page').classList.add('hidden');
        }
        document.getElementById('login').classList.add('hidden');
        document.getElementById('signup').classList.add('hidden');
        document.getElementById('new-username').value = username;
        if (username.includes('@') && username.includes('.com')) {
            document.getElementById('email').value = username;
        }
    }
}
loadAccount();
function changeUsername() {
    let username = localStorage.getItem('userLogin');
    let newUsername = document.getElementById('new-username').value;
    let accountsJson = JSON.parse(localStorage.getItem("Acc"));
    let allowChange = true;
    accountsJson.forEach((item) => {
        if (newUsername == item.username) {
            showNotification('availableaccount');
            allowChange = false;
        }
    });
    if (newUsername == '') {
        showNotification('fillin');
        allowChange = false;
    }
    if (allowChange) {
        accountsJson.forEach((item, index) => {
            if (username == item.username) {
                var acc = {
                    username: newUsername,
                    password: item.password,
                    type: item.type
                };
                accountsJson.splice(index, 1, acc);
                localStorage.setItem("Acc", JSON.stringify(accountsJson));
                localStorage.setItem("userLogin", newUsername);
                showNotification('changeusername');
                setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        });
    }
}
function changePassword() {
    let username = localStorage.getItem('userLogin');
    let newPassword = document.getElementById('new-password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    let accountsJson = JSON.parse(localStorage.getItem("Acc"));
    let allowChange = true;
    if (newPassword == '' || confirmPassword == '') {
        showNotification('fillinall');
        allowChange = false;
    } else if (newPassword != confirmPassword) {
        showNotification('passwordmatch');
        allowChange = false;
    }
    if (allowChange) {
        accountsJson.forEach((item, index) => {
            if (username == item.username) {
                var acc = {
                    username: item.username,
                    password: newPassword,
                    type: item.type
                };
                accountsJson.splice(index, 1, acc);
                localStorage.setItem("Acc", JSON.stringify(accountsJson));
                document.getElementById('new-password').value = '';
                document.getElementById('confirm-password').value = '';
                showNotification('changepassword');
            }
        });
    }
}
function deleteAccount() {
    if (confirm('Bạn có chắc bạn muốn xoá tài khoản không?')) {
        let username = localStorage.getItem('userLogin');
        let accountsJson = JSON.parse(localStorage.getItem("Acc"));
        accountsJson.forEach((item, index) => {
            if (username == item.username) {
                accountsJson.splice(index, 1);
                localStorage.setItem("Acc", JSON.stringify(accountsJson));
                showNotification('deleteaccount');
                setTimeout(function () {
                    logout();
                }, 2000);
            }
        });
    }
}
function logout() {
    localStorage.setItem('hadLogged', 'false');
    localStorage.removeItem('userLogin');
    location.reload();
}
function showNotification(type) {
    document.getElementById("list-notification").style.display = 'flex';
    if (notification.classList == "appear") {
        notification.classList.remove("appear");
        clearTimeout(disappearTimeout);
    }
    setTimeout(function () {
        let notificationText = document.getElementById("notification-text");
        let icon = '';
        if (type == "addproduct") {
            notificationText.innerHTML = "Đã thêm món ăn vào giỏ hàng";
            icon = 'success';
        } else if (type == "deleteproduct") {
            notificationText.innerHTML = "Đã xoá món ăn khỏi giỏ hàng";
            icon = 'success';
        } else if (type == "paymentsuccess") {
            notificationText.innerHTML = "Thanh toán thành công!";
            icon = 'success';
        } else if (type == "changeusername") {
            notificationText.innerHTML = "Đã thay đổi username/email thành công!";
            icon = 'success';
        } else if (type == "changepassword") {
            notificationText.innerHTML = "Đã thay đổi mật khẩu thành công!";
            icon = 'success';
        } else if (type == "deleteaccount") {
            notificationText.innerHTML = "Đã xoá tài khoản thành công!";
            icon = 'success';
        } else if (type == "availableaccount") {
            notificationText.innerHTML = "Tên tài khoản đã có sẵn!";
            icon = 'error';
        } else if (type == "fillin") {
            notificationText.innerHTML = "Vui lòng điền vào khung!";
            icon = 'error';
        } else if (type == "fillinall") {
            notificationText.innerHTML = "Vui lòng điền tất cả khung!";
            icon = 'error';
        } else if (type == "passwordmatch") {
            notificationText.innerHTML = "Mật khẩu không trùng khớp!";
            icon = 'error';
        }
        if (icon == 'success') {
            document.getElementById('notification-icon-container').innerHTML =
                `
                <div class="notification-icon" style="background-color: #14AE5C;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                    </svg>
                </div>
            `
        } else if (icon == 'error') {
            document.getElementById('notification-icon-container').innerHTML =
                `
                <div class="notification-icon" style="background-color: #F24822;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
            `
        }
        notification.classList.add("appear");
    }, 200);
    disappearTimeout = setTimeout(function () {
        notification.classList.remove("appear");
        setTimeout(function () {
            document.getElementById("list-notification").style.display = 'none';
        }, 200);
    }, 5000);
}
function changeSlide(number) {
    var slides = 5;
    clearInterval(autoSlide);
    previousSlide = currentSlide;
    if (number > slides) {
        currentSlide = number - slides;
    } else if (number < 1) {
        currentSlide = slides + number;
    } else {
        currentSlide = number;
    }
    if (previousSlide == currentSlide) {
        runSlide();
        return;
    }

    document.getElementById('tab-slide-' + currentSlide).classList.add("on-slide");
    document.getElementById('tab-slide-' + previousSlide).classList.remove("on-slide");

    document.getElementById('slide-' + currentSlide).classList.add("appear");
    document.getElementById('slide-' + previousSlide).classList.remove("appear");

    runSlide();
}
function backSlide() {
    changeSlide(currentSlide - 1);
}
function forwardSlide() {
    changeSlide(currentSlide + 1);
}
function runSlide() {
    autoSlide = setInterval(function () {
        forwardSlide();
    }, 4000);
}
runSlide();
function separate(number) {
    return number.toLocaleString("vi-VN");
}
function loadProducts(filter) {
    document.getElementById('product-list').innerHTML = ``;
    let parsedProductList = JSON.parse(localStorage.getItem('productList'));
    parsedProductList.forEach((item,index) => {
        if (filter == item.type || filter == 'Tất cả') {
            let separatedPrice = separate(parseInt(item.price));
            if (item.size == 'wide') {
                var sizeid = 'item-product-wide';
            } else {
                var sizeid = 'item-product';
            }
            document.getElementById('product-list').innerHTML += 
            `
            <div class="${sizeid}" style="background: url('${item.imageLink}') no-repeat; background-position: center; background-size: cover;">
                <div class="product-dim">
                    <div class="product-summary-container">
                        <p class="product-title">${item.name}</p>
                        <p class="product-header">${separatedPrice} VND</p>
                    </div>
                    <div class="button-product-container">
                        <div class="button-product-nobackground" data-bs-toggle="modal" data-bs-target="#viewDetailsModal" onclick="loadDetails(${index})">
                            <img src="./assets/image/info.png" alt="" class="button-product-image">
                        </div>
                        <div class="button-product" onclick="addProduct(${index},1)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    });
}
loadProducts('Tất cả');
function loadFilters() {
    document.getElementById('filter-list').innerHTML = ``;
    document.getElementById('nav-bar-menu-list').innerHTML = ``;
    let parsedProductList = JSON.parse(localStorage.getItem('productList'));
    parsedProductList.forEach((item) => {
        filters.add(item.type);
    });
    filters.forEach((item) => {
        if (item == 'Tất cả') {
            var tabStyle = 'filter-bar-tab-selected';
        } else {
            var tabStyle = 'filter-bar-tab';
        }
        document.getElementById('filter-list').innerHTML += 
        `
        <div class="${tabStyle}" id="filter-${item}" onclick="changeProductFilter('${item}')">${item}</div>
        `;
        document.getElementById('nav-bar-menu-list').innerHTML += 
        `
        <p class="nav-bar-menu-tab" onclick="changeProductFilter('${item}')">${item}</p>
        `;
    });
}
loadFilters();
function changeProductFilter(filter) {
    filters.forEach((item) => {
        document.getElementById(`filter-${item}`).classList.replace("filter-bar-tab-selected", "filter-bar-tab");
    });
    document.getElementById(`filter-${filter}`).classList.replace("filter-bar-tab", "filter-bar-tab-selected");
    loadProducts(filter);
}
function loadDetails(prodIndex) {
    document.getElementById('details-content').innerHTML =  ``;
    let parsedProductList = JSON.parse(localStorage.getItem('productList'));
    let name = parsedProductList[prodIndex].name;
    let separatedPrice = separate(parseInt(parsedProductList[prodIndex].price));
    let description = parsedProductList[prodIndex].description;
    let imageLink = parsedProductList[prodIndex].imageLink;
    document.getElementById('details-content').innerHTML += 
    `
    <div class="modal-header" style="background: url('${imageLink}') no-repeat; background-position: center; background-size: cover; height: 288px">
        <div class="button-details-container">
            <div class="button-details" data-bs-dismiss="modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </div>
        </div>
    </div>
    <div class="modal-body" style="padding: 20px !important;">
        <h1 class="details-title">${name}</h1>
        <p class="details-header">${separatedPrice} VND</p>
        <p class="details-body"><span style="font-weight: 600">Mô tả: </span>${description}</p>
    </div>
    <div class="modal-footer" style="padding: 20px !important; gap: 8px">
        <p class="details-body">Số lượng:</p>
        <div style="display: flex">
            <button class="details-input-button details-input-minus" onclick="minusDetailsInput()">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                </svg>
            </button>
            <input class="details-input" id="details-input" oninput="checkInputNumber('details-input')" value="1">
            <button class="details-input-button details-input-plus" onclick="plusDetailsInput()">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </button>
        </div>
        <button class="button button-modal-wide" data-bs-dismiss="modal" onclick="addProduct(${prodIndex},document.getElementById('details-input').value)">Thêm vào Giỏ hàng</button>
    </div>
    `;
}
function checkInputNumber(id) {
    if (isNaN(document.getElementById(id).value) || document.getElementById(id).value < 1) {
        document.getElementById(id).value = '';
    }
}
function checkInputZero(id) {
    if (isNaN(document.getElementById(id).value) || document.getElementById(id).value < 0) {
        document.getElementById(id).value = '';
    }
}
function plusDetailsInput() {
    checkInputNumber('details-input');
    if (document.getElementById('details-input').value == '') {
        document.getElementById('details-input').value = '1';
    } else {
        document.getElementById('details-input').value = parseInt(document.getElementById('details-input').value) + 1;
    }
}
function minusDetailsInput() {
    checkInputNumber('details-input');
    if (document.getElementById('details-input').value == '' || document.getElementById('details-input').value == '1') {
        document.getElementById('details-input').value = '1';
    } else {
        document.getElementById('details-input').value = parseInt(document.getElementById('details-input').value) - 1;
    }
}
function addProduct(prodIndex,amount) {
    let prodAmount = parseInt(amount);
    let cartIndex = undefined;
    if (isNaN(parseInt(amount))) {
        prodAmount = 1;
    }
    var parsedCartList = JSON.parse(localStorage.getItem('cartList'));
    if (parsedCartList.length != 0) {
        parsedCartList.forEach((item,index) => {
            if (prodIndex == item.prodIndex) {
                cartIndex = index;
                prodAmount += parseInt(item.amount);
            }
        });
    }
    var cartItem = {
        prodIndex: prodIndex,
        amount: prodAmount
    };
    if (cartIndex == undefined) {
        parsedCartList.push(cartItem);
    } else {
        parsedCartList.splice(cartIndex, 1, cartItem);
    }
    localStorage.setItem("cartList",JSON.stringify(parsedCartList));
    showNotification('addproduct');
    updateStatus();
}
function deleteProduct(cartIndex) {
    let parsedCartList = JSON.parse(localStorage.getItem('cartList'));
    parsedCartList.splice(cartIndex, 1);
    localStorage.setItem("cartList",JSON.stringify(parsedCartList));
    updateStatus();
    showNotification('deleteproduct');
}
function loadCounter() {
    counter = 0;
    var parsedCartList = JSON.parse(localStorage.getItem('cartList'));
    if (parsedCartList.length != 0) {
        parsedCartList.forEach((item) => {
            counter += item.amount;
        });
    }
    document.getElementById('counter').innerHTML = '';
    document.getElementById('counter').innerHTML = counter;
    if (counter == 0) {
        document.getElementById('counter').classList.add('hidden');
    } else {
        document.getElementById('counter').classList.remove('hidden');
    }
}
function loadCart() {
    document.getElementById('cart-list').innerHTML =  ``;
    let parsedProductList = JSON.parse(localStorage.getItem('productList'));
    let parsedCartList = JSON.parse(localStorage.getItem('cartList'));
    parsedCartList.forEach((item,index) => {
        let name = parsedProductList[item.prodIndex].name;
        let totalPrice = separate(parsedProductList[item.prodIndex].price * item.amount);
        let imageLink = parsedProductList[item.prodIndex].imageLink;
        document.getElementById('cart-list').innerHTML += 
        `
            <div class="item-cart">
                <div class="item-cart-image" style="background: url('${imageLink}') no-repeat; background-position: center; background-size: cover"></div>
                <div class="item-cart-content">
                    <div>
                        <p class="item-cart-title">${item.amount} x ${name}</p>
                        <p class='item-cart-header'><span style="font-weight: 600; color: #F24822">Tổng giá: </span>${totalPrice} VND</p>
                    </div>
                    <button class="button cart-button button-warning" onclick="deleteProduct(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    });
}
function paymentFunc() {
    if ((document.getElementById('payment').value == "credit") || (document.getElementById('payment').value == "debit")) {
        document.getElementById('image-card').style.display = 'block';
        document.getElementById('info-card').style.display = 'flex';
    } else {
        document.getElementById('image-card').style.display = 'none';
        document.getElementById('info-card').style.display = 'none';
    }
    canOrder();
    displayText('display');
}
function displayText(displayType) {
    var cartArray = undefined;
    if (displayType == 'display') {
        cartArray = JSON.parse(localStorage.getItem('cartList'));
    } else if (displayType == 'display-delivery') {
        cartArray = JSON.parse(localStorage.getItem('deliveryList'))[0].cart;
    }
    document.getElementById(displayType).innerHTML = '';
    if (cartArray.length == 0) {
        document.getElementById(displayType).innerHTML +=
        `
            <p>Chưa có món ăn nào trong giỏ hàng</p>
        `;
    } else {
        let parsedProductList = JSON.parse(localStorage.getItem('productList'));
        let total = 0;
        cartArray.forEach((item) => {
            total += parsedProductList[item.prodIndex].price * item.amount;
        });
        var tax = total * taxPercentage;
        var donation = total * 0.05;
        var finalPrice = total + tax;
        document.getElementById(displayType).innerHTML +=
        `
            <p><span style="font-weight: 600">Tổng giá: </span>${separate(total)} VND</p>
            <p><span style="font-weight: 600">Thuế: </span>${separate(tax)} VND</p>
            <p><span style="font-weight: 600">Quyên góp: </span>${separate(donation)} VND</p>
            <p><span style="font-weight: 600">Thành tiền: </span>${separate(finalPrice)} VND</p>
        `;
    }
}
function canOrder() {
    var allowOrder = false;
    var parsedCartList = JSON.parse(localStorage.getItem('cartList'));
    var paymentvl = document.getElementById('payment').value;
    var cardnumvl = document.getElementById('cardnum').value;
    var expirevl = document.getElementById('expire').value;
    var cvvvl = document.getElementById('cvv').value;
    var addressvl = document.getElementById('address').value;
    var phonevl = document.getElementById('phone').value;
    if (addressvl == 'dev') {
        allowOrder = true;
    } else if (parsedCartList.length != 0 && (paymentvl == "credit" || paymentvl == "debit") && cardnumvl != "" && expirevl != "" && cvvvl != "" && addressvl != "" && phonevl != "") {
        allowOrder = true;
    } else if (parsedCartList.length != 0 && paymentvl == "cash" && addressvl != "" && phonevl != "") {
        allowOrder = true;
    } else {
        allowOrder = false;
    }
    if (allowOrder) {
        document.getElementById('paybutton').innerHTML = '<button class="button info-display-button" onclick="continuePayment()">Thanh toán</button>';
    } else {
        document.getElementById('paybutton').innerHTML = '<button class="button info-display-button button-disabled" disabled>Thanh toán</button>';
    }
}
function continuePayment() {
    document.getElementById('loading').style.display = 'block';
    setTimeout(function () {
        let parsedDeliveryList = JSON.parse(localStorage.getItem('deliveryList'));
        let parsedCartList = JSON.parse(localStorage.getItem('cartList'));
        var time = new Date();
        time.setMinutes(time.getMinutes() + 30);
        let estimatedTime = time.toLocaleTimeString("vi-VN", {
            hour: '2-digit',
            minute: '2-digit',
        });
        let deliveryCode = Math.floor((Math.random() * 99999999) + 10000000);
        var address = document.getElementById('address').value;
        var phone = document.getElementById('phone').value;
        var deliveryItem = {
            cart: parsedCartList,
            estimatedTime: estimatedTime,
            deliveryCode: deliveryCode,
            address: address,
            phone: phone
        };
        parsedDeliveryList.push(deliveryItem);
        localStorage.setItem("deliveryList",JSON.stringify(parsedDeliveryList));
        
        let parsedProductList = JSON.parse(localStorage.getItem('productList'));
        var parsedOrderHistory = JSON.parse(localStorage.getItem('orderHistory'));
        parsedCartList.forEach((cartItem) => {
            let name = parsedProductList[cartItem.prodIndex].name;
            let historyAmount = parseInt(cartItem.amount);
            let latestUser = undefined;
            let loginStatus = localStorage.getItem("hadLogged");
            let username = localStorage.getItem('userLogin');
            if (loginStatus == "false") {
                latestUser = 'Chưa có tài khoản';
            } else {
                latestUser = username;
            }
            let time = new Date();
            let latestTime = time.toLocaleString("vi-VN");
            let historyIndex = undefined;
            if (parsedOrderHistory.length != 0) {
                parsedOrderHistory.forEach((historyItem,index) => {
                    if (name == historyItem.name) {
                        historyIndex = index;
                        historyAmount += parseInt(historyItem.amount);
                    }
                });
            }
            var historyItem = {
                name: name,
                amount: historyAmount,
                latestUser: latestUser,
                latestTime: latestTime
            };
            if (historyIndex != undefined) {
                parsedOrderHistory.splice(historyIndex, 1);
            }
            parsedOrderHistory.unshift(historyItem);
        });
        localStorage.setItem("orderHistory",JSON.stringify(parsedOrderHistory));

        let cartListFile = [];
        localStorage.setItem("cartList", JSON.stringify(cartListFile));

        updateStatus();
        document.getElementById('loading').style.display = 'none';
        showNotification("paymentsuccess");
    }, 1000);
}
function loadDelivery() {
    let deliveryList = JSON.parse(localStorage.getItem('deliveryList'));
    if (deliveryList.length != 0) {
        document.getElementById('cart').style.display = 'none';
        document.getElementById('banner').style.display = 'flex';
        
        let parsedProductList = JSON.parse(localStorage.getItem('productList'));
        let cart = JSON.parse(localStorage.getItem('deliveryList'))[0].cart;
        let estimatedTime = JSON.parse(localStorage.getItem('deliveryList'))[0].estimatedTime;
        let deliveryCode = JSON.parse(localStorage.getItem('deliveryList'))[0].deliveryCode;
        let address = JSON.parse(localStorage.getItem('deliveryList'))[0].address;
        let phone = JSON.parse(localStorage.getItem('deliveryList'))[0].phone;

        document.getElementById('info-delivery').innerHTML =  ``;
        document.getElementById('info-delivery').innerHTML += 
        `
            <p>Shipper sẽ giao hàng đến <span class="blue">${address}</span></p>
            <p>Khi đến nơi, shipper sẽ gọi số <span class="blue">${phone}</span></p>
            <p><span class="blue">Dự kiến giao lúc: </span>${estimatedTime}</p>
            <p><span class="blue">Mã vận đơn: </span>${deliveryCode}</p>
        `;

        document.getElementById('delivery-cart').innerHTML =  ``;
        cart.forEach((item) => {
            let name = parsedProductList[item.prodIndex].name;
            let totalPrice = separate(parsedProductList[item.prodIndex].price * item.amount);
            document.getElementById('delivery-cart').innerHTML += 
            `
                <p style="font-weight: 600">${item.amount} x ${name}</p>
                <p style="text-align: right">${totalPrice} VND</p>
            `;
        });

        displayText('display-delivery');
        scroll(0, 0);
    } else {
        document.getElementById('cart').style.display = 'block';
        document.getElementById('banner').style.display = 'none';
    }
}
function cancelDelivery() {
    if (confirm("Để tránh tình trạng bom hàng, Mini Tokyo sẽ trừ 10% hoá đơn để huỷ đơn hàng. Bạn có chắc là bạn muốn huỷ đơn không?") == true) {
        let deliveryListFile = [];
        localStorage.setItem("deliveryList", JSON.stringify(deliveryListFile));
        loadDelivery();
    }
}
function updateStatus() {
    loadCounter();
    loadCart();
    canOrder();
    displayText('display');
    loadDelivery();
}
updateStatus();
searchinput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchItem();
    }
});
searchinputmobile.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchItem();
        toggleHamburger();
    }
});
const removeAccents = str =>
str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
function searchItem() {
    document.getElementById('search-list').innerHTML = '';
    if (window.innerWidth <= 768) {
        var searchInput = document.getElementById('search-mobile').value;
    } else {
        var searchInput = document.getElementById('search').value;
    }
    var results = 0;
    let parsedProductList = JSON.parse(localStorage.getItem('productList'));
    parsedProductList.forEach((item,index) => {
        let nameSearch = removeAccents(searchInput.toLowerCase());
        let nameProduct = removeAccents(item.name.toLowerCase());
        let typeProduct = removeAccents(item.type.toLowerCase());
        let descriptionProduct = item.description.toLowerCase();
        if (nameProduct.includes(nameSearch) || typeProduct.includes(nameSearch) || descriptionProduct.includes(searchInput.toLowerCase())){
            let separatedPrice = separate(parseInt(item.price));
            var sizeid = 'item-product';
            document.getElementById('search-list').innerHTML += 
            `
            <div class="${sizeid}" style="background: url('${item.imageLink}') no-repeat; background-position: center; background-size: cover;">
                <div class="product-dim">
                    <div class="product-summary-container">
                        <p class="product-title">${item.name}</p>
                        <p class="product-header">${separatedPrice} VND</p>
                    </div>
                    <div class="button-product-container">
                        <div class="button-product-nobackground" data-bs-toggle="modal" data-bs-target="#viewDetailsModal" onclick="loadDetails(${index})">
                            <img src="./assets/image/info.png" alt="" class="button-product-image">
                        </div>
                        <div class="button-product" onclick="addProduct(${index},1)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            `;
            results += 1;
        }
        document.getElementById('search-results').innerHTML = '<p class="body">Đã tìm thấy ' + results + ' kết quả cho "' + searchInput + '"</p>';
        changePage('page-search')
    });
}
function toggleHamburger() {
    if (document.getElementById('hamburger-menu').classList.contains('hidden')) {
        document.getElementById('hamburger-menu').classList.toggle('hidden');
        document.getElementById('hamburger-menu-dim').classList.toggle('hidden');
        document.getElementById('hamburger').classList.replace("nav-bar-tab", "nav-bar-tab-selected");
        setTimeout(function () {
            document.getElementById('hamburger-menu').classList.toggle('h-m-disappear');
            document.getElementById('hamburger-menu-dim').classList.toggle('invisible');
        }, 0.01);
    } else {
        document.getElementById('hamburger-menu').classList.toggle('h-m-disappear');
        document.getElementById('hamburger-menu-dim').classList.toggle('invisible');
        document.getElementById('hamburger').classList.replace("nav-bar-tab-selected", "nav-bar-tab");
        setTimeout(function () {
            document.getElementById('hamburger-menu').classList.toggle('hidden');
            document.getElementById('hamburger-menu-dim').classList.toggle('hidden');
        }, 500);
    }
}
function changePage(pageNumber) {
    var pages = ['page-1', 'page-2', 'page-3', 'page-4', 'page-search', 'page-terms', 'page-account'];
    var currenttab = pageNumber + '-tab';
    currentPage = pageNumber;

    for (let i = 0; i < (pages.length - 3); i++) {
        document.getElementById(pages[i] + '-tab').classList.replace("nav-bar-tab-selected", "nav-bar-tab");
    }
    if (pageNumber != 'page-search' && pageNumber != 'page-terms' && pageNumber != 'page-account') {
        document.getElementById(currenttab).classList.replace("nav-bar-tab", "nav-bar-tab-selected");
    }

    for (let i = 0; i < pages.length; i++) {
        document.getElementById(pages[i]).classList.add("hidden");
    }
    document.getElementById(pageNumber).classList.remove("hidden");

    if (pageNumber == 'page-1') {
        document.getElementById('bar').classList = 'fixed';
    } else {
        document.getElementById('bar').classList = 'sticky';
    }
    window.scroll(0, 0);
}