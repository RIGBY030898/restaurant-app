package com.restaurant.app.service;

import com.google.firebase.database.DatabaseReference;
import com.restaurant.app.repository.FirebaseRepository;

public class ImageService {

    public static final String REFERENCE = "Images";
    public static final String CAROUSEL = "Carousel";

    private static ImageService imageService;
    private static FirebaseRepository firebaseRepository;

    private ImageService(){
        firebaseRepository = FirebaseRepository.getInstance();
    }

    public static ImageService getInstance() {
        if(imageService == null) {
            imageService = new ImageService();
        }
        return imageService;
    }

    public DatabaseReference getImagesCarousel() {
        return firebaseRepository.getDatabaseReference().child(REFERENCE).child(CAROUSEL);
    }
}
