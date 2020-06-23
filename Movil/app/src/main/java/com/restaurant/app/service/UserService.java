package com.restaurant.app.service;

import com.restaurant.app.model.Consumer;
import com.restaurant.app.repository.FirebaseRepository;

public class UserService {

    public static final String REFERENCE = "Users";
    public static final String CONSUMER = "Consumers";

    private static UserService userService;
    private static FirebaseRepository firebaseRepository;

    private UserService(){
        firebaseRepository = FirebaseRepository.getInstance();
    }

    public static UserService getInstance() {
        if(userService == null) {
            userService = new UserService();
        }
        return userService;
    }

    public Consumer saveUserConsumer(final Consumer userConsumer) {
        firebaseRepository.getDatabaseReference()
                .child(REFERENCE).child(CONSUMER)
                .child(userConsumer.getUUID()).setValue(userConsumer);
        return userConsumer;
    }
}
