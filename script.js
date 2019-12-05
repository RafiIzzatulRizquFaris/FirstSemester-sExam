//Variable Initialization
let totalPrice = 0
let harga = 0
let pajak = 0
let selectedService


//All Data
let coffeeData = [
    ["Iced Shaken Tea", 46000, "icedshakentea.jpg", "Teh Tarik measures around 25-30ml. This drink sells for Rp. 46,000 and only available in tall sizes."],
    ["Caffe Americano", 37000, "caffeamericano.jpg", "Basically, Americano coffee is espresso mixed with hot water. This drink is sold by Starbucks at a price of Rp. 32,000 for a tall size, Rp. 35,000 for the grande size, and Rp. 37,000 for venti size."],
    ["Caramel Macchiato", 63000, "caramelmacchiato.jpg", "This delicious hot or cold drink is a mixture of hot milk, vanilla syrup and espresso. Caramel syrup is also poured on milk foam found on the surface of this drink. Slightly more expensive, caramel macchiato sells for Rp. 54,000 for the tall size, Rp. 59,000 for the grande, and Rp. 63,000 for venti."],
    ["Asian Dolce Latte", 57000, "asiandolcelatte.jpg", "Specifically sold in the Asia Pacific, Asian Dolce has a composition of two espresso shots, a mixture of several types of milk that gives its own unique texture, and dolce sauce. Dolce sauce specially designed for this drink has a slightly similar taste to sweetened condensed milk. For tall size, this drink is sold for Rp. 50,000, while for the grande size of Rp. 54,000 and Rp. 57,000."],
    ["Caffe Latte", 49000, "caffelatte.jpg", "The plain version of the latte of various flavors above only consists of espresso shot and milk is sold at a slightly cheaper price. Tall glass orders are charged at Rp. 42,000, while grande and venti glasses are charged Rp. 46,000 and Rp. 49,000."],
    ["Caffe Mocha", 57000, "caffemocha.jpg", "This delicious drink consists of espresso shots, milk and mocha syrup. The price of caffe mocha at Starbucks right now is Rp. 50,000 for a tall glass, Rp. 54,000 for the grande, and Rp. 57,000 for venti."],
    ["Vanilla Latte", 55000, "vanillalatte.jpg", "The three drinks sold at the same price are basically espresso shots with milk, which are distinguished by the type of syrup added. Thus, customers can order custom lattes simply by choosing a different type of syrup, such as toffee nut or cinnamon dolce. These various lattes sell for Rp. 48,000 for tall size, Rp. 52,000 for the grande, and Rp. 55,000 for venti."],
    ["Caramel Latte", 55000, "caramellatte.jpg", "The three drinks sold at the same price are basically espresso shots with milk, which are distinguished by the type of syrup added. Thus, customers can order custom lattes simply by choosing a different type of syrup, such as toffee nut or cinnamon dolce. These various lattes sell for Rp. 48,000 for tall size, Rp. 52,000 for the grande, and Rp. 55,000 for venti."],
    ["Hazelnut Latte", 55000, "hazelnutlatte.jpg", "The three drinks sold at the same price are basically espresso shots with milk, which are distinguished by the type of syrup added. Thus, customers can order custom lattes simply by choosing a different type of syrup, such as toffee nut or cinnamon dolce. These various lattes sell for Rp. 48,000 for tall size, Rp. 52,000 for the grande, and Rp. 55,000 for venti."]
]
let trolley = []
let detail = []


//Pushing Data
function lookDetail(name, price, image, description) {
    let pushData = [name, price, image, description]
    detail.push(pushData)
    detailClick()
}

function itemClick(name, price, image) {
    for (let i = 0; i < trolley.length; i++) {
        if (name == trolley[i][0]) {
            trolley[i][3] += 1
            showInvoice()
            return
        }
    }
    let pushData = [name, price, image, 1]
    trolley.push(pushData)
    showInvoice()
}

