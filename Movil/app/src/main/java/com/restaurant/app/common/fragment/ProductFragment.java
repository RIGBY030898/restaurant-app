package com.restaurant.app.common.fragment;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;
import com.restaurant.app.R;
import com.restaurant.app.common.adapter.ProductAdapter;
import com.restaurant.app.model.Product;

import java.util.ArrayList;
import java.util.Objects;

/**
 * A simple {@link Fragment} subclass.
 */
public class ProductFragment extends Fragment {

    private DatabaseReference databaseReference;
    private String state;

    private ProgressBar progressBar;
    private TextView textState;

    private ProductAdapter productAdapter;
    private ArrayList<Product> products;

    private boolean insert;
    private boolean existFood;

    public ProductFragment() {
        // Required empty public constructor
    }

    public ProductFragment(DatabaseReference databaseReference, String state) {
        super();
        this.databaseReference = databaseReference;
        this.state = state;
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        final View root = inflater.inflate(R.layout.fragment_product, container, false);

        ListView listViewProducts = root.findViewById(R.id.list_products);

        progressBar = root.findViewById(R.id.progress_bar);
        textState = root.findViewById(R.id.text_state);
        textState.setText(state);
        textState.setVisibility(View.INVISIBLE);

        products = new ArrayList<>();
        productAdapter = new ProductAdapter(Objects.requireNonNull(getContext()), R.layout.product_card, products);
        listViewProducts.setAdapter(productAdapter);

        databaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    for(DataSnapshot childSnapshot: dataSnapshot.getChildren()) {
                        Product product = childSnapshot.getValue(Product.class);
                        assert product != null;
                        insert = product.getCount() > 0;
                        existFood = products.contains(product);
                        if (!existFood) {
                            if (insert) {
                                products.add(product);
                                productAdapter.notifyDataSetChanged();
                            }
                        } else {
                            if (!insert) {
                                products.remove(product);
                                productAdapter.notifyDataSetChanged();
                            }
                        }
                    }
                }
                progressBar.setVisibility(View.INVISIBLE);
                if (products.size() == 0) {
                    textState.setVisibility(View.VISIBLE);
                } else {
                    textState.setVisibility(View.INVISIBLE);
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        return root;
    }
}
