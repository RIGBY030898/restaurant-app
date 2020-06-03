package com.restaurant.app;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.FirebaseApp;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.restaurant.app.model.Consumer;
import com.restaurant.app.model.Device;

import java.util.UUID;

public class MainActivity extends AppCompatActivity {

    private String myUUID;
    private TextView table;

    Button start;

    FirebaseDatabase firebaseDatabase;
    DatabaseReference databaseReference;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FirebaseApp.initializeApp(this);

        firebaseDatabase = FirebaseDatabase.getInstance();
        databaseReference = firebaseDatabase.getReference();

        SharedPreferences sharedPreferences = getSharedPreferences("Register", MODE_PRIVATE);

        myUUID = sharedPreferences.getString("MyId", "No Id");

        table = findViewById(R.id.table);

        start = findViewById(R.id.start);

        databaseReference.child("Devices").child(myUUID).addValueEventListener(new ValueEventListener() {
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
                            databaseReference.child("Devices").child(myUUID).setValue(device);
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
    }

    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.start:
                String user = "Test";
                boolean register = registerUser(user);
                if(register) {
                    Toast.makeText(this, user + " registrado", Toast.LENGTH_SHORT).show();
                }
                break;
            default:
                break;
        }
    }

    private boolean registerUser(String user) {
        boolean register = true;
        int viewTable = Integer.parseInt(table.getText().toString().trim());

        if (viewTable == 0) {
            register = false;
            AlertDialog.Builder alertDialog = new AlertDialog.Builder(this);
            alertDialog.setTitle("Advertencia");
            alertDialog.setMessage("El dispositivo no está registrado a una mesa");
            alertDialog.setPositiveButton("OK", null);
            alertDialog.create();
            alertDialog.show();
        } else {
            Consumer consumer = new Consumer();
            consumer.setUUID(UUID.randomUUID().toString());
            consumer.setName(user);
            consumer.setTable(viewTable);
            databaseReference.child("Users").child("Consumers").child(consumer.getUUID()).setValue(consumer);
        }
        return  register;
    }
}
