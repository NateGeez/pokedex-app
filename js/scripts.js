let pokemonRepository = (function() {
    //An empty array
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Adds a new pokemon
    function add(pokemon) {
        if (
            typeof pokemon === "object" && 
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }
    
      // return all users
    function getAll() {
    return pokemonList;
  }

  //add a list of buttons to the array
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listpokemon = document.createElement("li");
    listpokemon.classList.add("list-group-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener('click', function () {
        showDetails(pokemon);
    });
}


//JSON Fetch API
function loadList() {
    return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (json) {
        json.results.forEach(function (item) {
        let pokemon = {
            name: item.name,
            detailsUrl: item.url
        };
        add(pokemon);
    });
}).catch(function (e) {
    console.error(e);
})
}

function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
        return response.json();
    }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(typeInfo => typeInfo.type.name).join(', ');
    }).catch(function (e) {
        console.error(e);
    });
}


  // Function to show details of a Pokémon (loads details and then shows modal)
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon.name, "Height: " + pokemon.height + "\n Types: " + pokemon.types, pokemon.imageUrl);
    });
  }
  

  function showModal(title, text, imageUrl) {
    //Modal title
    let modalTitle = document.querySelector("#exampleModalLabel");
    modalTitle.innerText = title;
    
    //Modal body and clear previous
    let modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML ="";

    //Create content elements
    let textElement = document.createElement("p");
    textElement.innerText = text;

    let imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    imageElement.classList.add("pokemon-image");

    //Append new content
    modalBody.appendChild(textElement);
    modalBody.appendChild(imageElement);

    //Show the Bootstrap modal
    $("#modal-container").modal("show");
  }


return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
};

})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

