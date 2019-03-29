package com.example.demo;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

	@Autowired
	PoliceLoginRepository policeRepository;

	@Autowired
	SuspicionRepository suspicionRepository;

	@Test
	public void contextLoads() {
	}

	@Test
	public void testFindAllLogins() {
		List<PoliceLogin> login = policeRepository.getAllPoliceLogins();
		Assert.assertEquals("the number of logins must be 4", 4, login.size());
	}

//	@Test
//	public void testFindAllSuspicions() {
//
//	}

	@Test
	public void testSaveSuspicion(){
		List<Suspicions> suspicions = suspicionRepository.getAllSuspicions();
		Assert.assertEquals("the number of suspicions must be 6", 6, suspicions.size());

		Suspicions suspicion = new Suspicions("Person", "gang member", null, "I was walking to my building this evening and I saw a shady person standing with two other people acting all secretive", null, "Somewhere in kista",63.821175, 20.279367, "22/03/2019", "22:37");
		suspicionRepository.saveSuspicion(suspicion);
		List<Suspicions> newList = suspicionRepository.getAllSuspicions();

		Assert.assertEquals("the number of suspicions must be 7", 7, newList.size());

	}



}
