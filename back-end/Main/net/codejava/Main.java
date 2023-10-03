package net.codejava;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Main {

	public static void main(String[] args) {
	String jdbcURL = "jdbc:postgresql://localhost:5432/";
	String userName = "postgres";
	String password = "123456"; //Super user
	
	try {
		Connection connection = DriverManager.getConnection(jdbcURL,userName,password);
		System.out.print('Connect success');
		connection.close();
	} catch (SQLException e){
		System.out.print('Connect Error');
		e.printStackTrace();
	}
	}

}
