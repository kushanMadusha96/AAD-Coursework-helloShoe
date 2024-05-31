package lk.ijse.aad.helloshoe.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "orderItem")
@Entity
public class OrderItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderItemNo;
    private int orderNo;
    private String itemCode;
    private String itemName;
    private int size;
    private double unitPrice;
    private int qty;
}
