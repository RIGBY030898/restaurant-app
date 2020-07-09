package com.restaurant.app.model;

import java.util.Objects;

public class Consumer {
    private String UUID;
    private String name;
    private int table;

    public Consumer() {
    }

    public String getUUID() {
        return UUID;
    }

    public void setUUID(String UUID) {
        this.UUID = UUID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        Consumer consumer = (Consumer) o;
        return UUID.equals(consumer.UUID);
    }

    @Override
    public int hashCode() {
        return Objects.hash(UUID);
    }
}
