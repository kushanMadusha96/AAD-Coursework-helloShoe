import {saveItem, updateItem, deleteItem, getAllItems} from "../api/ItemAPI.js";
import {ItemModel} from "../model/ItemModel.js";

let allItems = [];

//handle popup
$("body").click(function (event) {
    if (!$(event.target).closest('#supplierId').length) {
        $("#supplierId-list").css('display', 'none');
    }
});

//when document ready should be done
$(document).ready(async function () {
    allItems = await getAllItems();
    loadAllItems(allItems);
    $(":input").attr('autocomplete', 'off');
    setAllSupplierIds();
});

//add and update popup handle
$("#btn-add-item-popup").on('click', function () {
    $(".item-add-update-container").css('display', 'flex');
    $("#btn-add-item-popup").css('display', 'none');
});

$("#btn-remove-item-popup").on('click', function () {
    $(".item-add-update-container").css('display', 'none');
    $("#btn-add-item-popup").css('display', 'block');
})

// set details of clicking raw
let selectedEditItemCode;
$(document).on('click', '#item-detail-table-body tr', function () {
    selectedEditItemCode = $(this).closest("tr").find(".itemCode").text();

    let gender = $(this).closest("tr").find(".itemCategory").text().slice(2, 3) === "M" ? "Male" : "Female";
    let verity = $(this).closest("tr").find(".itemCategory").text().slice(1, 2) === "H" ? "Heel" : "F" ? "Flats" : "W" ? "Wedges" : "FF" ? "Flip Flops" : "SD" ? "Sandals" : "S" ? "Shoes" : "SL" ? "Slippers" : "";
    let occasion = $(this).closest("tr").find("itemCategory").text().slice(0, 1) === "F" ? "Formal" : "C" ? "Casual" : "I" ? "Industrial" : "S" ? "Sport" : "";

    $("#itemName").val($(this).closest("tr").find(".itemName").text());
    $("#select-gender").val(gender);
    $("#select-verity").val(verity);
    $("#select-occasion").val(occasion);
    $("#unitPriceBuy").val($(this).closest("tr").find(".buyingPrice").text());
    $("#profitMargin").val($(this).closest("tr").find(".profitMargin").text());
    $("#expectedProfit").val($(this).closest("tr").find(".expectedProfit").text());
    $("#unitPriceSell").val($(this).closest("tr").find(".sellingPrice").text());
    $("#supplierId").val($(this).closest("tr").find(".supplierCode").text());
    $("#supplierName").val($(this).closest("tr").find(".supplierName").text());
    $("#itemCode").val($(this).closest("tr").find(".itemCode").text());

    $("#item-save-btn").css('display', 'none');
    $("#item-update-btn").css('display', 'block');
    $("#item-remove-btn").css('display', 'block');
});

//clear inputs
const clearInputs = () => {
    $("#itemCode").val('');
    $("#itemName").val('');
    $("#unitPriceBuy").val('');
    $("#unitPriceSell").val('');
    $("#supplierId").val('');
    $("#expectedProfit").val('');
    $("#profitMargin").val('');
    $("#select-gender").val('Male');
    $("#supplierName").val('');
    $("#select-verity").val('');
    $("#select-occasion").val('');
}

// making table and loading data
function loadingData(item) {
    return $("#item-detail-table-body").append(`<tr>
                <td class="itemPicture"><img src="assets/shoe.webp" width="50px" height="50px"></td>
                <td>
                    <span class="itemName">${item.itemName}</span><br>
                    <span class="itemCode">${item.itemCode}</span>
                </td>
                 <td>
                    <span class="supplierName">${item.supplierName}</span><br>
                    <span class="supplierCode">${item.supplierCode}</span>
                </td>
                <td class="itemCategory">${item.itemCategory}</td>
                <td class="itemSize">
                    <button style="border-radius: 50px;border: none">5</button>
                    <button style="border-radius: 50px;border: none">6</button>
                    <button style="border-radius: 50px;border: none">7</button>
                    <button style="border-radius: 50px;border: none">8</button>
                    <button style="border-radius: 50px;border: none">9</button>
                    <button style="border-radius: 50px;border: none">10</button>
                    <button style="border-radius: 50px;border: none">11</button>
                </td>
                <td class="remainQty">${item.remainQty}</td>
                <td class="buyingPrice">${item.unitPriceBuy}</td>
                <td class="sellingPrice">${item.unitPriceSale}</td>
                <td class="expectedProfit">${item.expectedProfit}</td>
                <td class="profitMargin">${item.profitMargin}</td>
                <td class="status">${item.status}</td>
                <td class="action-td">
                    <button><i class="fa-solid fa-trash-can fa-lg" style="color: #f50529;"></i></button>
                </td>
            </tr>`)
}

