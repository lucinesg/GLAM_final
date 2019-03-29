package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Service
public class PoliceLoginRepository {

    @Autowired
    private DataSource dataSource;

    public List<PoliceLogin> getAllPoliceLogins() {
        List<PoliceLogin> policeLogin = new ArrayList<>();
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM POLICE_LOGIN")) {
            while (rs.next()) {
                policeLogin.add(rsPoliceLogin(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return policeLogin;
    }

    private PoliceLogin rsPoliceLogin(ResultSet rs) throws SQLException {
        return new PoliceLogin (rs.getLong("id"),
                rs.getString("first_name"),
                rs.getString("last_name"),
                rs.getString("username"),
                rs.getString("password"));
    }

}
