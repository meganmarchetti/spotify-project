// Document has been loaded
$( document ).ready(function() {
    // Helper Function to Extract Access Token for URL
   const getUrlParameter = (sParam) => {
     let sPageURL = window.location.search.substring(1),////substring will take everything after the https link and split the #/&
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

   // Get Access Token
   const accessToken = getUrlParameter("access_token");
   console.log(accessToken);


   let client_id = "db818a3b9a634a46a6bc567cf3f03354";

   let redirect_uri = "https://fervent-yonath-82bf73.netlify.app"; 


   const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
   // Don't authorize if we have an access token already
   if(accessToken == null || accessToken == "" || accessToken == undefined){
     window.location.replace(redirect);
   }

   $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/users/meegan98",
    headers: {
       'Authorization' : 'Bearer ' + accessToken
    },
    success: function(data) {
      console.log(data);
      
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

    // $.ajax({
    //    url: `https://api.spotify.com/v1/search?q=${search_query}&type=track`,
    //    type: "GET",
    //    headers: {
    //        'Authorization' : 'Bearer ' + accessToken
    //    },
    //    success: function(data) {
         
    //    }
    // }); 
 });