//search item
// $(".sup-search-input").on('input', async function () {
//     $("#sup-table-body").empty();
//     allSuppliers.map((supplier) => {
//         if (supplier.supplierCode.toLowerCase().startsWith($(".sup-search-input").val().toLowerCase()) || supplier.supplierName.toLowerCase().startsWith($(".sup-search-input").val().toLowerCase()) || supplier.email.toLowerCase().startsWith($(".sup-search-input").val().toLowerCase()) || supplier.contact1.toLowerCase().startsWith($(".sup-search-input").val().toLowerCase()) || supplier.contact2.toLowerCase().startsWith($(".sup-search-input").val().toLowerCase())) {
//             loadingData(supplier)
//         }
//     })
// })

//save item
$("#item-save-btn").on("click", async function () {
    await saveItem(new ItemModel(null, $("#itemName").val(), null, $("#select-occasion").val().charAt(0) + $("#select-verity").val().charAt(0) + $("#select-gender").val().charAt(0), {
        "size_5": 9, "size_6": 10, "size_7": 11, "size_8": 12, "size_9": 13, "size_10": 14, "size_11": 15
    }, $("#supplierId").val(), $("#supplierName").val(), $("#unitPriceSell").val(), $("#unitPriceBuy").val(), $("#expectedProfit").val(), $("#profitMargin").val(), null, null, null))
    clearInputs();
    allItems = await getAllItems();
    loadAllItems(allItems);
});

//update item
$("#item-update-btn").on("click", async function () {
    let updatedItem = new ItemModel(null, $("#itemName").val(), null, $("#select-occasion").val().charAt(0) + $("#select-verity").val().charAt(0) + $("#select-gender").val().charAt(0), {
        "size_5": 9, "size_6": 10, "size_7": 11, "size_8": 12, "size_9": 13, "size_10": 14, "size_11": 15
    }, $("#supplierId").val(), $("#supplierName").val(), $("#unitPriceSell").val(), $("#unitPriceBuy").val(), $("#expectedProfit").val(), $("#profitMargin").val(), 0, 0, null)
    await updateItem(updatedItem, selectedEditItemCode);
    clearInputs();
    allItems = await getAllItems();
    loadAllItems(allItems);
});

// load all items to table
const loadAllItems = (allItems) => {
    $("#item-detail-table-body").empty();
    allItems.map((item) => {
        loadingData(item)
    })
}

//remove item by table btn
$(document).on('click', '.action-td button', async function () {
    let selectedItemCode = $(this).closest("tr").find(".itemCode").text();
    await deleteItem(selectedItemCode);
    allItems = await getAllItems();
    loadAllItems(allItems);
})
//remove item by remove btn
$("#item-remove-btn").on('click', async function () {
    await deleteItem(selectedEditItemCode);
    allItems = await getAllItems();
    loadAllItems(allItems);
})

//handle supplier ids list
$("#supplierId").on('click', function () {
    $("#supplierId-list").css('display', 'block');
})
//    set all supplier ids
const setAllSupplierIds = async () => {
    allItems = await getAllItems();
    $("#supplierId-list").empty();
    allItems.map((item) => {
        $("#supplierId-list").append(`
            <button class="supCode">${item.supplierCode}</button>
            <span style="display: none" class="supName">${item.supplierName}</span>
        `)
    })
}

$(document).on('click', '#supplierId-list button', function () {
    $("#supplierId").val($(this).text());
    $("#supplierName").val($(this).next(".supName").text());
})