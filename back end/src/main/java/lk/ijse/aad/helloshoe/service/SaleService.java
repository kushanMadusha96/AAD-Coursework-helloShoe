package lk.ijse.aad.helloshoe.service;

import lk.ijse.aad.helloshoe.dto.OrderDTO;
import lk.ijse.aad.helloshoe.dto.OrderItemDTO;
import lk.ijse.aad.helloshoe.dto.SaleDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SaleService {
    String saveOrder(OrderDTO orderDTO, List<OrderItemDTO> singleOrderDetails);
}
