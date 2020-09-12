"use strict";

function init() {
  const form = document.querySelector("form");
  const emailInput = document.querySelector("#email");

  form.addEventListener("submit", function (e) {
    // Prevent Default
    e.preventDefault();

    // Step1: validate email

    // Step2.1: If not valid, update UI and return

    // Step2.2: If valid, save email in localStorage
    localStorage.setItem("userEmail", emailInput.value);

    // Step3: Redirect to results page
    window.document.location = "./results.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});
