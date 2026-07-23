let friendship = 0;


const friendshipText = document.getElementById("friendship");
const levelText = document.getElementById("level");
const message = document.getElementById("message");



function updateLevel() {

    if (friendship >= 300) {

        levelText.textContent = "Level 4 ⭐";

    }

    else if (friendship >= 150) {

        levelText.textContent = "Level 3 🌳";

    }

    else if (friendship >= 50) {

        levelText.textContent = "Level 2 🌿";

    }

    else {

        levelText.textContent = "Level 1 🌱";

    }

}



function updateScreen() {

    friendshipText.textContent = friendship;

    updateLevel();

}




// Load saved friendship

chrome.storage.local.get(["friendship"], function (result) {

    if (result.friendship !== undefined) {

        friendship = result.friendship;

    }

    updateScreen();

});




// PET BUTTON

document.getElementById("pet").onclick = function () {

    friendship += 2;


    if (friendship < 50) {

        message.textContent =
            "I'm happy you visited!";

    }

    else if (friendship < 150) {

        message.textContent =
            "I like spending time with you.";

    }

    else {

        message.textContent =
            "You're my favorite human ❤️";

    }


    chrome.storage.local.set({

        friendship: friendship

    });


    updateScreen();

};




// FOOD SYSTEM

const feedButton = document.getElementById("feed");

const foodMenu = document.getElementById("food-menu");



feedButton.onclick = function () {

    foodMenu.classList.toggle("hidden");

};




const foods = document.querySelectorAll(".food");



foods.forEach(function (food) {


    food.onclick = function () {


        let amount = Number(food.dataset.value);


        friendship += amount;



        if (food.textContent.includes("Chole")) {


            message.textContent =
                "Your favorite!! ❤️";


        }

        else {


            message.textContent =
                "Yummy! Thank you!";


        }



        chrome.storage.local.set({

            friendship: friendship

        });



        updateScreen();



        foodMenu.classList.add("hidden");


    };


});