ourRequest = new XMLHttpRequest();
ourRequest.open("GET", "https://gist.githubusercontent.com/ozdemirburak/4821a26db048cc0972c1beee48a408de/raw/4754e5f9d09dade2e6c461d7e960e13ef38eaa88/cities_of_turkey.json", true);



ourRequest.onload = () => {
  if (ourRequest.status == 200) {
    const ourData = JSON.parse(ourRequest.responseText);


    const src = document.querySelector(".src");
    const suggestions = document.querySelector(".sug");

    src.addEventListener("keyup", displayMatches);
    src.addEventListener("change", displayMatches);


    function displayMatches() {
      const matchArray = renderHtml(ourData, src.value);

      const html = matchArray.map(place => {
        const regex = new RegExp(src.value, 'gi');
        const cityName = place.name.replace(regex, `<span class="hl">${src.value}</span>`);

        return ` <li>
        <span class="name">${cityName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
        `;

      }).join('');

      suggestions.innerHTML = html;


    }

  } else {
    const suggestions = document.querySelector(".sug");
    suggestions.innerHTML = "error";
  }

}

ourRequest.send();



function renderHtml(data, value) {

  return data.filter(place => {

    const regex = new RegExp(value, 'gi');
    return place.name.match(regex);

  });



}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}





