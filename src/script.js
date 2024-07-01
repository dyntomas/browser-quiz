g.fetchJSON("./data/browsers-db.json", data => {
  $("#loading").hide();
  $("#playable").show();

  let item, pos = -1;
  items = g.shuffleArray(data);
  $("#1").prop("href", items[0].image);

  $("#3").on("click", () => {

    try {
    $("#3").html('<i class="fa-solid fa-forward"></i> Next Logo');
    pos += 1;
    item = items[pos];

$("#0").prop("src", "img/ready.jpg");
$("#2").html(`<i class="fa-solid fa-face-thinking"></i> Round ${pos + 1} - Get ready...`);
setTimeout(() => {
  $("#0").prop("src", item.image);
$("#2").html(`<i class="fa-solid fa-face-thinking"></i> Round ${pos + 1} - Guess now!`);
  
}, 1500);
    
    $("#1").prop("href", items[pos + 1].image);
    } catch (e){
      $("#0").prop("src", "img/end.png");
      $("#2").text('Thanks for playing!');
      $("#3, #4").prop("disabled", true);
    }

  });
  $("#4").on("click", () => {
    $("#2").html(`<i class="fa-solid fa-circle-info"></i> It is ${item.name} made by ${item.company}. Released ${item.release}`);
  });
});

$(document).on("keyup", evt => {
  evt.key == " " && !$("#3").prop("disabled") ? g.trigger($("#3"), "click") : ""
  evt.key == "Enter" && !$("#4").prop("disabled") ? g.trigger($("#4"), "click") : ""
});