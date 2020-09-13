"use strict";

const PROXY_URL = "https://fierce-fortress-85154.herokuapp.com/";
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function init() {
  const resultUserContainer = document.querySelector(".results-user-container");
  const emailInput = document.querySelector("#email");
  const loader = document.querySelector(".loader");
  const emailInputContainer = document.querySelector(".email-input-container");
  const emailInputLabel = document.querySelector(".email-input-label");
  const emailInputErrorMessage = document.querySelector(
    ".email-input-error-message"
  );

  // get user data
  getUserData();

  // remove error from form
  emailInput.addEventListener("focus", function () {
    // remove error
    // show label
    emailInputLabel.classList.remove("hide");
    // hide error
    emailInputContainer.classList.remove("error-border");
    emailInputErrorMessage.classList.add("hide");
  });

  // Form Event
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    // Prevent Default
    e.preventDefault();

    // Step1: validate email
    const isValidEmail = EMAIL_REGEX.test(
      String(emailInput.value).toLowerCase()
    );

    // Step2.1: If not valid, return
    if (!isValidEmail) {
      // update input with error state
      // hide label
      emailInputLabel.classList.add("hide");
      // show error
      emailInputContainer.classList.add("error-border");
      emailInputErrorMessage.classList.remove("hide");
      return;
    }

    // Step2.2: If valid, save email in localStorage
    localStorage.setItem("userEmail", emailInput.value);

    // Step 3: show loading UI
    loader.classList.remove("hide");
    resultUserContainer.classList.add("hide");

    // Step3: Show Result
    getUserData();
  });
}

function getUserData() {
  const resultContent = document.querySelector("#result-content");
  const resultUserContainer = document.querySelector(".results-user-container");
  const loader = document.querySelector(".loader");

  // Check if email is set in localStorage
  const GET_USER_URL =
    "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=";
  const userEmail = localStorage.getItem("userEmail");

  // If not available, re-direct back to homepage
  if (!userEmail) {
    window.document.location = "./";
  }

  // If available, make network call
  fetch(PROXY_URL + GET_USER_URL + userEmail)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length === 0) {
        // update UI
        resultContent.innerText = "No result found for " + userEmail;
      } else {
        // update UI
        resultContent.innerText =
          "Look at the result below to see the details of the person you’re searched for.";

        //update user result

        updateUserResultUI(data);

        // show user result
        resultUserContainer.classList.remove("hide");
      }
    })
    .finally(() => {
      // remove loader
      loader.classList.add("hide");
    });
}

function updateUserResultUI(user) {
  const userName = document.querySelector("#user-name");
  // const userAge = document.querySelector("#user-age");
  const userDescription = document.querySelector("#user-description");
  const userAddress = document.querySelector("#user-address");
  const userEmailAddress = document.querySelector("#user-email");
  const userPhoneContainer = document.querySelector("#user-phone-container");
  const userRelativesContainer = document.querySelector(
    "#user-relatives-container"
  );

  userName.innerText = user.first_name + " " + user.last_name;
  userDescription.innerText = user.description;
  userAddress.innerText = user.address;
  userEmailAddress.innerText = user.email;

  let userPhoneFragment = document.createDocumentFragment();
  user.phone_numbers.forEach((phone_number) => {
    let phoneNumberDiv = document.createElement("div");
    phoneNumberDiv.innerText = phone_number;
    phoneNumberDiv.classList.add("text-blue", "user-phone");
    userPhoneFragment.appendChild(phoneNumberDiv);
  });

  userPhoneContainer.appendChild(userPhoneFragment);

  let userRelativesFragment = document.createDocumentFragment();
  user.relatives.forEach((relative) => {
    let userRelativesDiv = document.createElement("div");
    userRelativesDiv.innerText = relative;
    userRelativesDiv.classList.add("user-relative");
    userRelativesFragment.appendChild(userRelativesDiv);
  });

  userRelativesContainer.appendChild(userRelativesFragment);
}

document.addEventListener("DOMContentLoaded", function () {
  init();
});
