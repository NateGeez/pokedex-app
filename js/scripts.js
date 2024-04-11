let pokemonList=[
    {name: "balbasure", height: "7", type: "grass"},
    {name: "eve", height: "5", type: ["water", "speed"]},
    {name: "beartic", height: "10", type: "ice"}
]

for (let i=0; i < pokemonList.length; i++){
    document.write (pokemonList[i].name + " (height: "
    + pokemonList[i].height + ") ");
    if  (pokemonList[i].height > 8)
    document.write ("Wow, that's big!");
}