import {saveSupplier, updateSupplier, deleteSupplier, getAllSuppliers} from "../api/SupplierAPI.js";
import {SupplierModel} from "../model/SupplierModel.js";

let allSuppliers = [];
let localSuppliers = [];
let internationalSuppliers = [];

//popup handle
$("#btn-add-sup-popup").on('click', function () {
    clearInputs();
    $(".sup-popup").css("display", "block");
})
$(".btn-sup-update").on('click', function () {
    $(".sup-popup").css("display", "block");
})
$("#btn-sup-popup-remove").on('click', function () {
    clearInputs();
    $(".sup-popup").css("display", "none");
})

//when document ready should be done
$(document).ready(async function () {
    // Prevent form submission on pressing Enter key
    $('.emp-save-form').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
        }
    });
    allSuppliers = await getAllSuppliers();
    loadAllSuppliers(allSuppliers);
    await filteringSuppliers();
    eachCustomerCountForLabel()
    $(":input").attr('autocomplete', 'off');
});

// each customer counts for label
const eachCustomerCountForLabel = () => {
    $(".suppliers-lbl").eq(0).text(internationalSuppliers.length);
    $(".suppliers-lbl").eq(1).text(localSuppliers.length);
}

// supplier edit icon fire
$(document).on('click', '.btn-sup-update', function () {
    selectedEditSupplierCode = $(this).closest("tr").find(".supplierCode").text();

    $("#sup-popup-header").text("UPDATE SUPPLIER");
    $("#sup-save-update-btn").text("Update Supplier");
    $("#supplierName").val($(this).closest("tr").find(".supplierName").text());
    $("#sup-category").val($(this).closest("tr").find(".supplierCategory").text().toLowerCase());
    $("#sup-email").val($(this).closest("tr").find(".supplierEmail").text());
    $("#sup-addressLine1").val($(this).closest("tr").find(".supplierAddress1").text());
    $("#sup-addressLine2").val($(this).closest("tr").find(".supplierAddress2").text());
    $("#sup-addressLine3").val($(this).closest("tr").find(".supplierAddress3").text());
    $("#sup-addressLine4").val($(this).closest("tr").find(".supplierAddress4").text());
    $("#sup-addressLine5").val($(this).closest("tr").find(".supplierAddress5").text());
    $("#sup-addressLine6").val($(this).closest("tr").find(".supplierAddress6").text());
    $("#sup-contactNo1").val($(this).closest("tr").find(".supplierContact1").text());
    $("#sup-contactNo2").val($(this).closest("tr").find(".supplierContact2").text());

    $(".sup-popup").css("display", "block");
});

//clear inputs
const clearInputs = () => {
    $("#supplierName").val('');
    $("#sup-category").val('local');
    $("#sup-email").val('');
    $("#sup-addressLine1").val('');
    $("#sup-addressLine2").val('');
    $("#sup-addressLine3").val('');
    $("#sup-addressLine4").val('');
    $("#sup-addressLine5").val('');
    $("#sup-addressLine6").val('');
    $("#sup-contactNo1").val('');
    $("#sup-contactNo2").val('');
}

// making card and loading data
function loadingData(supplier) {
    return $("#sup-table-body").append(`<tr>
           <td class="sup-name-id">
               <span class="supplierName">${supplier.supplierName}</span><br>
                <span class="supplierCode">${supplier.supplierCode}</span>
                </td>
                <td class="supplierCategory">${supplier.category.toLowerCase()}</td>
                <td><span class="supplierAddress1">${supplier.address1}</span><span class="supplierAddress2"> ${supplier.address2}</span><span class="supplierAddress3"> ${supplier.address3}</span><span class="supplierAddress4"> ${supplier.address4}</span><span class="supplierAddress5"> ${supplier.address5}</span><span class="supplierAddress6"> ${supplier.address6}</span></td>
                <td class="supplierContact1">${supplier.contact1}</td>
                <td class="supplierContact2">${supplier.contact2}</td>
                <td class="supplierEmail">${supplier.email}</td>
                <td class="sup-action-td">
                    <button class="btn-sup-remove"><i class="fa-solid fa-trash-can fa-lg" style="color: #f50529;"></i></button>
                    <button class="btn-sup-update"><i class="fa-solid fa-pen-to-square fa-lg"></i></button>
                </td>
            </tr>`)
}

//filtering suppliers
const filteringSuppliers = async () => {
    localSuppliers.length = 0;
    internationalSuppliers.length = 0;
    allSuppliers.map((supplier) => {
        supplier.category === "LOCAL" ? localSuppliers.push(supplier) : internationalSuppliers.push(supplier);
    });
    eachCustomerCountForLabel();
}

//loading filtered suppliers when click radio buttons
$('input[name="sup-option"]').change(async function () {
    await filteredSuppliersForContainer($(this).val());
});

const filteredSuppliersForContainer = async (ratioButtonValue) => {
    await loadAllSuppliers(ratioButtonValue === "local" ? localSuppliers : ratioButtonValue === "international" ? internationalSuppliers : allSuppliers);
}

//search customer
$(".sup-search-input").on('input', async function () {
    $("#sup-table-body").empty();
    allSuppliers.map((supplier) => {
        if (supplier.supplierCode.toLowerCase().startsWith($(".sup-search-input").val().toLowerCase()) || supplier.supplierName.toLowerCase().startsWith($(".sup-search-input").val().toLowerCase()) || supplier.email.toLowerCase().startsWith($(".sup-search-input").val().toLowerCase()) || supplier.contact1.toLowerCase().startsWith($(".sup-search-input").val().toLowerCase()) || supplier.contact2.toLowerCase().startsWith($(".sup-search-input").val().toLowerCase())) {
            loadingData(supplier)
        }
    })
})

