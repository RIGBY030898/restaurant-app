package com.restaurant.app.common.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ViewSwitcher;

import androidx.annotation.NonNull;

import com.bumptech.glide.Glide;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.restaurant.app.R;
import com.restaurant.app.model.Product;

import java.util.List;

public class ProductAdapter extends ArrayAdapter {

    public ProductAdapter(@NonNull Context context, int resource, @NonNull List<? extends Product> objects) {
        super(context, resource, objects);
    }

    @NonNull
    @SuppressLint("SetTextI18n")
    @Override
    public View getView(int position, View convertView, @NonNull ViewGroup parent) {

        final Product product = (Product) getItem(position);
        assert product != null;
        String url = product.getImage();

        @SuppressLint({"ViewHolder", "InflateParams"}) View view = LayoutInflater.from(getContext()).inflate(R.layout.product_card, null);

        ImageView imageView = view.findViewById(R.id.image);

        Glide.with(getContext())
                .load(url)
                .error(R.drawable.background_splash)
                .into(imageView);

        TextView name = view.findViewById(R.id.name);
        TextView details = view.findViewById(R.id.details);
        TextView price = view.findViewById(R.id.price);

        FloatingActionButton buyProduct = view.findViewById(R.id.buy_product);
        FloatingActionButton info = view.findViewById(R.id.info);
        final ViewSwitcher viewSwitcher = view.findViewById(R.id.view_switcher);

        name.setText(product.getName());
        details.setText("Detalles: " + product.getDetails());
        price.setText("Precio: " + product.getPrice() + " bs.");

        info.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                viewSwitcher.showNext();
            }
        });

        buyProduct.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getContext(), product.getName() + " comprado", Toast.LENGTH_SHORT).show();
            }
        });

        return view;
    }
}
