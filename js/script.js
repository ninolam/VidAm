document.addEventListener("DOMContentLoaded", function()
{

// ANIMATIONS
  var logo       = document.querySelector('.logo');
  var logo2      = document.querySelector('.logo2');

  var loupe      = document.querySelector('.lp');
  var look       = document.querySelector('.search');

  var player     = document.querySelector('.player');

  var catbutt    = document.querySelector('.catbutt');
  var yearbutt   = document.querySelector('.yearbutt');

  var arrow      = document.querySelector('.arrow');
  var arrow2     = document.querySelector('.arrow2');

  var categories = document.querySelector('.categories');
  var yearcont   = document.querySelector('.year_container');

  var cat_list   = document.querySelectorAll(".cat");

  var movies     = document.querySelector('.movies');
  var films      = document.querySelectorAll('.film');
  var loadmore   = document.querySelector('.loadmore');

  logo.addEventListener('mouseover', function() {
    logo2.style.display = "block";
    logo.style.display = "none";
  });

  logo2.addEventListener('mouseout', function() {
    logo2.style.display = "none";
    logo.style.display = "block";
  });

  loupe.addEventListener('click', function() {
    look.classList.toggle('on');
  });

  catbutt.addEventListener('click', function() {
    categories.classList.toggle('open');
    arrow.classList.toggle('rotate');
  });

  arrow.addEventListener('click', function() {
    categories.classList.toggle('open');
    arrow.classList.toggle('rotate');
  });


  yearbutt.addEventListener('click', function() {
    yearcont.classList.toggle('open');
    arrow2.classList.toggle('rotate');
  });

  arrow2.addEventListener('click', function() {
    yearcont.classList.toggle('open');
    arrow2.classList.toggle('rotate');
  });

  loadmore.addEventListener('click', function(){
    movies.style.height    = '100%';
    for (let i = 0; document.querySelectorAll('.film')[i] != undefined; i++)
    {
      let tmp = document.querySelectorAll(".film")[i];
      tmp.classList.remove("film");
      tmp.classList.add("film");
    }
    loadmore.style.display = 'none';
  });

    var burger = document.querySelector('.burger');
    var bar0   = document.querySelector('.bar0');
    var bar1   = document.querySelector('.bar1');
    var bar2   = document.querySelector('.bar2');
    var nav    = document.querySelector('.nav');
    var body   = document.querySelector('.body');

    burger.addEventListener('click', function() {
      nav.classList.toggle('on');
      body.classList.toggle('hid');
      bar0.classList.toggle('cross0');
      bar1.classList.toggle('cross1');
      bar2.classList.toggle('cross2');
    });

// ANIMATIONS END






// FILTER
  var search          = document.querySelector(".search");
  var search_text     = document.querySelector(".search_text");
  var search_submit   = document.querySelector(".search_submit");

  var category        = document.querySelector('.categories');
  var category_title  = document.querySelector('.category_selection_title');
  var category_list   = document.querySelector(".category_selection_list");
  var category_item   = document.querySelectorAll(".cat");

  var year            = document.querySelector('.year_container');
  var year_title      = document.querySelector('.year_selection_title');
  var year_list       = document.querySelector(".year_selection_list");
  var year_item       = document.querySelectorAll(".year_selection");

  var films           = document.querySelector('.movies');
  var films_sel       = document.querySelectorAll(".film");
  load_films("See All", "", "");

  function shorten_text(str, nb)
  {
  str = str.slice(0, nb).concat("...");
  return str;
  }

  function add_film(film, index)
  {
    films.innerHTML +=
    "<article class=\"film\" data-index=\"" + index + "\">" +
    "<img src=\""+film.image_url+"\" class=\"film_img\">" +
    "<h2 class=\"film_title\">" + film.title + "</h2>" +
    "<p class=\"film_description\">" + shorten_text(film.description, 40) + "</p>";
  }

  function load_films(category, year, keyword)
  {
    movies.innerHTML = "";
    if (category == "See All" || year == "See All")
    {
      for (let i = 0; i < data.films.length; i++)
      {
        add_film(data.films[i], i);
      }
    }
    else
    {
      for (let i = 0; i < data.films.length; i++)
      {
        if (data.films[i].category == category)
          add_film(data.films[i], i);
      }
    }
    if (year!= "")
    {
      for (let i = 0; i < data.films.length; i++)
      {
        if (data.films[i].year == Number(year))
          add_film(data.films[i], i);
      }
    }
    if (keyword != "")
    {
      for (let i = 0; i < data.films.length; i++)
      {
        if (String(data.films[i].year).toLowerCase().search(keyword.toLowerCase()) >= 0 ||
            data.films[i].title.toLowerCase().search(keyword.toLowerCase()) >= 0 ||
            data.films[i].description.toLowerCase().search(keyword.toLowerCase()) >= 0 ||
            data.films[i].author.toLowerCase().search(keyword.toLowerCase()) >= 0 ||
            data.films[i].category.toLowerCase().search(keyword.toLowerCase()) >= 0)
            add_film(data.films[i], i);
      }
    }
    films_sel = document.querySelectorAll('.film');
    for (let i = 0; i < films_sel.length; i++) {
      films_sel[i].addEventListener('click', function(){
        display_modal(Number(films_sel[i].dataset.index));
        Player("movie", Number(films_sel[i].dataset.index));
      });
    }
  }


  search.addEventListener("submit", function(event)
  {
    event.preventDefault();
    if (search_text.value != "")
      load_films("", "", search_text.value);
  });

  for (let i = 0; i < category_item.length; i++)
  {
  category_item[i].addEventListener("click", function()
    {
      load_films(category_item[i].textContent, "", "");
    });
  }

  for (let i = 0; i < year_item.length; i++)
  {
  year_item[i].addEventListener("click", function()
  {
    load_films("", year_item[i].textContent, "")
  });
}
// FILTER END



// CLICK ON VIDEO To SHOW DESCRIPTION AND FILM

var modal = document.querySelector(".modal");

function scroll_top()
{
  document.querySelector(".modal").scroll(0, 0);
}

function play_video()
{
  document.querySelector(".modal_player_play").style.display = "none";
  document.querySelector(".modal_player_img").style.display = "none";
  // TODO: VIDEO DISPLAYING TO BE DONE
}

function close_modal()
{
  modal.innerHTML = "";
  modal.style.display = "none";
  document.querySelector("body").style.overflowY = "scroll";
  clearInterval(int);
}

function put_star(nb, index)
{
  if      (data.films[index].rating - nb >= 0)
    return 'img/star_full.png';
  else if (data.films[index].rating - nb == -0.5)
    return 'img/star_semi.png';
  else if (data.films[index].rating - nb <= -1)
    return 'img/star_empty.png';
}

function display_modal(index)
{
  document.querySelector("body").style.overflow = "hidden";
  modal.style.display = "block";
  modal.innerHTML =
  '<span class="close_btn">' +
    '<span class="close_btn_bar"></span>' +
    '<span class="close_btn_bar"></span>' +
  '</span>' +
  '<div class="black_bg"></div>' +
  '<div class="modal_container">' +
    '<div class="modal_player">' +
    /* */
    '<div class="moviePlayer">' +
      '<div class="containerNavBar">' +
        '<div id="progressBar">' +
          '<div id="myBar"></div>' +
        '</div>' +
        '<nav class="navBar">' +
          '<div id="time"></div>' +
          '<div id="one"><img src="./icon/tensec.png" id="before"> </div>' +
          '<div id="two"><img src="./icon/play-1.png" id="play"> </div>' +
          '<div id="three"><img src="./icon/10secmore-1.png" id="after"> </div>' +
          '<div id="four"><img src="./icon/stop.png" id="stop"> </div>' +
          '<div id="five">' +
            '<img src="./icon/sound-1.png" id="sound">' +
            '<div class="range_zone"></div>' +
            '<input type="range" orient="vertical" min="1" max="100" class="slider" id="myRange">' +
          '</div>' +
          '<div id="six"><img src="./icon/fullscreen.png" id="fullScreen"></div>' +
        '</nav>' +
      '</div>' +
      '<div id="progressBar2">' +
        '<div id="myBar2"></div>' +
      '</div>' +
      '<video id="movie"></video>' +
    '</div>' +
    /* */
      '<img src="' + data.films[index].image_url + '" class="modal_player_img">' +
      '<img src="img/player_play_btn.png" title="Watch now!" class="modal_player_play">' +
    '</div>' +
    '<div class="modal_info">' +
      '<div class="modal_first_line">' +
        '<h2 class="modal_title">' + data.films[index].title + '</h2>' +
        '<p class="modal_year">' + data.films[index].year + '</p>' +
        '</div>' +
      '<div class="modal_rating">' +
        '<div class="modal_rating_star_container">' +
          '<img src="' + put_star(1, index) + '" alt="star rating" title="Star rating" class="modal_rating_star">' +
          '<img src="' + put_star(2, index) + '" alt="star rating" title="Star rating" class="modal_rating_star">' +
          '<img src="' + put_star(3, index) + '" alt="star rating" title="Star rating" class="modal_rating_star">' +
          '<img src="' + put_star(4, index) + '" alt="star rating" title="Star rating" class="modal_rating_star">' +
          '<img src="' + put_star(5, index) + '" alt="star rating" title="Star rating" class="modal_rating_star">' +
          '</div>' +
        '<div class="modal_rating_number">' + data.films[index].rating + ' / 5</div>' +
        '</div>' +
      '<div class="modal_author">By ' + data.films[index].author + '</div>' +
      '<div class="modal_description">' + data.films[index].description + '</div>' +
      '<div class="modal_social">' +
        '<a class="modal_social_link" href="' + data.films[index].author_url + '">' +
          '<img class="modal_social_img" src="img/social_logo.png" alt="social logo" title="Youtube"></img>' +
        '</a>' +
        '<a class="modal_social_link" href="' + data.films[index].author_url + '">' +
          '<img class="modal_social_img" src="img/social_logo2.png" alt="social logo" title="Facebook"></img>' +
        '</a>' +
        '<a class="modal_social_link" href="' + data.films[index].author_url + '">' +
          '<img class="modal_social_img" src="img/social_logo3.png" alt="social logo" title="Tipeee"></img>' +
        '</a>' +
        '</div>' +
        '<div class="modal_playnow">' +
          '<p class="modal_playnow_text">PLAY NOW</p>' +
          '<img src="img/playnow_btn.png" alt="" class="modal_playnow_img">' +
        '</div>' +
      '</div>' +
    '</div>';
    document.querySelector(".close_btn").addEventListener("click", function()
    {
      close_modal();
    });
    document.querySelector(".modal_player_play").addEventListener("click", function()
    {
      play_video();
    });
    document.querySelector(".modal_playnow").addEventListener("click", function()
    {
      play_video();
      scroll_top();
    });
}






/* PLAYER VIDEO */




var int;

function Player (id, index){

/*data.films[].forEach(function(element){
    console.log(element.src) ;
})
*/
var dureeFilm = data.films[index].duration ;



var vid = document.getElementById(id);
// Set the location of movie

// Pour la version finale
vid.src = 'movies/'+ data.films[index].src
vid.load();

this.data = data;
var source  = document.createElement('src');
var after = document.getElementById('after');
var before = document.getElementById('before');
var fullscreen = document.getElementById('fullScreen');
var playButton = document.getElementById('play');
var slideContainer = document.getElementById('myRange');
var sound = document.getElementById('sound');
var stopButton = document.getElementById('stop');
var progressBar = document.getElementById('progressBar');
var moviePlayer = document.querySelector('.moviePlayer');
var containernavBar = document.querySelector('.containerNavBar');
var myBar = document.getElementById('myBar');
progressBar.value = 0;

var fullscreenValue = false;
// Set the slider
 slideContainer.value = 50;



 // Variable porcentage progress bar
 var vx;
 document.querySelector(".modal_player_play").addEventListener('click', function(){
   vid.play();
   playButton.src ='./icon/pause.png';
 })
var playing = true;
vid.volume = 0.5;
// Fonctionnalité volume

slideContainer.addEventListener('change', function(){
    var sliderValue = slideContainer.value;
    vid.volume = sliderValue*0.01;
    console.log(vid.volume)
    if(vid.volume <= 0.01){
       sound.src = './icon/nosound.png';
     } else {
       sound.src = './icon/sound-1.png';
     }
});


// Fonctionnalité play
playButton.addEventListener('click', function(){
    if(playing == false){
      vid.play();
    playButton.src ='./icon/pause.png';
    playing = true;
    }else {
    vid.pause();
    playButton.src ='./icon/play-1.png';
    playing = false;
    }

});


var moove = true;
// Disparition curseur
if(moove = true){
   window.setInterval(() => {
    vid.style.cursor = 'none';
    moove = false;
  }, 2500);
}

containernavBar.addEventListener('mouseleave', function(){
    containernavBar.style.opacity = 0;
    progressBar2.style.opacity = 0.6;
})

containernavBar.addEventListener('mouseenter', function(){
    containernavBar.style.opacity = 0.5;
    containernavBar.style.display = 'block';
    progressBar2.style.opacity = 0;
})

vid.addEventListener('mousemove', function(){
       vid.style.cursor = 'auto';
       moove = true;
})

// Fonctionnalité Stop
stopButton.addEventListener('click', function(){
    vid.pause();
    vid.currentTime = 0;
    playButton.src = './icon/play-1.png';
    playing = false;
});

// Fonctionnalité avancer de 10s
after.addEventListener('click', function(){
    vid.currentTime += 10;
});

// Fonctionnalité reculer de 10s
before.addEventListener('click', function(){
    vid.currentTime -= 10;
});

// Si la vidéo n'est pas en fullscreen

// Ajout de la fonctionnaité fullScreen
fullscreen.addEventListener('click', function(){

            function exitHandler()
            {
              setTimeout(function(){

                window.onresize = null;
                  if (document.exitFullscreen) {
                      document.exitFullscreen();
                  }
                  else if (document.mozCancelFullScreen) {
                      document.mozCancelFullScreen();
                  }
                  else if (document.webkitCancelFullScreen) {
                      document.webkitCancelFullScreen();
                  }
                    document.querySelector(".black_bg").style.display = "none";
                    moviePlayer.style.position = "absolute";
                    moviePlayer.style.width = "100%";
                    moviePlayer.style.top = "0";

                    vid.style.width = '100%';
                    // vid.style.top = Number(moviePlayer.style.height) * ;
                    containernavBar.style.width = '1170px';
                    containernavBar.style.top = "603px";
                    progressBar.style.width = '100%';
                    progressBar2.style.width = "100%";
                    progressBar2.style.position = 'absolute';
                    progressBar2.style.top = "653px";

                    document.querySelector(".close_btn").style.display = "block";
                  if(vx>= 100) vx = 100;
                  fullscreenValue = false;
                  document.removeEventListener('fullscreenchange', exitHandler);
                  document.removeEventListener('webkitfullscreenchange', exitHandler);
                  document.removeEventListener('mozfullscreenchange', exitHandler);
                  document.removeEventListener('MSFullscreenChange', exitHandler);

              }, 300)
            }

    if(fullscreenValue == false){
    launchIntoFullscreen(document);
    launchIntoFullscreen(document.documentElement);

    document.querySelector(".black_bg").style.display = "block";
    document.querySelector(".black_bg").style.zIndex = "1";

    window.onresize = function()
    {
      moviePlayer.style.position = "fixed";
      moviePlayer.style.width = '100vw';
      moviePlayer.style.height = Number(moviePlayer.style.width) * (2 / 3);
      moviePlayer.style.overflow = "hidden";
      moviePlayer.style.padding = 0;
      moviePlayer.style.margin = 0;
      moviePlayer.style.width = "100%";
      moviePlayer.style.top = (window.innerHeight - (window.innerWidth * 0.56)) / 2 + "px";

      vid.style.width = '100%';
      // vid.style.top = Number(moviePlayer.style.height) * ;
      containernavBar.style.width = '100%';
      containernavBar.style.top = window.innerWidth * 0.56 - 51 + "px";
      progressBar.style.width = '100%';
      progressBar2.style.width = "100%";
      progressBar2.style.position = 'absolute';
      progressBar2.style.top = window.innerWidth * 0.56 - 2 + "px";
      document.querySelector(".modal").style.overflow = "hidden";

      document.querySelector(".close_btn").style.display = "none";
      setTimeout(function()
      {
        document.addEventListener('fullscreenchange', exitHandler);
        document.addEventListener('webkitfullscreenchange', exitHandler);
        document.addEventListener('mozfullscreenchange', exitHandler);
        document.addEventListener('MSFullscreenChange', exitHandler);
      }, 200);
      // progressBar2.style.top = '100%';
    }

    fullscreenValue = true;
    }

    else {
      window.onresize = null;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
          document.querySelector(".black_bg").style.display = "none";
          moviePlayer.style.position = "absolute";
          moviePlayer.style.width = "100%";
          moviePlayer.style.top = "0";

          vid.style.width = '100%';
          // vid.style.top = Number(moviePlayer.style.height) * ;
          containernavBar.style.width = '1170px';
          containernavBar.style.top = "603px";
          progressBar.style.width = '100%';
          progressBar2.style.width = "100%";
          progressBar2.style.position = 'absolute';
          progressBar2.style.top = "653px";
          document.querySelector(".modal").style.overflow = "scroll";

          document.querySelector(".close_btn").style.display = "block";
        if(vx>= 100) vx = 100;
        fullscreenValue = false;
        document.removeEventListener('fullscreenchange', exitHandler);
        document.removeEventListener('webkitfullscreenchange', exitHandler);
        document.removeEventListener('mozfullscreenchange', exitHandler);
        document.removeEventListener('MSFullscreenChange', exitHandler);
      }
    });

  function launchIntoFullscreen(element) {
      if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }

    // Fonctionnalité vitesse


      // Fonctionnalité Temps
    int = setInterval(time, 15);
    function time(){

      var filmDuration =  dureeFilm.split(":");
      var filmMinutes = filmDuration[0];
      var filmSeconds = filmDuration[1];
      if(filmSeconds[1] == '' || filmSeconds[1] == null || filmSeconds[1] == undefined){
          filmSeconds += 0;
    }
    // Durée totale film
    var finalDuration = parseInt(filmMinutes)*60 + parseInt(filmSeconds);

    // Durée actuelle du film
    var currentTime = Math.floor(vid.currentTime);
    var currentMinutes = Math.floor(currentTime/60);
    var currentSeconds = Math.floor(currentTime % 60);
    var currentSecondsString = currentSeconds.toString();
    if(currentSecondsString[1] == null || currentSecondsString[1] == undefined || currentSecondsString[1] == '' ){
        currentSecondsString = 0 + currentSecondsString;
    }
    document.getElementById('time').innerHTML = '<p>' + currentMinutes + ':'+ currentSecondsString  + ' / ' + dureeFilm  + '</p>';

    var remainingTime = finalDuration - currentTime;
    var remainingMinutes = Math.floor(remainingTime/60);
    var remainingSeconds = Math.floor(remainingTime % 60);

    // ProgressBar
    progressBar.max = finalDuration;
    progressBar.value = currentTime;

    vx = (currentTime/finalDuration)*100;
    if(vx >= 100 && fullscreenValue == true ) vx = 100;
    myBar.style.width = vx+'%';
    myBar2.style.width = vx+'%';


    // Durée restante du film
    // var remainingFinal = remainingMinutes + ':' + remainingSeconds;

      document.onkeydown = function(event)
      {
        if (event.keyCode == 39)
          vid.currentTime += 10;
        else if (event.keyCode == 37)
          vid.currentTime -= 10;
        else if (event.keyCode == 32)
        {
          if (event.keyCode == 32)
            event.preventDefault();
          if(playing == false){
            vid.play();
          playButton.src ='./icon/pause.png';
          playing = true;
          }else {
          vid.pause();
          playButton.src ='./icon/play-1.png';
          playing = false;
          }
        }
      }
    }
  }

  document.querySelector(".navitm").addEventListener("click", function()
  {
    load_films("See All", "", "");
  });
});
