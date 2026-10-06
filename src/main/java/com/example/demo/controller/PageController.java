package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Serves the React app for every page URL, so a browser refresh on
 * /calculator or /employee-management still works.
 * Add each new React page path to this list.
 */
@Controller
public class PageController {

    @GetMapping({ "/calculator", "/employee-management" })
    public String reactRoutes() {
        return "forward:/index.html";
    }
}
