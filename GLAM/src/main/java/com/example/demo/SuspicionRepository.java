package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class SuspicionRepository {

    @Autowired
    private DataSource dataSource;

    public List<Suspicions> getAllSuspicions() {

        List<Suspicions> suspicions = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM SUSPICION")) {
            while (rs.next()) {
                suspicions.add(rsSuspicions(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return suspicions;

    }

    public Suspicions rsSuspicions(ResultSet rs) throws SQLException {
        return new Suspicions(rs.getLong("id"),
                rs.getString("category_of_suspicion"),
                rs.getString("type_of_suspicion"),
                rs.getString("subtype_of_suspicion"),
                rs.getString("details"),
                rs.getString("media"),
                rs.getString("address"),
                rs.getDouble("latitude"),
                rs.getDouble("longitude"),
                rs.getString("date1"),
                rs.getString("time1")
                );
    }

    public void saveSuspicion(Suspicions suspicion) {

        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement("INSERT INTO SUSPICION (CATEGORY_OF_SUSPICION, TYPE_OF_SUSPICION, SUBTYPE_OF_SUSPICION, DETAILS, MEDIA, ADDRESS, LONGITUDE, LATITUDE, DATE1, TIME1) values (?,?,?,?,?,?,?,?,?,?)")) {
                ps.setString(1, suspicion.getCategory_of_suspicion());
                ps.setString(2, suspicion.getType_of_suspicion());
                ps.setString(3, suspicion.getSubtype_of_suspicion());
                ps.setString(4, suspicion.getDetails());
                ps.setString(5, suspicion.getMedia());
                ps.setString(6, suspicion.getAddress());
                ps.setDouble(8, suspicion.getLatitude());
                ps.setDouble(7, suspicion.getLongitude());
                ps.setString(9, suspicion.getDate1());
                ps.setString(10, suspicion.getTime1());

                ps.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
        }
    }
}
