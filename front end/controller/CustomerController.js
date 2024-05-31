import {CustomerModel} from "../model/CustomerModel.js";
import {UpdateCustomerModel} from "../model/UpdateCustomerModel.js";
import {
    saveCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
    becomeLoyaltyCustomer,
    addPointAndMarkRecentPurchaseDateAndLevelForCustomer
} from "../api/CustomerAPI.js";

let allCustomers = [];
let normalCustomers = [];
let loyaltyCustomers = [];

//regex pattern
const namePattern = /^[A-Za-z\s\-']+$/;
const nameLengthPattern = /^[A-Za-z\s\-']{3,30}$/;
// const nicPattern = /^\d{12}(v)?$/;
const contactPattern = /^(07[0125678]\d{7})$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const buildingNameOrNoPattern = /([A-Za-z0-9\s,#.-]+)/;
const lanePattern = /([A-Za-z0-9\s,-]*)/;
const cityPattern = /([A-Za-z\s]+)/;
const mainStatePattern = /([A-Za-z\s])/;
const postalCodePattern = /(\d{5}(-\d{4})?)/;

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
async function askBeLoyaltyCustomer() {
    Swal.fire({
        title: "Do you want to be loyalty customer?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`
    }).then((result) => {
        if (result.isConfirmed) {
            isLoyaltyCustomer = true;
            Swal.fire("welcome to loyalty!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("join later", "", "info");
        }
    });
}

//when document ready should be done
$(document).ready(async function () {
    // Prevent form submission on pressing Enter key
    $('#cus-save-form').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
        }
    });
    loadAllCustomers(await getAllCustomers());
    await filteringCustomers();
    $(":input").attr('autocomplete', 'off');
});

//popup handle
$("#btn-add-customer-popup").on('click', function () {
    clearInputs();
    $(".cus-popup").css("display", "block");
})
$(".action-td button:nth-child(2)").on('click', function () {
    $(".cus-popup").css("display", "block");
})
$("#btn-cus-popup-remove").on('click', function () {
    clearInputs();
    $(".cus-popup").css("display", "none");
})

//clear inputs
const clearInputs = () => {
    $("#customerName").val(''), $("#cus-gender").val('Male'), $("#cus-dob").val(''), $("#cus-addressLine1").val(''), $("#cus-addressLine2").val(''), $("#cus-addressLine3").val(''), $("#cus-addressLine4").val(''), $("#cus-addressLine5").val(''), $("#cus-contactNo").val(''), $("#customerEmail").val('')
}

//customer edit icon fire
$(document).on('click', '.action-td>button:last-child', function () {
    selectedEditCustomerCode = $(this).closest("tr").find(".customerCode").text();
    console.log(selectedEditCustomerCode);
    $("#cus-popup-header").text("UPDATE CUSTOMER");
    $("#cus-save-update-btn").text("Update Customer")
    $("#customerName").val($(this).closest("tr").find(".customerName").text()), $("#customerEmail").val($(this).closest("tr").find(".email").text()), $("#cus-dob").val($(this).closest("tr").find(".dob").text()), $("#cus-addressLine1").val($(this).closest("tr").find(".address1").text()), $("#cus-addressLine2").val($(this).closest("tr").find(".address2").text()), $("#cus-addressLine3").val($(this).closest("tr").find(".address3").text()), $("#cus-addressLine4").val($(this).closest("tr").find(".address4").text()), $("#cus-addressLine5").val($(this).closest("tr").find(".address5").text()), $("#cus-contactNo").val($(this).closest("tr").find(".contact").text())
    $(".cus-popup").css("display", "block")
});

//filtering customers
const filteringCustomers = async () => {
    normalCustomers.length = 0;
    loyaltyCustomers.length = 0;
    allCustomers = await getAllCustomers();
    allCustomers.map((customer) => {
        customer.joinDateAsALoyaltyCustomer != null ? loyaltyCustomers.push(customer) : normalCustomers.push(customer);
    });
    eachCustomerCountForLabel();
}

// each customer counts for label
const eachCustomerCountForLabel = () => {
    $(".cus-count-label").eq(0).text(allCustomers.length);
    $(".cus-count-label").eq(1).text(loyaltyCustomers.length);
    $(".cus-count-label").eq(2).text(normalCustomers.length);
}

// making table and loading data
function loadingData(customer) {
    return $("#customer-detail-table tbody").append(`<tr>
                <td class="cus-name-id">
                    <span class="customerName">${customer.customerName}</span><br>
                    <span class="customerCode">${customer.customerCode}</span>
                </td>
                <td class="gender" style="font-size: 12px">${customer.gender}</td>
                <td class="joinDateAsALoyaltyCustomer">${customer.joinDateAsALoyaltyCustomer === null ? ` <button class="btn-join-loyalty" style="color:#F6995C">join loyalty</button>` : customer.joinDateAsALoyaltyCustomer}</td>
                <td class="dob">${customer.dob}</td>
                <td><span class="address1">${customer.address1}</span><span class="address2"> ${customer.address2}</span><span class="address3"> ${customer.address3}</span><span class="address4"> ${customer.address4}</span><span class="address5"> ${customer.address5}</span></td>
                <td class="email">${customer.email}</td>
                <td class="contact">${customer.contact}</td>
                <td class="recentPurchaseDateTime">${customer.recentPurchaseDate === null ? "not yet" : moment.utc(customer.recentPurchaseDate).local().format('YYYY-MM-DD HH:mm:ss')}</td>
                <td class="emp-level-lbl">
                    <label>${customer.level.toLowerCase()}</label>
                </td>
                <td class="totalPoints">${customer.totalPoints}</td>
                <td class="action-td">
                    <button><i class="fa-solid fa-trash-can fa-lg" style="color: #f50529;"></i></button>
                    <button><i class="fa-solid fa-pen-to-square fa-lg"></i></button>
                </td>
            </tr>`)
}

//load all customers to table
const loadAllCustomers = (selectedCustomerList) => {
    $("#customer-detail-table tbody").empty();
    selectedCustomerList.map((customer) => {
        loadingData(customer)
    })
}

//save and update customer
let selectedEditCustomerCode;
let isLoyaltyCustomer = false;
$("#cus-save-update-btn").on("click", async function (event) {
    event.preventDefault();

    let customerName = $("#customerName").val();
    let gender = $("#cus-gender").val().toUpperCase();
    let joinDateLoyalty = "2022-05-16";
    let level = "NEW";
    let points = 0;
    let dob = $("#cus-dob").val();
    let add1 = $("#cus-addressLine1").val();
    let add2 = $("#cus-addressLine2").val();
    let add3 = $("#cus-addressLine3").val();
    let add4 = $("#cus-addressLine4").val();
    let add5 = $("#cus-addressLine5").val();
    let contact = $("#cus-contactNo").val();
    let email = $("#customerEmail").val();

    if (!customerName || !gender || !dob || !add1 || !add2 || !add3 || !add5 || !contact || !email) {
        showValidationError("Please fill in all fields correctly.");
        return;
    }

    if (!namePattern.test(customerName)) {
        showValidationError("Name must start with a letter and can only include letters, hyphens, and apostrophes.");
        return;
    }
    if (!nameLengthPattern.test(customerName)) {
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
    if (!emailPattern.test(email)) {
        showValidationError("require valid email");
        return;
    }
    if (!contactPattern.test(contact)) {
        showValidationError("require valid contact number");
        return;
    }

    if ($("#cus-save-update-btn").text() === "Save Customer") {
        const customers = await getAllCustomers();
        if (-1 < customers.findIndex(item => item.email === $("#customerEmail").val())) {
            showValidationError("this email all ready exit...");
            return;
        }
        await Swal.fire({
            title: "Do you want to be loyalty customer?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then((result) => {
            if (result.isConfirmed) {
                isLoyaltyCustomer = true;
                Swal.fire("welcome to loyalty!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("join later", "", "info");
            }
        });
        const status = await saveCustomer(new CustomerModel(
            customerName,
            gender,
            isLoyaltyCustomer === false ? null : new Date().toISOString().split('T')[0],
            "NEW",
            0,
            dob,
            add1,
            add2,
            add3,
            add4,
            add5,
            contact,
            email
        ));
        status === 201 ? dataEffectMessage("success","customer save successfully") : dataEffectMessage('error', 'saved fail,please try again!');
    } else {
        let updatedCustomer = new UpdateCustomerModel(
            customerName,
            gender,
            dob,
            add1,
            add2,
            add3,
            add4,
            add5,
            contact,
            email
        )
        const status = await updateCustomer(updatedCustomer, selectedEditCustomerCode);
        status === 200 ? dataEffectMessage("success","customer update successfully") : dataEffectMessage('error', 'update fail,please try again!');

    }
    $(".cus-popup").css("display", "none");
    clearInputs();
    loadAllCustomers(await getAllCustomers());
    await filteringCustomers();
});

//remove customer
$(document).on('click', '.action-td>button:first-child', async function () {
    let selectedCustomer = $(this).closest("tr").find(".customerCode").text();
    await Swal.fire({
        title: `Do you want to remove this customer : ${selectedCustomer}?`,
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`
    }).then(async (result) => {
        if (result.isConfirmed) {
            const status =   await deleteCustomer(selectedCustomer);
            if(status === 204) {
                loadAllCustomers(await getAllCustomers());
                await filteringCustomers();
                Swal.fire("customer deleted!", "", "success");
            }else {
                Swal.fire("customer not deleted!", "", "error");
            }
        } else if (result.isDenied) {
            Swal.fire("ok, not deleted customer", "", "info");
        }
    });
})

//be loyalty customer
$(document).on('click', '.btn-join-loyalty', async function () {
    let result = await becomeLoyaltyCustomer($(this).closest("tr").find(".customerCode").text(), new Date().toISOString().split('T')[0]);
    if (result === 200) {
        $(this).closest("tr").find(".joinDateAsALoyaltyCustomer").text(new Date().toISOString().split('T')[0]);
        await filteringCustomers();
    }
})

//loading filtered customers when click radio buttons
$('input[name="customerOption"]').change(async function () {
    await filteredCustomersForTable($(this).val());
});
const filteredCustomersForTable = async (ratioButtonValue) => {
    await loadAllCustomers(ratioButtonValue === "normal" ? normalCustomers : ratioButtonValue === "loyalty" ? loyaltyCustomers : allCustomers);
}

//search customer
$("#customer-search-input").on('input', async function () {
    $("#customer-detail-table tbody").empty();
    let allCustomers = await getAllCustomers();
    allCustomers.map((customer) => {
        if (customer.customerCode.toLowerCase().startsWith($("#customer-search-input").val().toLowerCase()) || customer.customerName.toLowerCase().startsWith($("#customer-search-input").val().toLowerCase()) || customer.email.toLowerCase().startsWith($("#customer-search-input").val().toLowerCase()) || customer.contact.toLowerCase().startsWith($("#customer-search-input").val().toLowerCase())) {
            loadingData(customer)
        }
    })
})

const addPointAndMarkRecentPurchaseDateAndForCustomer = async () => {
    await addPointAndMarkRecentPurchaseDateAndLevelForCustomer("Cf5db8fb6", 1, moment().format('YYYY-MM-DD HH:mm:ss'))
}


