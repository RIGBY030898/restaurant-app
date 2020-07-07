package com.restaurant.app.common.adapter;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;

import com.restaurant.app.service.ProductService;
import com.restaurant.app.common.fragment.ProductFragment;

public class ProductPagerAdapter extends FragmentStatePagerAdapter {

    private ProductService productService;

    private int countTab;

    public ProductPagerAdapter(@NonNull FragmentManager fm, int behavior) {
        super(fm, behavior);
        countTab = behavior;
        productService = ProductService.getInstance();
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0:
                return new ProductFragment(productService.getFood(), "No existen comidas");
            case 1:
                return new ProductFragment(productService.getDrink(), "No existen bebidas");
            default:
                return new ProductFragment(productService.getDessert(), "No existen postres");
        }
    }

    @Override
    public int getCount() {
        return countTab;
    }
}
