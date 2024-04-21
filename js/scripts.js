let pokemonRepository = (function () {
    
    let pokemonList = [
    {name: "beartic", height: "10", type: "ice"},
    {name: "balbasure", height: "7", type: "grass"},
    {name: "eve", height: "5", type: ["water", "speed"]}
    ]

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

// forEach loop
pokemonRepository.getAll().forEach(function (pokemon) {
    if (pokemon.height >= 8) {
        document.write("</br>" + pokemon.name + "(height: " 
        + pokemon.height + ") Wow, that's big!");
    } else if (pokemon.height) {
        document.write("</br>" + pokemon.name + "(height: " 
        + pokemon.height + ")")
    }
});
