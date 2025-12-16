import $ from "cash-dom";
import ls from 'localstorage-slim'
import { shuffleArray, trigger } from '@trinodera/useful';
import { views, setView } from "./view";

export default async () => {
    /********************************/
    /* Vars
    /********************************/
    const version = require("../../package.json").version

    /********************************/
    /* Get config data
    /********************************/
    const cacheKey = "_data"
    if (!ls.get(cacheKey)) {
        const res = await fetch('data/config.json')
        const configData = await res.json()
        ls.set(cacheKey, configData, { encrypt: true })
    }
    if (!ls.get("_version")) {
        ls.set("_version", version)
    }

    /********************************/
    /* Set to first view
    /********************************/
    setView("playable", views)

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
    const items = shuffleArray(ls.get(cacheKey, { decrypt: true })), imghost = "https://images.cdn.dyntomas.com/0";

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
            btn1.html('<i class="fa-solid fa-angle-right"></i> Next Logo');
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
        infotext.html(`<i class="fas fa-circle-info"></i> This is ${item.name} made by ${item.company}.<br> Released ${item.release}`);
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
    /* Keyboard shortcut
    /********************************/
    $(document).on("keyup", evt => {
        evt.key == "Enter" && !btn2.prop("disabled") ? trigger(btn2, "click") : "";
    });

    /********************************/
    /* Dtops dragging and right-click
    /********************************/
    $('body').on('dragstart drop contextmenu', function (e) {
        e.preventDefault();
        return false;
    });
}