export class CustomerModel {
    constructor(customerName, gender, joinDateAsALoyaltyCustomer, level, totalPoints, dob, address1, address2, address3, address4, address5, contact, email, recentPurchaseDate) {
        this.customerName = customerName;
        this.gender = gender;
        this.joinDateAsALoyaltyCustomer = joinDateAsALoyaltyCustomer;
        this.level = level;
        this.totalPoints = totalPoints;
        this.dob = dob;
        this.address1 = address1;
        this.address2 = address2;
        this.address3 = address3;
        this.address4 = address4;
        this.address5 = address5;
        this.contact = contact;
        this.email = email;
        this.recentPurchaseDate = recentPurchaseDate
    }
}