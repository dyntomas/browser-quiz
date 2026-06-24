import $ from "cash-dom";
import { views, setView } from "./view";
import { config } from "./config";

function shuffleArray(arr) {
    let arr2 = arr.sort(() => Math.random() - 0.5);
    return arr2
}

(() => {
    const { version } = require('../../package.json');

    $(document).on("DOMContentLoaded", () => {
        setTimeout(() => {
        /********************************/
        /* Set to play view
        /********************************/
        setView("playable", views)
        }, 15)

        /***************************************/
        /* Infobox
        /***************************************/
        $("#version").text(version);
        $("#sitename").text("Browser Quiz");

        /********************************/
        /* Setup vars
        /********************************/
        const mainimg = $("#0");
        const preload = $("#1");
        const infotext = $("#2");
        const btn1 = $("#3");
        const btn2 = $("#4");
        const help = $("#5")
        const helpback = $("#6")
        const btns = $("#buttons")

        var item, pos = -1;
        const items = shuffleArray(config), imghost = "./assets/img/logos";

        /********************************/
        /* Preload images
        /********************************/
        items.forEach(item => {
            preload.prop("href", `${imghost}/${item.image}`);
        })
        preload.remove()

        /********************************/
        /* Start
        /********************************/
        btn1.on("click", () => {
            if (pos == -1) {
                btn2.show()
                btn2.addClass("w3-btn w3-green")
                help.hide()
            }

            if (pos <= items.length) {
                btn1.html('<i class="icon-angle-right"></i> Next Logo');
                pos += 1;
                item = items[pos];

                mainimg.prop("src", "assets/img/ready.jpg");
                infotext.html(`<i class="fa-solid fa-face-thinking"></i> Round ${pos + 1} - Get ready...`);
                $("#buttons button").attr("disabled", "");

                setTimeout(() => {
                    mainimg.prop("src", `${imghost}/${item.image}`);
                    infotext.html(`<i class="fa-solid fa-face-thinking"></i> Round ${pos + 1} - Guess now!`);
                    $("#buttons button").removeAttr("disabled")
                }, 1500);
            } else {
                mainimg.prop("src", "assets/img/end.png");
                infotext.text('Thanks for playing!');
                btns.hide();
            }
        });

        /********************************/
        /* Reveals anwser
        /********************************/
        btn2.on("click", () => {
            infotext.html(`<i class="icon-info-circled"></i> This is ${item.name} made by ${item.company}.<br> Released ${item.release}`);
        });

        /********************************/
        /* Help button on playable
        /********************************/
        help.on("click", () => {
            setView("help", views)
        })

        /********************************/
        /* Back button on help
        /********************************/
        helpback.on("click", () => {
            setView("playable", views)
        })

        /********************************/
        /* Drop dragging and right-click
        /********************************/
        $('body').on('dragstart drop contextmenu', function (e) {
            e.preventDefault();
            return false;
        });
    })
})()