package com.restaurant.app;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle saveInstanceState) {
        super.onCreate(saveInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        //Intent intent = new Intent(this, MenuActivity.class);
        startActivity(intent);
        finish();
    }
}
