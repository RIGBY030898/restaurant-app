package com.restaurant.app.service;

import com.restaurant.app.model.Order;
import com.restaurant.app.repository.FirebaseRepository;

public class OrderService {
    public static final String REFERENCE = "Orders";
    public static  OrderService orderServices;
    private static FirebaseRepository firebaseRepository;

    public OrderService() {
        firebaseRepository = FirebaseRepository.getInstance();
    }
    public static OrderService getInstance(){
        if (orderServices==null){
            orderServices = new OrderService();
        }
        return orderServices;
    }
    public Order saveOrder(final Order order){
        firebaseRepository.getDatabaseReference().child(REFERENCE).child(order.getUUID()).setValue(order);
        return order;
    }
}
