package com.restaurant.app;

import android.app.Application;
import android.content.SharedPreferences;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.restaurant.app.model.Device;

import java.util.UUID;

public class MyId extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        SharedPreferences sharedPreferences = getSharedPreferences("Register", MODE_PRIVATE);
        init(sharedPreferences);
    }

    private void init(SharedPreferences preferences) {
        String myId = preferences.getString("MyId", "No Id");
        if (myId.equals("No Id")) {
            createMyId(preferences);
        }
    }

    private void createMyId(SharedPreferences preferences) {
        SharedPreferences.Editor editor = preferences.edit();
        String myId = UUID.randomUUID().toString();
        editor.putString("MyId", myId);
        editor.apply();
        registerDevice(myId);
    }

    private void registerDevice(String id) {
        DatabaseReference databaseReference = FirebaseDatabase.getInstance().getReference();
        Device device = new Device();
        device.setUuid(id);
        device.setTable(0);
        databaseReference.child("Devices").child(device.getUuid()).setValue(device);
    }
}
