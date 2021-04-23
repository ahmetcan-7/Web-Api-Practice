async function getApi() {

    const response = await fetch("https://www.breakingbadapi.com/api/characters");
    const data = await response.json();

    //transform array form
    const char = getCharacter(data);
    const img = getImages(data);
    const name = getActors(data);


    createCharacterList(char);
    loadImagesAndName(img, name);


}

getApi();


function getCharacter(data) {
    let balankArray = [];

    data.forEach((e) => {
        balankArray.push(e.name);
    })
    return balankArray;

}

function getImages(data) {
    let balankArray = [];

    data.forEach((e) => {
        balankArray.push(e.img);
    })
    return balankArray;

}

function getActors(data) {
    let balankArray = [];

    data.forEach((e) => {
        balankArray.push(e.portrayed);
    })
    return balankArray;

}

function createCharacterList(data) {
    const select = document.querySelector("select");
    let characters = "<option>Bir karakter seçiniz</option>";
    for (i = 0; i < data.length; i++) {
        characters += `<option>${data[i]}</option>`;
    }
    select.innerHTML += characters;
}

function loadImagesAndName(value, name) {
    const select = document.querySelector("select");
    select.addEventListener("change", (e) => {
        const character = select.options[select.selectedIndex].value;
        const index = select.selectedIndex - 1;
        imgTag = document.querySelector("img");
        pTag = document.querySelector("p");

        if (character != "Bir karakter seçiniz") {
            imgTag.src = value[index];
            pTag.innerHTML = name[index];
        }

    })


}