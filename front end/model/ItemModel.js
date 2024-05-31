export class ItemModel {
    constructor(itemCode, itemName, itemPicture, itemCategory, itemSize,supplierCode,supplierName,unitPriceSale,unitPriceBuy,expectedProfit,profitMargin,originalQty,remainQty,status) {
        this.itemCode = itemCode;
        this.itemName = itemName;
        this.itemPicture = itemPicture;
        this.itemCategory = itemCategory;
        this.itemSize = itemSize;
        this.supplierCode = supplierCode;
        this.supplierName = supplierName;
        this.unitPriceSale = unitPriceSale;
        this.unitPriceBuy = unitPriceBuy;
        this.expectedProfit = expectedProfit;
        this.profitMargin = profitMargin;
        this.originalQty = originalQty;
        this.remainQty = remainQty;
        this.status = status;
    }
}
