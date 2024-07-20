
function getCard(record) {
    return `<div class="card">
            <img src="${record.imageUrl}" width="500" height="600">
            <h3>${record.name}</h3>
            <p>${record.description}</p>
            <button>Visit</button>
        </div>`;
}

function getErrorCard(errorMessage) {
    return `<div class="card">
            <h3>${errorMessage}</h3>
            </div>`;
}

const url = './travel_recommendation_api.json';
const searchBtn = document.querySelector('#btnSearch');
const clearBtn = document.querySelector("#btnClear");
const searchInput = document.querySelector('#searchInput')
const searchListDiv = document.querySelector("#searchList");

clearBtn.addEventListener('click', () => {
    searchListDiv.innerHTML = '';
});

searchBtn.onclick = function() {
    let cardList = '';
    let searchTxt = searchInput.value;
    if(searchTxt) {
        searchTxt = searchTxt.toLowerCase();
        if(searchTxt.includes("beach")) {
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    data.beaches.forEach(beach => {
                            cardList += getCard(beach);
                    });
                    searchListDiv.innerHTML = cardList;
                })
                .catch(error => {
                    console.error("Fetching operation failed, here is the error: ", error);
                    searchListDiv.innerHTML = getErrorCard("Fetching Error");
                });
  
        } else if(searchTxt.includes("temple")) {
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    data.temples.forEach(temple => {
                            cardList += getCard(temple);
                    });
                    searchListDiv.innerHTML = cardList;
                })
                .catch(error => {
                    console.error("Fetching operation failed, here is the error: ", error);
                    searchListDiv.innerHTML = getErrorCard("Fetching Error");
                });
        } else if(searchTxt.includes("country") || searchTxt.indexOf("countries") > -1) {
            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    data.countries[Math.floor(Math.random() * (data.countries.length - 0 + 1) + 0)].cities.forEach(city => {
                            cardList += getCard(city);
                    });
                    searchListDiv.innerHTML = cardList;
                })
                .catch(error => {
                    console.error("Fetching operation failed, here is the error: ", error);
                    searchListDiv.innerHTML = getErrorCard("Fetching Error");
                });
        } else {
            searchListDiv.innerHTML = getErrorCard("No results found matching the entered keywords");
        }        
    }
    else {
        searchListDiv.innerHTML = getErrorCard("Please enter keyword to search");
    }
}