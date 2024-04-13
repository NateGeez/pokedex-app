let pokemonList = [
    {name: "beartic", height: "10", type: "ice"},
    {name: "balbasure", height: "7", type: "grass"},
    {name: "eve", height: "5", type: ["water", "speed"]}

]

for (let i=0; i < pokemonList.length; i++){
    document.write ("<p>" + pokemonList[i].name + " (height: "
    + pokemonList[i].height + ") " + "</p>");
    if  (pokemonList[i].height > 8)
    document.write ("Wow, that's big!");
}