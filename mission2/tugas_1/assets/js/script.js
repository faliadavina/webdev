// Definisikan kelas Item
class Item {
    constructor(id, imgSrc, name, price) {
        this.id = id;
        this.imgSrc = imgSrc;
        this.name = name;
        this.price = price;
        this.quantity = 0;
    }

    decrementQuantity() {
        if (this.quantity > 0) {
            this.quantity--;
        }
    }

    incrementQuantity() {
        this.quantity++;
    }
}

// Data konten item
var items = [
    new Item(1, "assets/img/produk1.jpg", "Soda", 10000),
    new Item(2, "assets/img/produk2.jpg", "Plate", 20000),
    new Item(3, "assets/img/produk3.jpg", "Candle", 30000),
    new Item(4, "assets/img/produk3.jpg", "Diffuser", 35000),
    new Item(5, "assets/img/produk1.jpg", "Cola", 18000),
    new Item(6, "assets/img/produk2.jpg", "Leav", 8000),
];

// Fungsi untuk menampilkan item pada halaman
function displayItems() {
    var itemList = document.getElementById("item-list");
    itemList.innerHTML = "";

    items.forEach(function (item) {
        var itemDiv = document.createElement("div");
        itemDiv.className = "card mb-3";
        itemDiv.innerHTML = `
            <div class="card-body">
                <img src="${item.imgSrc}" class="img-item" alt="">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Rp. ${item.price}</p>
                <center>
                <div class="quantity">
                <span class="minus" onclick="decrementQuantity(${item.id})">&minus;</span>
                <span class="num" id="quantity-${item.id}">${item.quantity}</span>
                <span class="plus" onclick="incrementQuantity(${item.id})">&plus;</span>
                </div>
                <button class="btn btn-success" onclick="addToCart(${item.id})">Tambah Barang</button>
                </center>
            </div>
        `;
        itemList.appendChild(itemDiv);
    });
}

// Fungsi untuk menambahkan item ke keranjang
var cart = [];
function addToCart(itemId) {
    var selectedItem = items.find(function (item) {
        return item.id === itemId;
    });

    if (selectedItem) {
        selectedItem.incrementQuantity();
        cart.push(selectedItem);
        updateCart();
    }
}

// Fungsi untuk menambah kuantitas item dalam keranjang
function incrementQuantity(itemId) {
    var selectedItem = items.find(function (item) {
        return item.id === itemId;
    });

    if (selectedItem) {
        selectedItem.incrementQuantity();
        updateQuantityDisplay(itemId);
        updateCart();
    }
}

// Fungsi untuk mengurangi kuantitas item dalam keranjang
function decrementQuantity(itemId) {
    var selectedItem = items.find(function (item) {
        return item.id === itemId;
    });

    if (selectedItem) {
        selectedItem.decrementQuantity();
        updateQuantityDisplay(itemId);
        updateCart();
    }
}

// Fungsi untuk mengupdate tampilan keranjang
function updateCart() {
    var cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = "";

    var total = 0;
    cart.forEach(function (item) {
        var cartItemDiv = document.createElement("div");
        cartItemDiv.className = "card mb-3";
        cartItemDiv.innerHTML = `
            <div class="card-body">
                <img src="${item.imgSrc}" class="img-item" alt="">
                <h5 class="card-title">${item.name} (Qty: ${item.quantity})</h5>
                <p>Pajak 11%   :  Rp. ${item.price * item.quantity *11/100}</p>
                <p class="card-text">Rp. ${item.price * item.quantity}</p>
                
            </div>
        `;
        cartContainer.appendChild(cartItemDiv);

        pajak = item.price * item.quantity *11/100;
        total += item.price * item.quantity + pajak;
    });

    var totalElement = document.getElementById("total");
    totalElement.textContent = "Rp. " + total;
}

// Fungsi untuk mengupdate tampilan kuantitas
function updateQuantityDisplay(itemId) {
    var quantityDisplay = document.getElementById(`quantity-${itemId}`);
    var selectedItem = items.find(function (item) {
        return item.id === itemId;
    });

    if (quantityDisplay && selectedItem) {
        quantityDisplay.textContent = selectedItem.quantity;
    }
}

// Memanggil fungsi pertama kali
displayItems();
