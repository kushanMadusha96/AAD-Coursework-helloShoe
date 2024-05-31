//handle supplier ids list
$("#customerId-selector").on('click', function () {
    $("#customerId-list").css('display', 'block');
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

$(document).on('click', '#customerId-list button', function () {
    $("#supplierId").val($(this).text());
    $("#supplierName").val($(this).next(".supName").text());
})