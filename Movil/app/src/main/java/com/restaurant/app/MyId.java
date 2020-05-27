package com.restaurant.app;

import android.app.Application;
import android.content.SharedPreferences;

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
        editor.putString("MyId", UUID.randomUUID().toString().trim());
        editor.apply();
    }
}
