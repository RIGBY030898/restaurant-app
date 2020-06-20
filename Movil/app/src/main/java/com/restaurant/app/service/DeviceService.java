package com.restaurant.app.service;

import com.google.firebase.database.DatabaseReference;
import com.restaurant.app.model.Device;
import com.restaurant.app.repository.FirebaseRepository;

public class DeviceService {

    public static final String REFERENCE = "Devices";

    private static DeviceService deviceService;
    private static FirebaseRepository firebaseRepository;

    private DeviceService() {
        firebaseRepository = FirebaseRepository.getInstance();
    }

    public static DeviceService getInstance() {
        if(deviceService == null) {
            deviceService = new DeviceService();
        }
        return deviceService;
    }

    public DatabaseReference getDevicesById(final String UUID) {
        return firebaseRepository.getDatabaseReference().child(REFERENCE).child(UUID);
    }

    public Device saveDevices(final Device device) {
        firebaseRepository.getDatabaseReference().child(REFERENCE).child(device.getUuid()).setValue(device);
        return device;
    }
}