coffeeData.forEach(data => {
    const itemLayout = `
    <div class="col-md-3 order mb-5">
    <div class="card border border-primary border-radius rounded-lg">
      <img src="image/${data[2]}" class="card-img-top" width="160px" height="120px">
      <div class="card-body">
        <h5 class="card-title" id="card-title">${data[0]}</h5>
        <p class="card-text price font-weight-bold text-primary" id="price">Rp. ${data[1]}</p>
        <button type="button" class="btn btn-success btn-sm btn-block" onclick="itemClick('${data[0]}',${data[1]},'${data[2]}')">Buy</button>
        <button type="button" class="btn btn-secondary btn-sm btn-block" data-toggle="modal" data-target="#detailModalCenter" onclick="lookDetail('${data[0]}',${data[1]},'${data[2]}','${data[3]}')">Detail</button>
      </div>
    </div>
  </div>
    `
    $("#menuHolder").append(itemLayout)
})


//Layout Detail
function detailClick() {
    $("#modalBody").html("")
    detail.forEach(data => {
        const itemLayout = `
    <div class="row">
      <div class="col-sm-12">
        <div class="row">
          <div class="col-8 col-sm-6">
            <img src="image/${data[2]}" class="card-img-top">
          </div>
          <div class="col-4 col-sm-6">
            <h1>${data[0]}</h1><br>Rp. ${data[1]}
          </div>
          <div class="col-12 col-sm-12 mt-1">
            ${data[3]}
          </div>
        </div>
      </div>
    </div>
    `
        $("#modalBody").append(itemLayout)
    })
}


//Layout Cart
function showInvoice() {
    $("#orderHolder").html("")
    trolley.forEach(data => {
        const itemLayout = `
        <div class="media mb-3">
            <img src="image/${data[2]}" class="mr-3" width="100">
            <div class="media-body">
            <h5 class="mt-0">${data[0]}</h5>
            <span style="float: left;"><input type="number" class="quantity" value="${data[3]}"></span>
            <span id="cart-price" class="cart-price ml-2">Rp.${data[1]}</span>
            </div>    
            <span><button class="btn btn-sm btn-danger" id="deleteItem">x</button></span>
        </div>
        `
        $('#orderHolder').append(itemLayout)
        harga += data[1] * data[3]
    })
    pajak = harga * 10 / 100
    totalPrice = harga + pajak
    $('#subTotal').text(harga)
    $('#total').text(totalPrice)
    $('#tax').text(pajak)
}


//Layout Invoice
$("#payment").on('click', function () {
    $("#invoiceHolder").html("")
    for (let i = 0; i < trolley.length; i++) {
        const itemCartLayout = `
        <div class="media p-2 mb-1">
        <img src="image/${trolley[i][2]}" class="mr-3">
        <div class="media-body d-flex">
            <h5 class="col-8 align-baseline mt-0 mb-0">${trolley[i][0]}</h5>
            <h6 class=""><span class="badge align-baseline badge-success">x${trolley[i][3]}</span></h6>
            <h6 class="col-sm align-baseline mb-0 ml-2">Rp ${(trolley[i][1] * trolley[i][3])}</}</h6>
        </div>
        </div>`
        $("#invoiceHolder").append(itemCartLayout)
    }
    $("#MSubTotal").text(harga)
    $("#MTax").text(pajak)
    $("#MTotal").text(totalPrice)
    $("#serveWith").text(selectedService)
})


//'Service' Button
$("#serveList a").on('click', function () {
    selectedService = ($(this).text())
})


//Payment Process
$("#btnPay").on('click', function () {
    let inputCash = Number($("#inputPayment").val())
    let totalBill = Number($("#MTotal").text())
    let outputChange = $("#outputChange")
    if (inputCash == totalBill || inputCash > totalBill) {
        let moneyChange = inputCash - totalBill
        $("#outputChange").text(moneyChange)
    } else if (inputCash < totalBill) {
        outputChange.text("Sorry, the money you put is not enough")
    } else {
        outputChange.text("Please Fill All Input Field")
    }
})


//Cancelation Button
$("#orderHolder").on('click', '#deleteItem', function () {
    let position = $('#deleteItem ').index(this)
    trolley.splice(position, 1)
    showInvoice()
    emptyTrolley()
})

$("#btnCancel").on('click', function () {
    emptyArray(trolley)
    showInvoice()
    emptyTrolley()
})

$("#detailClose").on('click', function () {
    emptyArray(detail)
})


//Function Empty
function emptyTrolley() {
    if (trolley.length == 0) {
        $('#subTotal').text("0")
        $('#total').text("0")
        $('#tax').text("0")
    }
}

function emptyArray(namaArray) {
    while (namaArray.length > 0) {
        namaArray.pop()
    }
}