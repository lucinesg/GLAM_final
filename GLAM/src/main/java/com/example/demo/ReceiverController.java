package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ReceiverController {

    @Autowired
    PoliceLoginRepository policeRepository;

    @Autowired
    SuspicionRepository suspicionRepository;

    @GetMapping("/AdminLogin")
    public String login(HttpSession session) {

        if (session.getAttribute("currentUser") == null)
            return "AdminLogin";
        else
           return "redirect:/PoliceProfile";

    }

    @PostMapping("/PoliceProfile")
    public String loginPost(Model model, HttpSession session, @RequestParam String userName, @RequestParam String password) {

        List<PoliceLogin> policeList = policeRepository.getAllPoliceLogins();

        for (int i = 0; i < policeList.size(); i++) {
            if (userName.equals(policeList.get(i).getUsername()) && password.equals(policeList.get(i).getPassword())) {
                session.setAttribute("currentUser", policeList.get(i));
                return "redirect:/PoliceProfile";
            }
        }
        return "/AdminLogin";
    }

    @GetMapping("/PoliceProfile")
    public String getTipReceiver(HttpSession session, Model model){
        if (session.getAttribute("currentUser") == null)
            return "AdminLogin";
        else {

            List<Suspicions> suspicionsList = suspicionRepository.getAllSuspicions();
            model.addAttribute("suspicions", suspicionsList);
            return "PoliceProfile";
        }
    }
    @GetMapping("/Logout")
    public String logout(HttpSession session) {
        session.removeAttribute("currentUser");
        return "AdminLogin";
    }



}
