import $ from "cash-dom";
import { shuffleArray, trigger } from '@trinodera/useful';
import { ViewController } from '@trinodera/view'
const data = require("../data/browsers-db.json");

export default () => {
    const view = new ViewController({
        target: ".view"
    });

    view.setView("playable")

    const mainimg = $("#0");
    const preload = $("#1");
    const infotext = $("#2");
    const btn1 = $("#3");
    const btn2 = $("#4");
    const help = $("#5")
    const helpback = $("#6")

    var item, pos = -1;
    const items = shuffleArray(data), imghost = "https://images.cdn.dyntomas.com/0";

    // Starts game
    btn1.on("click", () => {
        if(pos == -1) {
            btn2.show()
            btn2.addClass("w3-btn w3-green")
            help.hide()
        }

        if(pos <= items.length) {
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
        } else {
            mainimg.prop("src", "assets/img/end.png");
            infotext.text('Thanks for playing!');
            $("#3, #4").prop("disabled", true);
        }
    });

    // Reveals anwser
    btn2.on("click", () => {
        infotext.html(`<i class="fas fa-circle-info"></i> It is ${item.name} made by ${item.company}.<br> Released ${item.release}`);
    });

    // Help button on playable
    help.on("click", () => {
        view.setView("help")
    })

    // Back button on help
    helpback.on("click", () => {
        view.setView("playable")
    })

    $(document).on("keyup", evt => {
        evt.key == "Enter" && !btn2.prop("disabled") ? trigger(btn2, "click") : "";
    });
}