//regex pattern
const namePattern = /^[A-Za-z\s\-']+$/;
const nameLengthPattern = /^[A-Za-z\s\-']{3,30}$/;
const contactPattern = /^(07[0125678]\d{7})$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const buildingNameOrNoPattern = /([A-Za-z0-9\s,#.-]+)/;
const lanePattern = /([A-Za-z0-9\s,-]*)/;
const cityPattern = /([A-Za-z\s]+)/;
const mainStatePattern = /([A-Za-z\s])/;
const postalCodePattern = /(\d{5}(-\d{4})?)/;
const countryPattern = /^[A-Za-z\s\-']+$/;

//error alert
function showValidationError(message) {
    Swal.fire({
        icon: 'error',
        text: message,
    });
}

function dataEffectMessage(icon, message) {
    Swal.fire({
        position: 'center',
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 2000,
    });
}

//save and update employee
let selectedEditSupplierCode;
$("#sup-save-update-btn").on("click", async function (event) {
    event.preventDefault();

    let supName = $("#supplierName").val();
    let supCategory = $("#sup-category").val().toUpperCase();
    let add1 = $("#sup-addressLine1").val();
    let add2 = $("#sup-addressLine2").val();
    let add3 = $("#sup-addressLine3").val();
    let add4 = $("#sup-addressLine4").val();
    let add5 = $("#sup-addressLine5").val();
    let add6 = $("#sup-addressLine6").val();
    let contact1 = $("#sup-contactNo1").val();
    let contact2 = $("#sup-contactNo2").val();
    let email = $("#sup-email").val();

    if (!supName || !supCategory || !add1 || !add2 || !add3 || !add5 || !add6 || !contact1 || !contact2 || !email) {
        showValidationError("Please fill in all fields correctly.");
        return;
    }

    if (!namePattern.test(supName)) {
        showValidationError("Name must start with a letter and can only include letters, hyphens, and apostrophes.");
        return;
    }
    if (!nameLengthPattern.test(supName)) {
        showValidationError("Name must include 3 - 30 letters");
        return;
    }
    if (!buildingNameOrNoPattern.test(add1)) {
        showValidationError("require your building no or name");
        return;
    }
    if (!lanePattern.test(add2)) {
        showValidationError("require your lane");
        return;
    }
    if (!cityPattern.test(add3)) {
        showValidationError("require your city");
        return;
    }
    if (!mainStatePattern.test(add4)) {
        showValidationError("enter valid state name");
        return;
    }
    if (!postalCodePattern.test(add5)) {
        showValidationError("require valid postal code");
        return;
    }
    if (!countryPattern.test(add6)) {
        showValidationError("require valid postal code");
        return;
    }
    if (!emailPattern.test(email)) {
        showValidationError("require valid email");
        return;
    }
    if (!contactPattern.test(contact1)) {
        showValidationError("require valid contact number for contact 1");
        return;
    }
    if (!contactPattern.test(contact2)) {
        showValidationError("require valid contact number for contact 2");
        return;
    }

    const suppliers = await getAllSuppliers();

    if ($("#sup-save-update-btn").text() === "Save Supplier") {
        if (-1 < suppliers.findIndex(item => item.email === $("#sup-email").val())) {
            showValidationError("this email all ready exit...");
            return;
        }

        const status = await saveSupplier(new SupplierModel(
            null,
            supName,
            supCategory,
            add1,
            add2,
            add3,
            add4,
            add5,
            add6,
            contact1,
            contact2,
            email
        ))
        status === 201 ? dataEffectMessage("success", "supplier save successfully") : dataEffectMessage('error', 'saved fail,please try again!');

    } else {
        let index = suppliers.findIndex(item => item.email === $("#sup-email").val());
        if (-1 < index) {
            if (suppliers[index].supplierCode != selectedEditSupplierCode) {
                showValidationError("this email all ready exit...");
                return;
            }
        }
        let updatedSupplier = new SupplierModel(
            null,
            supName,
            supCategory,
            add1,
            add2,
            add3,
            add4,
            add5,
            add6,
            contact1,
            contact2,
            email
        );
        const status = await updateSupplier(updatedSupplier, selectedEditSupplierCode);
        status === 200 ? dataEffectMessage("success", "supplier update successfully") : dataEffectMessage('error', 'update fail,please try again!');
    }
    clearInputs();
    allSuppliers = await getAllSuppliers();
    loadAllSuppliers(allSuppliers);
    $(".sup-popup").css("display", "none")
    await filteringSuppliers();
});

// load all suppliers to container
const loadAllSuppliers = (selectedSuppliers) => {
    $("#sup-table-body").empty();
    selectedSuppliers.map((supplier) => {
        loadingData(supplier)
    })
}

//remove customer
$(document).on('click', '.btn-sup-remove', async function () {
    let selectedSupplier = $(this).closest("tr").find(".supplierCode").text();

    await Swal.fire({
        title: `Do you want to remove this supplier : ${selectedSupplier}?`,
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`
    }).then(async (result) => {
        if (result.isConfirmed) {
            const status = await deleteSupplier(selectedSupplier);
            if (status === 204) {
                allSuppliers = await getAllSuppliers();
                loadAllSuppliers(allSuppliers);
                await filteringSuppliers();
                Swal.fire("supplier deleted!", "", "success");
            } else {
                Swal.fire("supplier not deleted!", "", "error");
            }
        } else if (result.isDenied) {
            Swal.fire("ok, not deleted supplier", "", "info");
        }
    });
})
