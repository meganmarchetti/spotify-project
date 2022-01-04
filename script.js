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
    url: "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=0",
    headers: {
       'Authorization' : 'Bearer ' + accessToken
    },
    success: function(data) {
      console.log(data);
      const top = document.getElementById("topContainer");
      getTop(data.items);

      function getTop(arts) {
          top.innerHTML = "";

          arts.forEach((art) => {
              const { name, images, genres  } = art;
              const artEl = document.createElement('div');
              artEl.classList.add('art');
              artEl.innerHTML = `
              <img src="${images[1].url}">
              <div class="tname">${name}</div>
              <div class="genre">${genres[0]}</div>
               `;
              top.appendChild(artEl);
          });
      }
      console.log(top);
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
  
      console.log(data);
      const topt = document.getElementById("topt");
      getTopT(data.items);

      function getTopT(trks) {
          topt.innerHTML = "";

          trks.forEach((trk) => {
              const { name, images, album, artists  } = trk;
              const trkEl = document.createElement('div');
              trkEl.classList.add('trk');
              trkEl.innerHTML = `
              <img src="${album.images[1].url}">
              <div class="tname">${name}</div>
              <div class="artist">${artists[0].name}</div>
              <div class="album">${album.name}</div>
               `;
              topt.appendChild(trkEl);
          });
      }
      console.log(topt);
    
    },
    dataType: "json"
  });

  $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/me/player/recently-played?limit=10",
    headers: {
       'Authorization' : 'Bearer ' + accessToken
    },
    success: function(data) {
  
      console.log(data);
      const rl = document.getElementById("rl");
      getRec(data.items);
  
      function getRec(recs) {
        rl.innerHTML = "";
  
        recs.forEach((rec) => {
            const { track, name, images, album, artists  } = rec;
            const rlEl = document.createElement('div');
            rlEl.classList.add('rec');
            rlEl.innerHTML = `
            <img src="${track.album.images[1].url}">
            <div class="tname">${track.name}</div>
            <div class="artist">${track.artists[0].name}</div>
            <div class="album">${track.album.name}</div>
             `;
            rl.appendChild(rlEl);
        });
    }
    
    },
    dataType: "json"
  });

 });
