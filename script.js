// ta
document.getElementById('ta-btn-modal').addEventListener('click', function() {
  document.getElementById('overlay').classList.add('is-visible');
  document.getElementById('ta-modal').classList.add('is-visible');
});

document.getElementById('ta-close').addEventListener('click', function() {
  document.getElementById('overlay').classList.remove('is-visible');
  document.getElementById('ta-modal').classList.remove('is-visible');
});
document.getElementById('overlay').addEventListener('click', function() {
  document.getElementById('overlay').classList.remove('is-visible');
  document.getElementById('ta-modal').classList.remove('is-visible');
});
// tt
document.getElementById('tt-btn-modal').addEventListener('click', function() {
  document.getElementById('overlay').classList.add('is-visible');
  document.getElementById('tt-modal').classList.add('is-visible');
});

document.getElementById('tt-close').addEventListener('click', function() {
  document.getElementById('overlay').classList.remove('is-visible');
  document.getElementById('tt-modal').classList.remove('is-visible');
});
document.getElementById('overlay').addEventListener('click', function() {
  document.getElementById('overlay').classList.remove('is-visible');
  document.getElementById('tt-modal').classList.remove('is-visible');
});
// rl
document.getElementById('rl-btn-modal').addEventListener('click', function() {
  document.getElementById('overlay').classList.add('is-visible');
  document.getElementById('rl-modal').classList.add('is-visible');
});

document.getElementById('rl-close').addEventListener('click', function() {
  document.getElementById('overlay').classList.remove('is-visible');
  document.getElementById('rl-modal').classList.remove('is-visible');
});
document.getElementById('overlay').addEventListener('click', function() {
  document.getElementById('overlay').classList.remove('is-visible');
  document.getElementById('rl-modal').classList.remove('is-visible');
});





$( document ).ready(function() {
    // extract access token
   const getUrlParameter = (sParam) => {
     let sPageURL = window.location.search.substring(1),//substring will take everything after the https link and split the #/&
         sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split("#") : [],
         sParameterName,
         i;
     let split_str = window.location.href.length > 0 ? window.location.href.split("#") : [];
     sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split("&") : [];
     for (i = 0; i < sURLVariables.length; i++) {
         sParameterName = sURLVariables[i].split("=");
         if (sParameterName[0] === sParam) {
             return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
         }
     }
 };

   const accessToken = getUrlParameter("access_token");


   let client_id = "db818a3b9a634a46a6bc567cf3f03354";

   let redirect_uri = "https://fervent-yonath-82bf73.netlify.app"; 

    let scope = "user-read-playback-state user-read-currently-playing user-read-private user-follow-read user-library-read user-read-playback-position user-top-read user-read-recently-played user-read-email";


   const redirect = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;
   // don't authorize if we have an access token already
   if(accessToken == null || accessToken == "" || accessToken == undefined){
     window.location.replace(redirect);
   }

   $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/me",
    headers: {
       'Authorization' : 'Bearer ' + accessToken
    },
    success: function(data) {
      
      var ppic = data.images[0].url;
      var fwers = data.followers.total;
      var user = data.display_name;
      var lnk = data.external_urls.spotify;
  
      
      var propic = document.getElementById("propic");
      var followers = document.getElementById("followers");
      var uname = document.getElementById("uname");
      var plink = document.getElementById("plink");
      
      
      propic.innerHTML = "<img src=" + ppic + ">";
      followers.textContent = fwers;
      uname.textContent = user;
      plink.innerHTML = '<a target=_blank href="' + lnk + '">Full Profile</a>';
      
    
    },
    dataType: "json"
  });

