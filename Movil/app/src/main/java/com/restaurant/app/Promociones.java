package com.restaurant.app;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.google.firebase.database.DatabaseReference;
import com.restaurant.app.common.adapter.ProductAdapter;
import com.restaurant.app.model.Product;

import java.util.ArrayList;


public class Promociones extends Fragment {

    private DatabaseReference databaseReference;
    private String state;

    private ProgressBar progressBar;
    private TextView textState;

    private ProductAdapter productAdapter;
    private ArrayList<Product> products;

    private boolean insert;
    private boolean existFood;

    public Promociones() {
        // Required empty public constructor
    }
    public Promociones(DatabaseReference databaseReference, String state){
        super();
        this.databaseReference = databaseReference;
        this.state = state;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


        //ListView listViewProducts = root.findViewById(R.id.list_products);

        //progressBar = root.findViewById(R.id.progress_bar);
        //textState = root.findViewById(R.id.text_state);
        //textState.setText(state);
        //textState.setVisibility(View.INVISIBLE);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_promociones, container, false);
    }
}