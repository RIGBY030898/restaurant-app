package com.restaurant.app.model;

import java.util.Objects;

public class Device {
    private String uuid;
    private int table;

    public Device() {
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public int getTable() {
        return table;
    }

    public void setTable(int table) {
        this.table = table;
    }

    @Override
    public String toString() {
        return "Device{" +
                "uuid='" + uuid + '\'' +
                ", table=" + table +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Device device = (Device) o;
        return uuid.equals(device.uuid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uuid);
    }
}
