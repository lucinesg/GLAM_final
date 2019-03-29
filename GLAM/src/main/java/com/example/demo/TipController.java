package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class TipController {


    @Autowired
    SuspicionRepository suspicionRepository;

    boolean condition = false;

    String cloud ="dfyxx5zdo";


    //GetMapping for homepage
    @GetMapping("/")
    public String getStartpage() {

        return "home";
    }

    @GetMapping("/ChooseCategory")
    public String getCategory() {
        condition = true;
        return "ChooseCategory";
    }

    @GetMapping("/ObjectForm")
    public String getObjectForm(Model model) {
        if(condition == false) {
            return "home";
        }
        else {
            model.addAttribute("suspicions", new Suspicions("Object"));
            return "ObjectForm";
        }
    }

    @GetMapping("/PersonForm")
    public String getPersonForm(Model model) {

        if(condition == false) {
            return "home";
        }
        else {
            model.addAttribute("suspicions", new Suspicions("Person"));
            return "PersonForm";
        }

    }

    @GetMapping("/ActivityForm")
    public String getActivityForm(Model model) {
        if(condition == false) {
            return "home";
        }
        else {
            model.addAttribute("suspicions", new Suspicions("Activity"));

            return "ActivityForm";
        }
    }


    @PostMapping("/form")
    public String submitPersonform(@ModelAttribute Suspicions suspicions, @RequestParam(value = "picturecloudinary", required = false) String picture) {

        if(!suspicions.getType_of_suspicion().endsWith("bot")){
            suspicions.setMedia("https://res.cloudinary.com/" + cloud + "/" + picture);
            suspicionRepository.saveSuspicion(suspicions);
        }
        return "home";
    }

    @GetMapping("/ReceiverMap")
    public String getTipsOnMap(Model model) {
        List<Suspicions> tipsList = suspicionRepository.getAllSuspicions();
        if (tipsList.size() != 0) {
            model.addAttribute("tipsList", tipsList);
        }
        return "ReceiverMap";
    }



}
