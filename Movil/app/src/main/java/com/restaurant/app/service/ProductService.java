package com.restaurant.app.service;

import com.google.firebase.database.DatabaseReference;
import com.restaurant.app.repository.FirebaseRepository;

public class ProductService {

    public static final String REFERENCE = "Products";
    public static final String FOOD = "Foods";
    public static final String DRINK = "Drinks";
    public static final String DESSERT = "Desserts";

    private static ProductService productService;
    private static FirebaseRepository firebaseRepository;

    private ProductService() {
        firebaseRepository = FirebaseRepository.getInstance();
    }

    public static ProductService getInstance() {
        if (productService == null) {
            productService = new ProductService();
        }
        return productService;
    }

    public DatabaseReference getFood() {
        return firebaseRepository.getDatabaseReference().child(REFERENCE).child(FOOD);
    }

    public DatabaseReference getDrink() {
        return firebaseRepository.getDatabaseReference().child(REFERENCE).child(DRINK);
    }

    public DatabaseReference getDessert() {
        return firebaseRepository.getDatabaseReference().child(REFERENCE).child(DESSERT);
    }
}
