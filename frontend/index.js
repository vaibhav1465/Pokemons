display = (data) => {

    let overlayIndex = data.length;

    let pokeString = "";

    data.map((pokemon, index) => {
        pokeString += `

            <div class="pokemon">
                <div class="overlay" style="z-index:${overlayIndex}">
                    <div style="padding: 20px 15px;">
                        <h1>${pokemon.name}</h1>
                        <p>${pokemon.type}</p>
                    </div>

                </div>

                <div class="more" style="z-index:${overlayIndex - 1}">

                <div class="details" >
                    <p style="width:40%;padding:10px 0">
                        HP : ${pokemon.base.HP}
                    </p>

                    <p style="width:40%;padding:10px 0">
                        Attack : ${pokemon.base.Attack}
                    </p>

                    <p style="width:40%;padding:10px 0">
                        Defense : ${pokemon.base.Defense}
                    </p>

                    <p style="width:40%;padding:10px 0">
                        Speed : ${pokemon.base.Speed}
                    </p>
                
                </div>

                </div>

            </div>


            `;

        overlayIndex--;
    })

    document.getElementById('pokemons').innerHTML = pokeString;

}


// fetch all pokemons 

fetch("http://localhost:8000/pokemons")
    .then((response) => {
        return response.json();
    })
    .then((pokemons) => {
        console.log(pokemons);
        display(pokemons);
    })
    .catch((err) => {
        console.log(err);
    })



addPokemon = () => {

    let pokemon = { base: {} };

    pokemon.name = document.getElementById('name').value;
    pokemon.type = document.getElementById('type').value;
    pokemon.base.HP = document.getElementById('HP').value;
    pokemon.base.Attack = document.getElementById('Attack').value;
    pokemon.base.Defense = document.getElementById('Defense').value;
    pokemon.base.Speed = document.getElementById('Speed').value;

    fetch("http://localhost:8000/pokemons", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pokemon)

    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

        })
        .catch((err) => {
            console.log(err);
        })




}

