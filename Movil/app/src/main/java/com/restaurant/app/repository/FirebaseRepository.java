package com.restaurant.app.repository;

import android.app.Application;

import com.google.firebase.FirebaseApp;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class FirebaseRepository extends Application {
    private static FirebaseRepository firebaseRepository;
    private static FirebaseDatabase firebaseDatabase;
    private static DatabaseReference databaseReference;

    private FirebaseRepository(){
    }

    @Override
    public void onCreate() {
        if(firebaseDatabase == null) {
            super.onCreate();

            FirebaseApp.initializeApp(this);

            firebaseDatabase = FirebaseDatabase.getInstance();
            databaseReference = firebaseDatabase.getReference();
        }
    }

    public static FirebaseRepository getInstance() {
        if (firebaseRepository == null) {
            firebaseRepository = new FirebaseRepository();
            firebaseRepository.onCreate();
        }
        return firebaseRepository;
    }

    public FirebaseDatabase getFirebaseDatabase() {
        return firebaseDatabase;
    }

    public DatabaseReference getDatabaseReference() {
        return databaseReference;
    }
}
