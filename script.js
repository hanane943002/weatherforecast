document.addEventListener("DOMContentLoaded", function () {
    let updateButton = document.getElementById("submit");
    updateButton.addEventListener("click", (event) => { //au click 
        event.preventDefault();
        let nomVille = document.getElementById("ville").value; //recuper nom de ville
        const API_KEY = "e950a84242a74027bd82bf9d1ceeca23" 
        //rechercher 
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
                const curr_day = myDate.getDay(); //extraire l'index de ma journee
                let d_names = ["Sunday", "Monday", "Tuesday", "Wednesday",
                    "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday",
                    "Thursday", "Friday", "Saturday"];
                let theDay = d_names[curr_day];//associer l'index au nom de ma journee
                // afficher une journée
                // document.querySelector('#printDay').innerHTML = `${theDay}`  
                // afficher  5jours de la semaine a partir d'aujourd'hui:
                for(let i = 0; i < 5 ; i++){
                    theDay = d_names[curr_day + i];
                     console.log(theDay);
                     let element = document.createElement("h3");
                     let newDiv = document.getElementById("printWeek");
                     newDiv.appendChild(element).innerHTML = `${theDay}`;
                 }
                let donGeo = data.results[0].geometry;// extraire lattitude et longitude de ma ville
                console.log(donGeo);
                let lat = donGeo.lat;//lattitude
                let lon = donGeo.lng;//longitude
                const APIKEY = "71bb893f2fa2cebc451e6c0e38c8aa52"
                let URL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIKEY}`//utiliser les donnees geo or avoir ma meteo
                fetch(URL2)
                    .then(response => {
                        if (response.status == 200) { // on vérifier que l'appel à l'API a fonctionné
                            return response.json()  // ne pas oublier le return du callback
                        }
                        else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
                    })
                    .then(data => {
                        
                        let meteo = data.current.weather[0].id; // recuperer la meteo de mon l'APi
                        console.log(meteo);
                        //afficher l'icone  de la meteo relatif a l'id 
                        if (meteo == 800) {
                            document.querySelector('#printIcon').src = `./icone/sun.svg`; 
                        } else if (meteo >= 600 && meteo <= 622) {
                            document.querySelector('#printIcon').src = `./icone/snow.svg`;
                        } else if (meteo > 800) {
                            document.querySelector('#printIcon').src = `./icone/clouds.svg`;
                        } else if (meteo >= 200 && meteo <= 531) {
                            document.querySelector('#printIcon').src = `./icone/rain.svg`;
                        } else if (meteo >= 701 && meteo <= 781) {
                            document.querySelector('#printIcon').src = `./icone/cloudy.svg`;
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    });

});