$.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=3&offset=0",
    headers: {
       'Authorization' : 'Bearer ' + accessToken
    },
    success: function(data) {

      var top1 = data.items[0].name;
      var top2 = data.items[1].name;
      var top3 = data.items[2].name;
  
      var pic1 = data.items[0].images[0].url;
      var pic2 = data.items[1].images[0].url;
      var pic3 = data.items[2].images[0].url;
  
      var genre1 = data.items[0].genres[0];
      var genre2 = data.items[1].genres[0];
      var genre3 = data.items[2].genres[3];
  
      var pics1 = document.getElementById("pic1");
      var pics2 = document.getElementById("pic2");
      var pics3 = document.getElementById("pic3");
  
      var names1 = document.getElementById("name1");
      var names2 = document.getElementById("name2");
      var names3 = document.getElementById("name3");
  
      var genres1 = document.getElementById("genre1");
      var genres2 = document.getElementById("genre2");
      var genres3 = document.getElementById("genre3");
  
      pics1.innerHTML = "<img src=" + pic1 + ">";
      pics2.innerHTML = "<img src=" + pic2 + ">";
      pics3.innerHTML = "<img src=" + pic3 + ">";
      names1.textContent = top1;
      names2.textContent = top2;
      names3.textContent = top3;
      genres1.textContent = genre1;
      genres2.textContent = genre2;
      genres3.textContent = genre3;
    
    },
    dataType: "json"
  });

  $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=3&offset=0",
    headers: {
       'Authorization' : 'Bearer ' + accessToken
    },
    success: function(data) {
  
      var tname1 = data.items[0].name;
      var tname2 = data.items[1].name;
      var tname3 = data.items[2].name;
  
      var tpic1 = data.items[0].album.images[1].url;
      var tpic2 = data.items[1].album.images[1].url;
      var tpic3 = data.items[2].album.images[1].url;
  
      var aname1 = data.items[0].artists[0].name;
      var aname2 = data.items[1].artists[0].name;
      var aname3 = data.items[2].artists[0].name;

      var alb1 = data.items[0].album.name;
      var alb2 = data.items[1].album.name;
      var alb3 = data.items[2].album.name;
  
      var trpic1 = document.getElementById("trpic1");
      var trpic2 = document.getElementById("trpic2");
      var trpic3 = document.getElementById("trpic3");
  
      var trnames1 = document.getElementById("trname1");
      var trnames2 = document.getElementById("trname2");
      var trnames3 = document.getElementById("trname3");
  
      var trart1 = document.getElementById("trart1");
      var trart2 = document.getElementById("trart2");
      var trart3 = document.getElementById("trart3");

      var tralb1 = document.getElementById("tralb1");
      var tralb2 = document.getElementById("tralb2");
      var tralb3 = document.getElementById("tralb3");
  
      trpic1.innerHTML = "<img src=" + tpic1 + ">";
      trpic2.innerHTML = "<img src=" + tpic2 + ">";
      trpic3.innerHTML = "<img src=" + tpic3 + ">";
      trnames1.textContent = tname1;
      trnames2.textContent = tname2;
      trnames3.textContent = tname3;
      trart1.textContent = aname1;
      trart2.textContent = aname2;
      trart3.textContent = aname3;
      tralb1.textContent = alb1;
      tralb2.textContent = alb2;
      tralb3.textContent = alb3;
    
    },
    dataType: "json"
  });

  $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/me/player/recently-played",
    headers: {
       'Authorization' : 'Bearer ' + accessToken
    },
    success: function(data) {
  
      var tn1 = data.items[0].track.name;
      var tn2 = data.items[1].track.name;
      var tn3 = data.items[2].track.name;
  
      var tp1 = data.items[0].track.album.images[1].url;
      var tp2 = data.items[1].track.album.images[1].url;
      var tp3 = data.items[2].track.album.images[1].url;
  
      var a1 = data.items[0].track.artists[0].name;
      var a2 = data.items[1].track.artists[0].name;
      var a3 = data.items[2].track.artists[0].name;

  
      var rpic1 = document.getElementById("rpic1");
      var rpic2 = document.getElementById("rpic2");
      var rpic3 = document.getElementById("rpic3");
  
      var rnames1 = document.getElementById("rname1");
      var rnames2 = document.getElementById("rname2");
      var rnames3 = document.getElementById("rname3");
  
      var rart1 = document.getElementById("rart1");
      var rart2 = document.getElementById("rart2");
      var rart3 = document.getElementById("rart3");

  
      rpic1.innerHTML = "<img src=" + tp1 + ">";
      rpic2.innerHTML = "<img src=" + tp2 + ">";
      rpic3.innerHTML = "<img src=" + tp3 + ">";
      rnames1.textContent = tn1;
      rnames2.textContent = tn2;
      rnames3.textContent = tn3;
      rart1.textContent = a1;
      rart2.textContent = a2;
      rart3.textContent = a3;

    
    },
    dataType: "json"
  });
  $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x/top-tracks",
    headers: {
       'Authorization' : 'Bearer ' + accessToken
    },
    success: function(data) {
      console.log(data);
      
    
    },
    dataType: "json"
  });
 });