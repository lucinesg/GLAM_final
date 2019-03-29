package com.example.demo;

public class Suspicions {

    private long id;
    private String category_of_suspicion;
    private String type_of_suspicion;
    private String subtype_of_suspicion;
    private String details;
    private String media;
    private String address;
    private double latitude;
    private double longitude;
    private String date1;
    private String time1;

    public Suspicions(long id, String category_of_suspicion, String type_of_suspicion, String subtype_of_suspicion, String details, String media, String address, double latitude, double longitude, String date1, String time1) {
        this.id = id;
        this.category_of_suspicion = category_of_suspicion;
        this.type_of_suspicion = type_of_suspicion;
        this.subtype_of_suspicion = subtype_of_suspicion;
        this.details = details;
        this.media = media;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.date1 = date1;
        this.time1 = time1;
    }

    public Suspicions(String category_of_suspicion, String type_of_suspicion, String subtype_of_suspicion, String details, String media, String address, double latitude, double longitude, String date1, String time1) {
        this.category_of_suspicion = category_of_suspicion;
        this.type_of_suspicion = type_of_suspicion;
        this.subtype_of_suspicion = subtype_of_suspicion;
        this.details = details;
        this.media = media;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.date1 = date1;
        this.time1 = time1;
    }

    public Suspicions() {
    }

    public Suspicions(String category_of_suspicion) {
        this.category_of_suspicion = category_of_suspicion;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategory_of_suspicion() {
        return category_of_suspicion;
    }

    public void setCategory_of_suspicion(String category_of_suspicion) {
        this.category_of_suspicion = category_of_suspicion;
    }

    public String getType_of_suspicion() {
        return type_of_suspicion;
    }

    public void setType_of_suspicion(String type_of_suspicion) {
        this.type_of_suspicion = type_of_suspicion;
    }

    public String getSubtype_of_suspicion() {
        return subtype_of_suspicion;
    }

    public void setSubtype_of_suspicion(String subtype_of_suspicion) {
        this.subtype_of_suspicion = subtype_of_suspicion;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getMedia() {
        return media;
    }

    public void setMedia(String media) {
        this.media = media;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double lattitude) {
        this.latitude = lattitude;
    }

    public String getDate1() {
        return date1;
    }

    public void setDate1(String date1) {
        this.date1 = date1;
    }

    public String getTime1() {
        return time1;
    }

    public void setTime1(String time1) {
        this.time1 = time1;
    }
}
