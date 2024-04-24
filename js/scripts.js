let pokemonRepository = (function () {
    let repository = [
    {   
        name: "Beartic", 
        height: "8.5", 
        type: "ice"
    },
    {
        name: "Bulbasaur", 
        height: "2.3", 
        type: ["grass", "poison"]
    },
    {   
        name: "Eevee", 
        height: "1", 
        type: "normal"
    }
    ];

    function add(pokemon) {
        repository.push(pokemon);
    }

    function getAll() {
        return repository;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        })
    }

    function showDetails(pokemon) {
        console.log(pokemon.name, pokemon.height, pokemon.type);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon){
pokemonRepository.addListItem(pokemon);
});