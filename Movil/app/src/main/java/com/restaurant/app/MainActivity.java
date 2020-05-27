package com.restaurant.app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    TextView id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        SharedPreferences sharedPreferences = getSharedPreferences("Register", MODE_PRIVATE);

        id = findViewById(R.id.viewId);

        String myId = sharedPreferences.getString("MyId", "No Id");

        id.setText(myId);
    }
}
