package lk.ijse.aad.helloshoe.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDTO implements SuperDTO{
    @NotNull
    private int orderNo;
    private String customerName;
    private double totalPrice;
    private Timestamp purchaseDate;
    private String paymentMethod;
    private double points;
    private String cashierName;

    public OrderDTO(String customerName, double totalPrice, Timestamp purchaseDate, String paymentMethod, double points, String cashierName) {
        this.customerName = customerName;
        this.totalPrice = totalPrice;
        this.purchaseDate = purchaseDate;
        this.paymentMethod = paymentMethod;
        this.points = points;
        this.cashierName = cashierName;
    }
}
