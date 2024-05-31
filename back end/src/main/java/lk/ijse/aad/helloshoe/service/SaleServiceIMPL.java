package lk.ijse.aad.helloshoe.service;

import jakarta.transaction.Transactional;
import lk.ijse.aad.helloshoe.dto.OrderDTO;
import lk.ijse.aad.helloshoe.dto.OrderItemDTO;
import lk.ijse.aad.helloshoe.dto.SaleDTO;
import lk.ijse.aad.helloshoe.entity.OrderEntity;
import lk.ijse.aad.helloshoe.entity.OrderItemEntity;
import lk.ijse.aad.helloshoe.exception.DataEffectException;
import lk.ijse.aad.helloshoe.repo.OrderItemRepo;
import lk.ijse.aad.helloshoe.repo.OrderRepo;
import lk.ijse.aad.helloshoe.utill.Mapping;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class SaleServiceIMPL implements SaleService{
    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final Mapping mapper;
    @Override
    public String saveOrder(OrderDTO orderDTO, List<OrderItemDTO> singleOrderDetails) {
       try {
            orderRepo.save(mapper.toOrderEntity(orderDTO));
            orderItemRepo.saveAll(mapper.toSingleOrderItemEntityList(singleOrderDetails));
            return "200";
       }catch (Exception e) {
           System.out.println("....."+e);
           throw new DataEffectException();
       }
    }
}
