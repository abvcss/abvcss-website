const $ = require("jquery");
const Cookies = require("js-cookie");

$(function() {

    let lightMode = Cookies.get('lightMode');
    if (lightMode === "true") {
        $(".theme-mode-button").removeClass("theme-mode-button_active");
        $("body").removeClass("Dark-mode");
    }

    // Changing mode
    $(".theme-mode-button").on("click", function() {
        $(this).toggleClass("theme-mode-button_active");
        $("body").toggleClass("Dark-mode");
        lightMode = lightMode === "true" ? "false" : "true";
        Cookies.set("lightMode", lightMode);
    })

    // Handling anchors
    $("a[href*='#']").on("click", function(e) {
        const anchor = $(this);
        $("html, body").stop().animate({
           scrollTop: $(anchor.attr("href")).offset().top - 20
        }, 1000);
        e.preventDefault();
    });

    // Handling mobile menu opening 
    $(".mobile-menu").on("click", function() {
        $(this).find(".mobile-menu__arrow").toggleClass("mobile-menu__arrow_active");
        $("body").toggleClass("menu-opened");
    });

});