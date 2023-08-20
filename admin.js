var notification = document.getElementById("notification");
var currentPage = 'page-1';
let loginStatus = localStorage.getItem("hadLogged");

function showNotification(type) {
    document.getElementById("list-notification").style.display = 'flex';
    if (notification.classList == "appear") {
        notification.classList.remove("appear");
        clearTimeout(disappearTimeout);
    }
    setTimeout(function () {
        let notificationText = document.getElementById("notification-text");
        let icon = '';
        if (type == "changeproductinfo") {
            notificationText.innerHTML = "Đã thay đổi thông tin món ăn";
            icon = 'success';
        } else if (type == "deleteproduct") {
            notificationText.innerHTML = "Đã xoá món ăn thành công!";
            icon = 'success';
        }  else if (type == "createproduct") {
            notificationText.innerHTML = "Món ăn đã được tạo!";
            icon = 'success';
        } else if (type == "changeaccountinfo") {
            notificationText.innerHTML = "Đã thay đổi thông tin tài khoản";
            icon = 'success';
        } else if (type == "deleteaccount") {
            notificationText.innerHTML = "Đã xoá tài khoản thành công!";
            icon = 'success';
        } else if (type == "createaccount") {
            notificationText.innerHTML = "Tài khoản đã được tạo!";
            icon = 'success';
        } else if (type == "availableproduct") {
            notificationText.innerHTML = "Tên món ăn đã có sẵn!";
            icon = 'error';
        } else if (type == "availableaccount") {
            notificationText.innerHTML = "Tên tài khoản đã có sẵn!";
            icon = 'error';
        } else if (type == "fillin") {
            notificationText.innerHTML = "Vui lòng điền vào khung!";
            icon = 'error';
        } else if (type == "fillinall") {
            notificationText.innerHTML = "Vui lòng điền tất cả khung!";
            icon = 'error';
        } else if (type == "invalidindex") {
            notificationText.innerHTML = "Vị trí không hợp lệ!";
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
if (!loginStatus) {
    localStorage.setItem("hadLogged", 'false');
    loginStatus = localStorage.getItem("hadLogged");
}
if (loginStatus == "false") {
    location.href = './index.html';
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
let accountType = getAccountType();
if (accountType != 'admin') {
    location.href = './index.html';
}
function loadAvatar(id, letter) {
    if (letter == 'no-account') {
        document.getElementById(id).innerHTML += `<img src="./assets/image/user.png" alt="" style="width: 100%; height: 100%;">`
    } else {
        let letterSize = document.getElementById(id).style.height;
        document.getElementById(id).innerHTML += `<p class='avatar-letter' style='font-size: calc(${letterSize}/2)'>${letter}</p>`
    }
}
function loadAccount() {
    let username = localStorage.getItem('userLogin');
    document.getElementById('username').innerHTML = username;
    document.getElementById('dashboard-username').innerHTML = username;
    let letter = username.charAt(0).toUpperCase();
    loadAvatar('sidebar-avatar', letter);
    document.getElementById('account-type').innerHTML = 'Quản trị viên';
}
loadAccount();
function partOfDay() {
    var partOfDay = document.getElementById('part-of-day');
    var time = new Date();
    var hour = time.getHours();
    if (5 <= hour && hour <= 11) {
        partOfDay.innerHTML = 'buổi sáng';
        partOfDay.classList.add('morning');
    } else if (12 <= hour && hour <= 16) {
        partOfDay.innerHTML = 'buổi trưa';
        partOfDay.classList.add('afternoon');
    } else if (17 <= hour && hour <= 20) {
        partOfDay.innerHTML = 'buổi chiều';
        partOfDay.classList.add('evening');
    } else {
        partOfDay.innerHTML = 'buổi tối';
        partOfDay.classList.add('night');
    }
}
partOfDay();
function separate(number) {
    return number.toLocaleString("vi-VN");
}
let orderHistory = localStorage.getItem("orderHistory");
if (!orderHistory) {
    let orderHistoryFile = [];
    localStorage.setItem("orderHistory", JSON.stringify(orderHistoryFile));
}
function loadOrderHistory() {
    document.getElementById('order-history').innerHTML = 
    `
        <tr>
            <th>Món ăn</th>
            <th>Tổng số lượng</th>
            <th>Người đặt mới nhất</th>
            <th>Thời gian gần nhất</th>
        </tr>
    `;
    let totalOrdered = 0;
    let mostOrdered = 'Chưa có dữ liệu';
    let mostOrderedAmount = undefined;
    let leastOrdered = 'Chưa có dữ liệu';
    let leastOrderedAmount = undefined;
    let parsedOrderHistory = JSON.parse(localStorage.getItem('orderHistory'));
    parsedOrderHistory.forEach((item) => {
        let amount = parseInt(item.amount);
        let separatedAmount = separate(amount);
        document.getElementById('order-history').innerHTML += 
        `
            <tr>
                <td>${item.name}</td>
                <td>${separatedAmount}</td>
                <td>${item.latestUser}</td>
                <td>${item.latestTime}</td>
            </tr>
        `;

        totalOrdered += amount;
        if (mostOrderedAmount == undefined || mostOrderedAmount < amount) {
            mostOrdered = item.name;
            mostOrderedAmount = amount;
        }
        if (leastOrderedAmount == undefined || leastOrderedAmount >= amount) {
            leastOrdered = item.name;
            leastOrderedAmount = amount;
        }
    });
    document.getElementById('total-ordered').innerHTML = separate(totalOrdered);
    document.getElementById('most-ordered').innerHTML = mostOrdered;
    document.getElementById('least-ordered').innerHTML = leastOrdered;
}
loadOrderHistory();
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
let productList = localStorage.getItem("productList");
if (!productList) {
    location.href = './index.html';
}
function loadAllProducts() {
    document.getElementById('product-list').innerHTML = ``;
    let parsedProductList = JSON.parse(localStorage.getItem('productList'));
    parsedProductList.forEach((item,index) => {
        if (item.size == 'wide') {
            var sizeselect =
            `
                <select class="form-select" id="size${index}" onchange="enableProductButton(${index})">
                    <option value="medium">Cỡ vừa</option>
                    <option value="wide" selected>Cỡ rộng</option>
                </select>
            `;
        } else {
            var sizeselect =
            `
                <select class="form-select" id="size${index}" onchange="enableProductButton(${index})">
                    <option value="medium" selected>Cỡ vừa</option>
                    <option value="wide">Cỡ rộng</option>
                </select>
            `;
        }
        document.getElementById('product-list').innerHTML += 
        `
            <div class="info-product">
                <div class="product-image" style="background: url('${item.imageLink}') no-repeat; background-position: center; background-size: cover;">
                    <input class="input-index" id="productIndex${index}" value="${index}" oninput="enableProductButton(${index}); checkInputZero('productIndex${index}');">
                </div>
                <div class="product-content">
                    <div class="input-group mb-3">
                        <div class="input-group-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-type" viewBox="0 0 16 16">
                                <path d="m2.244 13.081.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z"/>
                            </svg>
                        </div>
                        <input type="text" class="form-control" placeholder="Tên" id="name${index}" value="${item.name}" oninput="enableProductButton(${index})" style="font-weight: 600">
                    </div>
                    <div class="row g-3">
                        <div class="input-group col mb-3">
                            <div class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
                                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                                    <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
                                </svg>
                            </div>
                            <input type="text" class="form-control" placeholder="Giá (VND)" id="price${index}" value="${item.price}" oninput="enableProductButton(${index}); checkInputNumber('price${index}');" style="font-weight: 600">
                        </div>
                        <div class="input-group col mb-3">
                            <div class="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                                </svg>
                            </div>
                            <input type="text" class="form-control" placeholder="Loại" id="type${index}" value="${item.type}" oninput="enableProductButton(${index})" style="font-weight: 600; color: #0D99FF">
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-justify-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </div>
                        <input type="text" class="form-control" placeholder="Mô tả" id="description${index}" value="${item.description}" oninput="enableProductButton(${index})">
                    </div>
                    <div class="input-group mb-3">
                        <div class="input-group-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                            </svg>
                        </div>
                        <input type="text" class="form-control" placeholder="Link ảnh" id="imageLink${index}" value="${item.imageLink}" oninput="enableProductButton(${index})">
                    </div>
                    <div style="display: flex; gap: 16px; justify-content: space-between; align-items: center;">
                        ${sizeselect}
                        <div style="display: flex; gap: 8px;">
                            <button class="button product-button button-disabled" disabled onclick="changeProduct(${index})" id="changeprod${index}">Lưu</button>
                            <button class="button product-button button-warning" onclick="deleteProduct(${index})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    document.getElementById('productListFile').value = localStorage.getItem('productList');
}
loadAllProducts();
function enableProductButton(prodIndex) {
    document.getElementById(`changeprod${prodIndex}`).classList.remove('button-disabled');
    document.getElementById(`changeprod${prodIndex}`).removeAttribute("disabled");
}
function changeProduct(prodIndex) {
    let parsedProductList = JSON.parse(localStorage.getItem('productList'));
    let currentName = parsedProductList[prodIndex].name;
    let newIndex = parseInt(document.getElementById(`productIndex${prodIndex}`).value);
    let newName = document.getElementById(`name${prodIndex}`).value;
    let newPrice = document.getElementById(`price${prodIndex}`).value;
    let newType = document.getElementById(`type${prodIndex}`).value;
    let newDescription = document.getElementById(`description${prodIndex}`).value;
    let newImageLink = document.getElementById(`imageLink${prodIndex}`).value;
    let newSize = document.getElementById(`size${prodIndex}`).value;
    let allowChange = true;
    if (validateProduct(newName,newPrice,newType,newDescription,newImageLink)) {
        if (newName != currentName) {
            parsedProductList.forEach(item => {
                if (newName == item.name) {
                    showNotification('availableproduct');
                    allowChange = false;
                }
            });
        }
    } else {
        showNotification('fillinall');
        allowChange = false;
    }
    if (allowChange) {
        var product = {
            name: newName,
            price: newPrice,
            type: newType,
            description: newDescription,
            imageLink: newImageLink,
            size: newSize,
        };
        if (0 <= newIndex && newIndex < parsedProductList.length) {
            parsedProductList.splice(prodIndex, 1);
            parsedProductList.splice(newIndex, 0, product);
            localStorage.setItem("productList",JSON.stringify(parsedProductList));
            loadAllProducts();
            showNotification('changeproductinfo');
        } else {
            showNotification('invalidindex');
        }
    }
}
function deleteProduct(prodIndex) {
    if (confirm('Bạn có chắc bạn muốn xoá món ăn không?')) {
        let parsedProductList = JSON.parse(localStorage.getItem('productList'));
        parsedProductList.splice(prodIndex, 1);
        localStorage.setItem("productList",JSON.stringify(parsedProductList));
        loadAllProducts();
        showNotification('deleteproduct');
    }
}
function createProduct() {
    let name = document.getElementById('product-name-input').value;
    let price = document.getElementById('product-price-input').value;
    let type = document.getElementById('product-type-input').value;
    let description = document.getElementById('product-description-input').value;
    let imageLink = document.getElementById('product-image-link-input').value;
    let size = document.getElementById('product-size-input').value;
    let allowCreate = true;
    if (validateProduct(name,price,type,description,imageLink)) {
        var parsedProductList = JSON.parse(localStorage.getItem('productList'));
        if (parsedProductList != null) {
            parsedProductList.forEach(item => {
                if (name == item.name) {
                    showNotification('availableproduct');
                    allowCreate = false;
                }
            });
        }
        if (allowCreate) {
            var product = {
                name: name,
                price: price,
                type: type,
                description: description,
                imageLink: imageLink,
                size: size,
            };
            parsedProductList.push(product);
            localStorage.setItem("productList",JSON.stringify(parsedProductList));
            showNotification('createproduct');
            document.getElementById("cancelProductModal").click();
            loadAllProducts();
            setTimeout(function () {
                document.getElementById('product-name-input').value = '';
                document.getElementById('product-price-input').value = '';
                document.getElementById('product-type-input').value = '';
                document.getElementById('product-description-input').value = '';
                document.getElementById('product-image-link-input').value = '';
                document.getElementById('product-size-input').value = 'medium';
            }, 500);
        }
    } else {
        showNotification('fillinall');
    }
}
function validateProduct(name,price,type,description,imageLink) {
    if (!name || !price || !type || !description || !imageLink) {
        return false;
    } else {
        return true;
    }
}
function loadAllAccounts() {
    document.getElementById('account-list').innerHTML = 
    `
        <tr>
            <th>Username/email</th>
            <th>Mật khẩu</th>
            <th>Loại tài khoản</th>
            <th colspan="2">Hành động</th>
        </tr>
    `;
    let accountsJson = JSON.parse(localStorage.getItem("Acc"));
    accountsJson.forEach((item,index) => {
        let type = (item.type == 'admin' ? 'Quản trị viên' : 'Khách hàng');
        document.getElementById('account-list').innerHTML += 
        `
            <tr>
                <td><input placeholder="Username hoặc email" id="username${index}" value="${item.username}" oninput="enableAccountButton(${index})"></td>
                <td><input type="password" placeholder="Mật khẩu mới" id="password${index}" oninput="enableAccountButton(${index})"></td>
                <td class="account-list-text">${type}</td>
                <td class="account-list-button-container">
                    <button class="button account-list-button button-disabled" disabled onclick="changeAccount(${index})" id="changeacc${index}">Lưu</button>
                </td>
                <td class="account-list-button-container">
                    <button class="button account-list-button button-warning" onclick="deleteAccount(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                    </button>
                </td>
            </tr>
        `;
    });
}
loadAllAccounts();
function enableAccountButton(accIndex) {
    document.getElementById(`changeacc${accIndex}`).classList.remove('button-disabled');
    document.getElementById(`changeacc${accIndex}`).removeAttribute("disabled");
}
function changeAccount(accIndex) {
    let loginUsername = localStorage.getItem('userLogin');
    let accountsJson = JSON.parse(localStorage.getItem("Acc"));
    let currentUsername = accountsJson[accIndex].username;
    let newUsername = document.getElementById(`username${accIndex}`).value;
    let currentPassword = accountsJson[accIndex].password;
    let newPassword = document.getElementById(`password${accIndex}`).value;
    let type = accountsJson[accIndex].type;
    let allowChange = true;
    if (newUsername == '') {
        showNotification('fillin');
        allowChange = false;
    } else {
        if (newUsername != currentUsername) {
            accountsJson.forEach(item => {
                if (newUsername == item.username) {
                    showNotification('availableaccount');
                    allowChange = false;
                }
            });
        }
    }
    if (allowChange) {
        if (newPassword == '') {
            var acc = {
                username: newUsername,
                password: currentPassword,
                type: type
            };
        } else {
            var acc = {
                username: newUsername,
                password: newPassword,
                type: type
            };
        }
        accountsJson.splice(accIndex, 1, acc);
        localStorage.setItem("Acc",JSON.stringify(accountsJson));
        if (currentUsername == loginUsername) {
            localStorage.setItem("userLogin",newUsername);
            setTimeout(function () {
                location.reload();
            }, 2000);
        }
        loadAllAccounts();
        showNotification('changeaccountinfo');
    }
}
function deleteAccount(accIndex) {
    if (confirm('Bạn có chắc bạn muốn xoá tài khoản không?')) {
        let username = localStorage.getItem('userLogin');
        let accountsJson = JSON.parse(localStorage.getItem("Acc"));
        let usernamedelete = accountsJson[accIndex].username;
        accountsJson.splice(accIndex, 1);
        localStorage.setItem("Acc",JSON.stringify(accountsJson));
        loadAllAccounts();
        showNotification('deleteaccount');
        if (username == usernamedelete) {
            setTimeout(function () {
                logout();
            }, 2000);
        }
    }
}
let createAccount = () => {
    let username = document.getElementById('username-input').value;
    let password = document.getElementById('password-input').value;
    let conFirm = document.getElementById('confirm-password-input').value;
    let allowCreate = true;
    if (validateAccount(username,password,conFirm)) {
        if (password == conFirm) {
            var accLocal = JSON.parse(localStorage.getItem('Acc'));
            if (accLocal != null) {
                accLocal.forEach(item => {
                    if (username == item.username) {
                        showNotification('availableaccount');
                        allowCreate = false;
                    }
                });
            }
            if (allowCreate) {
                if (username == 'admin') {
                    var acc = {
                        username: username,
                        password: conFirm,
                        type: 'admin'
                    };
                } else {
                    var acc = {
                        username: username,
                        password: conFirm,
                        type: 'user'
                    };
                }
                accLocal.push(acc);
                localStorage.setItem("Acc",JSON.stringify(accLocal));
                showNotification('createaccount');
            }
        } else {
            showNotification('passwordmatch');
            allowCreate = false;
            return;
        }
        if (allowCreate) {
            document.getElementById("cancelAccountModal").click();
            loadAllAccounts();
            setTimeout(function () {
                document.getElementById('username-input').value = '';
                document.getElementById('password-input').value = '';
                document.getElementById('confirm-password-input').value = '';
            }, 500);
        }
    } else {
        showNotification('fillinall');
    }
}
let validateAccount = (username,pass,conFirm) => {
    if (!username || !pass || !conFirm) {
        return false;
    } else {
        return true;
    }
}
function logout() {
    localStorage.setItem('hadLogged','false');
    localStorage.removeItem('userLogin');
    location.reload();
}
function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    let content = document.getElementById("content");
    sidebar.classList.toggle('sidebar-hidden');
    content.classList.toggle('content-full');
    document.getElementById('sidebar-dim').classList.toggle('hidden');
    document.getElementById('toolbar-title').classList.toggle('hamburger-space');
}
function changePage(pageNumber) {
    var pages = ['page-1', 'page-2', 'page-3'];
    var currenttab = pageNumber + '-tab';
    currentPage = pageNumber;

    for (let i = 0; i < (pages.length); i++) {
        document.getElementById(pages[i] + '-tab').classList.replace("sidebar-tab-selected", "sidebar-tab");
    }
    document.getElementById(currenttab).classList.replace("sidebar-tab", "sidebar-tab-selected");

    for (let i = 0; i < pages.length; i++) {
        document.getElementById(pages[i]).classList.add("hidden");
    }
    document.getElementById(pageNumber).classList.remove("hidden");

    if (pageNumber == 'page-1') {
        document.getElementById('toolbar-title').innerHTML = 'Bảng điều khiển';
    } else {
        document.getElementById('toolbar-title').innerHTML = document.getElementById(pageNumber + '-title').innerHTML;
    }

    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
    document.getElementById('content').scroll(0, 0);
}
changePage('page-1');
function checkScroll() {
    if (document.getElementById('content').scrollTop >= 36) {
        document.getElementById('toolbar-title').classList.remove('invisible');
        document.getElementById('content-toolbar').classList.add('toolbar-scrolled');
    } else {
        document.getElementById('toolbar-title').classList.add('invisible');
        document.getElementById('content-toolbar').classList.remove('toolbar-scrolled');
    }
}
document.getElementById('content').addEventListener('scroll', checkScroll);