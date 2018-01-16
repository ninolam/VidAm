//document.addEventListener("DOMContentLoaded", function()
//{
  var dom_template_container = document.querySelector(".grid");
  let film_list = []; // by index

  for (let i = 0; i < data["films"].length; i++)
  {
    if (data["films"][i]["category"] == "Horror / Thriller")
      film_list.push(data["films"][i]);
  }
  for (let i = 0; i < film_list.length; i++)
  {
    dom_template_container.innerHTML +=
    "<article class=\"grid_item\">" +
      "<h2 class=\"grid_item_container\">" + film_list[i]["title"] + "</h2>" +
      "<p class=\"grid_item_description\">Watch Naruto now! The film deals with ninjas and shurikens and it's very cool. Watch it!</p>" +
    "</article>";
  }
//});
