package com.restaurant.app.ui.menu;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModelProviders;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ViewSwitcher;

import com.bumptech.glide.Glide;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;
import com.restaurant.app.R;
import com.restaurant.app.model.Product;
import com.restaurant.app.service.ProductService;

import java.util.ArrayList;

public class MenuFragment extends Fragment {

    ProductService productService;

    private MenuViewModel menuViewModel;

    private ListView listViewProducts;
    private AdapterProduct adapterProduct;
    private ArrayList<Product> productArrayList;
    private MutableLiveData<ArrayList<Product>> mutableLiveData;

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        menuViewModel =
                ViewModelProviders.of(this).get(MenuViewModel.class);
        final View root = inflater.inflate(R.layout.fragment_menu, container, false);

        productService = ProductService.getInstance();

        listViewProducts = root.findViewById(R.id.list_products);

        productArrayList = new ArrayList<>();

        mutableLiveData = new MutableLiveData<>();
        mutableLiveData.setValue(productArrayList);

        adapterProduct = new AdapterProduct();
        listViewProducts.setAdapter(adapterProduct);

        productService.getFood().addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    for(DataSnapshot childSnapshot: dataSnapshot.getChildren()) {
                        Product product = childSnapshot.getValue(Product.class);;
                        productArrayList.add(product);
                        adapterProduct.notifyDataSetChanged();
                    }
                } else {
                    Toast.makeText(getContext(), "No existe ningún plato", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        return root;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        menuViewModel = ViewModelProviders.of(this).get(MenuViewModel.class);
        // TODO: Use the ViewModel
    }

    class AdapterProduct extends BaseAdapter {

        @Override
        public int getCount() {
            return productArrayList.size();
        }

        @Override
        public Object getItem(int position) {
            return null;
        }

        @Override
        public long getItemId(int position) {
            return 0;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            final Product product = productArrayList.get(position);
            String url = product.getImage();

            View view = LayoutInflater.from(MenuFragment.this.getContext()).inflate(R.layout.product_card, null);

            ImageView imageView = view.findViewById(R.id.image);

            Glide.with(MenuFragment.this.getContext())
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
            price.setText("Precio: " + product.getPrice());

            info.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    viewSwitcher.showNext();
                }
            });

            buyProduct.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(MenuFragment.this.getContext(), product.getName() + " comprado", Toast.LENGTH_SHORT).show();
                }
            });

            return view;
        }
    }
}
