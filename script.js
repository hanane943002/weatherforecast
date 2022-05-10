document.addEventListener("DOMContentLoaded", function() {

    
    let updateButton = document.getElementById("submit");
    updateButton.addEventListener("click", (event) => {
        event.preventDefault();
        let nomVille = document.getElementById("ville").value;
        const API_KEY = "e950a84242a74027bd82bf9d1ceeca23"
        let URL = `https://api.opencagedata.com/geocode/v1/json?q=${nomVille}&key=${API_KEY}&language=fr&pretty=1`
        
        fetch(URL) 
        .then(response => { 
            if (response.status == 200) { // on vérifier que l'appel à l'API a fonctionné
                return response.json()  // ne pas oublier le return du callback
            }
            else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
        })
        .then(data => {
            let donGeo = data.results[0].geometry;
            console.log(donGeo);
//Afficher la date du jour
//  function AfficherJOur(){
    const birthday = new Date('August 19, 1975 23:15:30');
    const day1 = birthday.getDay();
    // Sunday - Saturday : 0 - 6
    
    console.log(day1);
    // expected output: 2
//  };

//Afficher l'icon;
            let lat = donGeo.lat;
            let lon = donGeo.lng;


            const APIKEY = "71bb893f2fa2cebc451e6c0e38c8aa52"
            let URL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}`

            fetch(URL2) 
            .then(response => { 
                if (response.status == 200) { // on vérifier que l'appel à l'API a fonctionné
                    return response.json()  // ne pas oublier le return du callback
                }
                else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
            })
            .then(data => {
                let meteo = data.current.weather[0].id;
                console.log(meteo);
                function AfficherMeteo(icon){
                    document.querySelector('#printIcon').src = `./icone/${icon}`;
                 };
                if(meteo == 800){
                    AfficherMeteo(sun.svg);
                }else if(meteo>=600 && meteo<=622){
                    AfficherMeteo(snow.svg);
                }else if(meteo>800){
                    AfficherMeteo(cloud.svg);
                }else if(meteo>=200 && meteo<=531){
                    AfficherMeteo(rain.svg);
                }else if(meteo>=701 && meteo<=781){
                    AfficherMeteo(cloudy.svg);
                }
       
            })
            .catch(err => console.log(err)) 
        })
        .catch(err => console.log(err))
 });

  });