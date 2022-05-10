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

            const myDate = new Date();
            const curr_day  = myDate.getDay();
            let d_names = ["Sunday","Monday", "Tuesday", "Wednesday", 
            "Thursday", "Friday", "Saturday"];
            let theDay = d_names[curr_day];
            document.querySelector('#printDay').innerHTML = `${theDay}`

            let donGeo = data.results[0].geometry;
            console.log(donGeo);
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
                if(meteo == 800){
                    document.querySelector('#printIcon').src = `./icone/sun.svg`;
                }else if(meteo>=600 && meteo<=622){
                    document.querySelector('#printIcon').src = `./icone/snow.svg`;
                }else if(meteo > 800){
                    document.querySelector('#printIcon').src = `./icone/clouds.svg`;
                }else if(meteo>=200 && meteo<=531){
                    document.querySelector('#printIcon').src = `./icone/rain.svg`;
                }else if(meteo>=701 && meteo<=781){
                    document.querySelector('#printIcon').src = `./icone/cloudy.svg`;
                }
       
            })
            .catch(err => console.log(err)) 
        })
        .catch(err => console.log(err))
 });

  });