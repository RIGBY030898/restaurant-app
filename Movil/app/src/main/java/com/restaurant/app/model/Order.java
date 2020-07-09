package com.restaurant.app.model;

import java.util.Objects;

public class Order {
    private String UUID;
    private String name;
    private int table;

    public Order() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUUID() {
        return UUID;
    }

    public void setUUID(String UUID) {
        this.UUID = UUID;
    }

    public int getTable() {
        return table;
    }

    public void setTable(int table) {
        this.table = table;
    }
    @Override
    public String toString() {
        return "UUID: " + UUID +
                "\nName: " + name +
                "\nTable: " + table;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return UUID.equals(order.UUID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(UUID);
    }
}
