const $ = require("cash-dom");
const { fetchJSON, shuffleArray, trigger } = require('@dyntomas/globaljs');
const { version } = require("../../package.json");

function app() {
fetchJSON("assets/data/browsers-db.json", data => {
    $("#loading").hide();
    $("#playable").show();

    const mainimg = $("#0");
    const preload = $("#1");
    const mainh3 = $("#2");
    const btn1 = $("#3");
    const btn2 = $("#4");
    $("body")

    var items, item, pos = -1;
    items = shuffleArray(data);
    preload.prop("href", items[0].image);

    btn1.on("click", () => {
        try {
            btn1.html('<i class="fa-solid fa-angle-right"></i> Next Logo');
            pos += 1;
            item = items[pos];

            mainimg.prop("src", "assets/img/ready.jpg");
            mainh3.html(`<i class="fa-solid fa-face-thinking"></i> Round ${pos + 1} - Get ready...`);
            setTimeout(() => {
                mainimg.prop("src", item.image);
                mainh3.html(`<i class="fa-solid fa-face-thinking"></i> Round ${pos + 1} - Guess now!`);
            }, 1500);

            preload.prop("href", items[pos + 1].image);
        } catch (e) {
            mainimg.prop("src", "assets/img/end.png");
            mainh3.text('Thanks for playing!');
            $("#3, #4").prop("disabled", true);
        }
    });

    btn2.on("click", () => {
        mainh3.html(`<i class="fas fa-circle-info"></i> It is ${item.name} made by ${item.company}. Released ${item.release}`);
    });
});

$(document).on("keyup", evt => {
    evt.key == " " && !$("#3").prop("disabled") ? trigger($("#3"), "click") : "";
    evt.key == "Enter" && !$("#4").prop("disabled") ? trigger($("#4"), "click") : "";
});
}

module.exports = {
version,
app
}