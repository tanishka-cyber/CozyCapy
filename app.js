document.addEventListener("DOMContentLoaded", () => {

    let friendship =
        Number(localStorage.getItem("friendship")) || 280;


    let hunger =
        Number(localStorage.getItem("hunger")) || 100;


    let equippedAccessories =
        JSON.parse(localStorage.getItem("accessories")) || [];


    const friendshipText = document.getElementById("friendship");
    const hungerText = document.getElementById("hunger");
    const moodText = document.getElementById("mood");
    const message = document.getElementById("message");

    const levelInfo = document.getElementById("level-info");
    const levelDisplay = document.getElementById("level-display");

    const petButton = document.getElementById("pet");
    const feedButton = document.getElementById("feed");
    const closetButton = document.getElementById("closet");

    const mainMenu = document.getElementById("main-menu");
    const foodMenu = document.getElementById("food-menu");
    const closetMenu = document.getElementById("closet-menu");

    const backButton = document.getElementById("back-button");
    const closetBack = document.getElementById("closet-back");

    const capyImage = document.getElementById("capy-image");
    const accessoryLayer = document.getElementById("accessory-layer");

    const speechBubble = document.getElementById("speech-bubble");

    const removeAccessories =
        document.getElementById("remove-accessories");

    const roomButton =
        document.getElementById("room-button");



    // LOAD SAVED ACCESSORIES

    function loadAccessories() {

        equippedAccessories.forEach(accessory => {

            let img = document.createElement("img");


            img.src =
                "./images/accessories/" + accessory + ".png";


            img.className =
                "accessory-image wearing-" + accessory;


            accessoryLayer.appendChild(img);

        });

    }





    function saveGame() {

        localStorage.setItem(
            "friendship",
            friendship
        );


        localStorage.setItem(
            "hunger",
            hunger
        );


        localStorage.setItem(
            "accessories",
            JSON.stringify(equippedAccessories)
        );


        localStorage.setItem(
            "lastVisit",
            Date.now()
        );

    }

    function updateDayNight() {

        const body =
            document.body;


        const app =
            document.querySelector(".app");


        let hour =
            new Date().getHours();



        body.classList.remove(
            "morning",
            "evening",
            "night"
        );


        app.classList.remove(
            "morning",
            "evening",
            "night"
        );



        if (hour >= 6 && hour < 17) {

            body.classList.add("morning");
            app.classList.add("morning");

        }


        else if (hour >= 17 && hour < 21) {

            body.classList.add("evening");
            app.classList.add("evening");

        }


        else {

            body.classList.add("night");
            app.classList.add("night");

        }

    }



    function updateScreen() {

        friendshipText.textContent = friendship;

        hungerText.textContent = hunger;

        updateLevel();

        updateCloset();

    }






    function updateLevel() {

        let level = 1;

        if (friendship >= 20) level = 2;

        if (friendship >= 50) level = 3;

        if (friendship >= 100) level = 4;

        if (friendship >= 250) level = 5;



        levelDisplay.textContent =
            "Level " + level + " 🌱";



        if (friendship < 20) {

            levelInfo.textContent =
                `${20 - friendship} ❤️ until Level 2 → 👒 Straw Hat`;

        }

        else if (friendship < 50) {

            levelInfo.textContent =
                `${50 - friendship} ❤️ until Level 3 → 🧣 Cozy Scarf`;

        }

        else if (friendship < 100) {

            levelInfo.textContent =
                `${100 - friendship} ❤️ until Level 4 → 🕶️ Glasses`;

        }

        else if (friendship < 250) {

            levelInfo.textContent =
                `${250 - friendship} ❤️ until Level 5 → 🧢 Blue Cap`;

        }

        else {

            levelInfo.textContent =
                "✨ Everything unlocked!";

        }

    }




    // SPEECH

    const messages = [

        "You're amazing 💛",

        "You got this ⭐",

        "I'm proud of you!",

        "You're doing great 💪",

        "You make me happy 😊"

    ];



    function showBubble() {

        speechBubble.textContent =
            messages[Math.floor(Math.random() * messages.length)];


        speechBubble.classList.remove("hidden");


        setTimeout(() => {

            speechBubble.classList.add("hidden");

        }, 2500);

    }


    setInterval(showBubble, 5000);

    // PET


    petButton.onclick = () => {

        friendship += 2;


        message.textContent =
            "You pet me! ❤️";


        capyImage.classList.add("capy-happy");


        setTimeout(() => {

            capyImage.classList.remove("capy-happy");

        }, 500);



        saveGame();

        updateScreen();

    };






    // MENUS


    feedButton.onclick = () => {

        mainMenu.classList.add("hidden");

        foodMenu.classList.remove("hidden");

    };



    closetButton.onclick = () => {

        mainMenu.classList.add("hidden");

        closetMenu.classList.remove("hidden");

    };



    roomButton.onclick = () => {

        message.textContent =
            "Sorry! This feature is not available yet 🛋️✨";


        speechBubble.textContent =
            "My room is still being built! 🐹";


        speechBubble.classList.remove("hidden");


        setTimeout(() => {

            speechBubble.classList.add("hidden");

        }, 2500);

    };



    backButton.onclick = () => {

        foodMenu.classList.add("hidden");

        mainMenu.classList.remove("hidden");

    };



    closetBack.onclick = () => {

        closetMenu.classList.add("hidden");

        mainMenu.classList.remove("hidden");

    };







    // DRAG PREVIEW


    function createPreview(icon) {

        let preview = document.createElement("div");


        preview.textContent = icon;


        preview.style.position = "absolute";

        preview.style.left = "-9999px";

        preview.style.top = "-9999px";

        preview.style.fontSize = "60px";



        document.body.appendChild(preview);


        return preview;

    }






    // FOOD DRAG


    document.querySelectorAll(".food")
        .forEach(food => {


            food.addEventListener("dragstart", e => {


                e.dataTransfer.setData(
                    "food",
                    food.dataset.value
                );


                e.dataTransfer.setData(
                    "favorite",
                    food.dataset.favorite || "false"
                );



                let preview = createPreview(
                    food.querySelector(".food-icon").textContent
                );



                e.dataTransfer.setDragImage(
                    preview,
                    30,
                    30
                );



                setTimeout(() => {

                    preview.remove();

                }, 100);


            });


        });







    // CLOSET UNLOCK


    function updateCloset() {


        document.querySelectorAll(".closet-item")
            .forEach(item => {


                let needed =
                    Number(item.dataset.required);



                if (friendship >= needed) {


                    item.classList.remove("locked");

                    item.classList.add("unlocked");

                    item.draggable = true;



                    item.querySelector(".unlock")
                        .textContent =
                        "✨ UNLOCKED! Drag me";


                }

                else {


                    item.classList.add("locked");

                    item.classList.remove("unlocked");

                    item.draggable = false;



                    item.querySelector(".unlock")
                        .textContent =
                        "🔒 Need " + needed + " ❤️";


                }


            });


    }






    // ACCESSORY DRAG


    document.querySelectorAll(".closet-item")
        .forEach(item => {


            item.addEventListener("dragstart", e => {


                if (item.classList.contains("locked")) {

                    e.preventDefault();

                    return;

                }



                e.dataTransfer.setData(
                    "accessory",
                    item.dataset.accessory
                );



                let preview = createPreview(
                    item.querySelector(".accessory-icon").textContent
                );



                e.dataTransfer.setDragImage(
                    preview,
                    30,
                    30
                );



                setTimeout(() => {

                    preview.remove();

                }, 100);



            });


        });

    // DROP ON CAPY


    capyImage.addEventListener("dragover", e => {

        e.preventDefault();

    });




    capyImage.addEventListener("drop", e => {


        let food =
            e.dataTransfer.getData("food");



        if (food) {


            friendship += Number(food);


            hunger += Number(food) * 2;



            if (hunger > 100)
                hunger = 100;



            message.textContent =
                e.dataTransfer.getData("favorite") === "true"

                    ?

                    "MY FAVORITE!! 🍛❤️"

                    :

                    "Yummy! 😋";



            capyImage.classList.add("eating");



            setTimeout(() => {

                capyImage.classList.remove("eating");

            }, 600);


        }





        let accessory =
            e.dataTransfer.getData("accessory");



        if (accessory) {



            let old =
                accessoryLayer.querySelector(
                    ".wearing-" + accessory
                );



            if (old)
                old.remove();




            let img =
                document.createElement("img");



            img.src =
                "./images/accessories/" + accessory + ".png";



            img.className =
                "accessory-image wearing-" + accessory;



            accessoryLayer.appendChild(img);



            message.textContent =
                "I look adorable! ✨";



            if (!equippedAccessories.includes(accessory)) {

                equippedAccessories.push(accessory);

            }


        }



        saveGame();

        updateScreen();


    });








    // REMOVE ACCESSORIES


    removeAccessories.onclick = () => {


        accessoryLayer.innerHTML = "";


        equippedAccessories = [];


        saveGame();



        message.textContent =
            "All accessories removed! 😊";


    };








    // AUTO SCROLL WHILE DRAGGING


    let dragging = false;



    document.querySelectorAll(".food,.closet-item")
        .forEach(item => {


            item.addEventListener("dragstart", () => {

                dragging = true;

            });



            item.addEventListener("dragend", () => {

                dragging = false;

            });



        });




    document.addEventListener("dragover", e => {



        if (!dragging)

            return;



        if (e.clientY < 150) {

            window.scrollBy(0, -15);

        }



        if (e.clientY > window.innerHeight - 150) {

            window.scrollBy(0, 15);

        }



    });








    // HUNGER


    setInterval(() => {



        hunger -= 5;



        if (hunger < 0)

            hunger = 0;




        if (hunger <= 30) {



            moodText.textContent =
                "Hungry 🥺";



            message.textContent =
                "Feed me please 🥺";


        }


        else {


            moodText.textContent =
                "Happy 😊";


        }




        saveGame();

        updateScreen();



    }, 7000);







    // START GAME


    loadAccessories();

    updateDayNight();

    updateScreen();



});
