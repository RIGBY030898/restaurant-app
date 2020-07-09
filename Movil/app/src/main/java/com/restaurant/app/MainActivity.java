package com.restaurant.app;

import android.content.Intent;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;

import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;

import com.restaurant.app.model.Device;
import com.restaurant.app.model.Image;
import com.restaurant.app.model.Order;
import com.restaurant.app.service.DeviceService;
import com.restaurant.app.service.ImageService;
import com.restaurant.app.service.OrderService;


import java.util.ArrayList;

import java.util.UUID;

import ahmed.easyslider.EasySlider;
import ahmed.easyslider.SliderItem;

public class MainActivity extends AppCompatActivity {

    private String myUUID;
    private TextView table;

    EditText nombre;
    Button start;
    OrderService orderService;
    DeviceService deviceService;
    ImageService imageService;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        orderService = OrderService.getInstance();
        deviceService = DeviceService.getInstance();
        imageService = ImageService.getInstance();

        SharedPreferences sharedPreferences = getSharedPreferences("Register", MODE_PRIVATE);

        myUUID = sharedPreferences.getString("MyId", "No Id");

        table = findViewById(R.id.table);

        start = findViewById(R.id.start);
        start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                boolean register = registerUser();
                if (register) {
                    Intent intent = new Intent(MainActivity.this, MenuActivity.class);
                    startActivity(intent);
                }
            }
        });
        nombre = findViewById(R.id.editTextNombre);
        deviceService.getDevicesById(myUUID).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    table.setText(dataSnapshot.child("table").getValue().toString());
                } else {
                    AlertDialog.Builder alertDialog = new AlertDialog.Builder(MainActivity.this);
                    alertDialog.setTitle("Advertencia");
                    alertDialog.setMessage("El dispositivo no se encuentra en la BD\n¿Desea registrarlo?");
                    alertDialog.setPositiveButton("Registrar", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            Device device = new Device();
                            device.setUuid(myUUID);
                            device.setTable(0);
                            deviceService.saveDevices(device);
                        }
                    });
                    alertDialog.setNegativeButton("Salir", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            finish();
                        }
                    });
                    alertDialog.create();
                    alertDialog.show();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
            }
        });

        imageService.getImagesCarousel().addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                if(dataSnapshot.exists()) {
                    EasySlider slider = findViewById(R.id.sliderId);
                    ArrayList<SliderItem> imagenes  = new ArrayList<>();
                    for(DataSnapshot childSnapshot: dataSnapshot.getChildren()) {

                        Image img = childSnapshot.getValue(Image.class);
                        imagenes.add(new SliderItem(img.getName(),img.getUrl()));
                    }
                    slider.setPages(imagenes);
                } else {
                    Toast.makeText(MainActivity.this, "No existe ninguna imagen en carrusel", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });}
        public boolean registerUser () {
            boolean register = true;
            int viewTable = Integer.parseInt(table.getText().toString().trim());
            String user = nombre.getText().toString();
            if (viewTable == 0) {
                register = false;
                AlertDialog.Builder alertDialog = new AlertDialog.Builder(this);
                alertDialog.setTitle("Advertencia");
                alertDialog.setMessage("El dispositivo no está registrado a una mesa");
                alertDialog.setPositiveButton("OK", null);
                alertDialog.create();
                alertDialog.show();
            } else {
                Order order = new Order();
                order.setUUID(UUID.randomUUID().toString());
                order.setName(user);
                order.setTable(viewTable);
                orderService.saveOrder(order);
            }
            return register;
        }
    }


