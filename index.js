"use strict";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function init() {
  const form = document.querySelector("form");
  const emailInput = document.querySelector("#email");

  form.addEventListener("submit", function (e) {
    // Prevent Default
    e.preventDefault();

    // Step1: validate email
    const isValidEmail = EMAIL_REGEX.test(
      String(emailInput.value).toLowerCase()
    );

    // Step2.1: If not valid, update UI and return
    if (!isValidEmail) {
      // update input with error state
      return;
    }

    // Step2.2: If valid, save email in localStorage
    localStorage.setItem("userEmail", emailInput.value);

    // Step3: Redirect to results page
    window.document.location = "./results.html";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});
