let pokemonList = [
    {name: "beartic", height: "10", type: "ice"},
    {name: "balbasure", height: "7", type: "grass"},
    {name: "eve", height: "5", type: ["water", "speed"]}

]

function myLoopFunction(pokemon) {
    document.write("</br>" + pokemon.name + " (height: " 
    + pokemon.height + ") ");
    if (pokemon.height > 8)
    document.write ("Wow, that's big!");
}
pokemonList.forEach(myLoopFunction);
