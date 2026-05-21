import $ from "cash-dom";
import { shuffleArray, trigger } from '@trinodera/useful';
import { views, setView } from "./view";
import { config } from "./config";

export default async () => {
    setView("playable", views)

    /********************************/
    /* Vars
    /********************************/
    const version = require("../../package.json").version

    /***************************************/
    // * Infobox
    /***************************************/
    $("#version").innerText = version
    $("#sitename").innerText = document.querySelector("title").innerText

    const mainimg = $("#0");
    const preload = $("#1");
    const infotext = $("#2");
    const btn1 = $("#3");
    const btn2 = $("#4");

    var item, pos = -1;
    const items = shuffleArray(config), imghost = "https://images.cdn.dyntomas.com/0";

    btn1.on("click", () => {
        try {
            btn1.html('<i class="fa-solid fa-angle-right"></i> Next Logo');
            pos += 1;
            item = items[pos];

            mainimg.prop("src", "assets/img/ready.jpg");
            infotext.html(`<i class="fa-solid fa-face-thinking"></i> Round ${pos + 1} - Get ready...`);
            setTimeout(() => {
                mainimg.prop("src", `${imghost}/${item.image}`);
                infotext.html(`<i class="fa-solid fa-face-thinking"></i> Round ${pos + 1} - Guess now!`);
            }, 1500);

            preload.prop("href", `${imghost}/${items[pos + 1].image}`);
        } catch (e) {
            mainimg.prop("src", "assets/img/end.png");
            infotext.text('Thanks for playing!');
            $("#3, #4").prop("disabled", true);
        }
    });

    btn2.on("click", () => {
        infotext.html(`<i class="fas fa-circle-info"></i> It is ${item.name} made by ${item.company}.<br> Released ${item.release}`);
    });


    $(document).on("keyup", evt => {
        evt.key == "Enter" && !btn2.prop("disabled") ? trigger(btn2, "click") : "";
    });
}