window.addEventListener('load', () => {
    let long;
    let lat;
    const token = 'API_TOKEN';
    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let location = document.querySelector('.location-timezone');
    let iconImg = document.getElementById('icon');
    let tempSection = document.querySelector('.degree-section');
    let temperatureSpan = document.querySelector('.degree-section span');


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${token}`;
            console.log(long);
            console.log(lat);

            fetch(api)
                .then(response => {return response.json()})
                .then(data => {
                    const {description, icon} = data.weather[0];
                    const temp = data.main.temp;
                    const tempFar = Math.round((parseFloat(temp) - 273.15) * 9/5 + 32);
                    const tempCel = Math.round(parseFloat(temp) - 273.15);
                    tempDescription.textContent = description;
                    tempDegree.textContent = tempFar;
                    location.textContent = data.name;
                    iconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    tempSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent.slice(-1) === 'F') {
                            temperatureSpan.textContent = String.fromCharCode('0xB0') + 'C';
                            tempDegree.textContent = tempCel;
                        } else {
                            temperatureSpan.textContent = String.fromCharCode('0xB0') + 'F';
                            tempDegree.textContent = tempFar;
                        }
                    });
                });
        });
    }

    

});

