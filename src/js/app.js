import $ from "cash-dom";
import { shuffleArray, trigger } from '@dyntomas/globaljs';
const data = require("../data/browsers-db.json");

export default () => {  
// fetchJSON("assets/data/browsers-db.json", data => {
    $("#loading").hide();
    $("#playable").show();

    const mainimg = $("#0");
    const preload = $("#1");
    const infotext = $("#2");
    const btn1 = $("#3");
    const btn2 = $("#4");
  
    var item, pos = -1;
    const items = shuffleArray(data), imghost = "https://images.cdn.dyntomas.com/0/";
    preload.prop("href", items[0].image);

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
};

$(document).on("keyup", evt => {
    evt.key == " " && !$("#3").prop("disabled") ? trigger($("#3"), "click") : "";
    evt.key == "Enter" && !$("#4").prop("disabled") ? trigger($("#4"), "click") : "";
});
// }
