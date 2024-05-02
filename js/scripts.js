let pokemonRepository = (function() {
    //An empty array
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');

    function showModal(title, text, imageUrl) {
        
        
        //create modal
        modalContainer.innerHTML ='';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //create modal close button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        //create title
        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        //create text
        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        //image created
        let imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.classList.add('pokemon-image');

        //add created Nodes
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    //close modal by clicking escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
        }
    });
    
    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
        hideModal();
        }
    });

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
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    button.addEventListener('click', function () {
        showDetails(pokemon);
    });
}

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
      showModal(pokemon.name, "Height: " + pokemon.height, pokemon.imageUrl);
    });
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