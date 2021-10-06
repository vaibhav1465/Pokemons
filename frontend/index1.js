display = (data) => {

    let overlayIndex = data.length;

    let pokeString = "";

    data.map((pokemon, index) => {
        pokeString += `

            <div class="pokemon">
                <div class="front" style="z-index:${overlayIndex}">
                    <div style="padding: 5px 15px; ">
                        <h1>${pokemon.name} <span> <button class="btn del" onclick="deletepokemon('${pokemon._id}')" >Delete</button></span></h1>
                        <p>${pokemon.type}</p>
                    </div>

                </div>

                <div class="back" style="z-index:${overlayIndex - 1}">

                <div class="details" >
                    <p  class="detail">
                        HP : ${pokemon.base.HP}
                    </p>

                    <p class="detail">
                        Attack : ${pokemon.base.Attack}
                    </p>

                    <p class="detail">
                        Defense : ${pokemon.base.Defense}
                    </p>

                    <p class="detail">
                        Speed : ${pokemon.base.Speed}
                    </p>
                
                </div>

                </div>

            </div>


            `;

        overlayIndex--;
    })
    // console.log(pokeString);
    document.getElementById('pokemons').innerHTML = pokeString;

}
let pokemons=[];
fetch("http://localhost:8000/pokemons")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log(pokemons);
        pokemons=data;
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
  if(pokemon.name !=="" && pokemon.type!=="" && pokemon.base.HP!=="" &&pokemon.base.Attack!=="" && pokemon.base.Defense!=="" && pokemon.base.Speed!==""){
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
            pokemons.push(data);
            console.log(data);
            display(pokemons);
            document.getElementById("form").reset();
            message("Pokemon Created");

        })
        .catch((err) => {
            console.log(err);
        })


    }

}
message=(data)=>{
document.getElementById("message").style.display="block"; 
document.getElementById("message").innerText=data;
setTimeout(()=>{
    document.getElementById("message").style.display="none";    
},5000);
}
deletepokemon=(id)=>{
    console.log(id);
    fetch(`http://localhost:8000/pokemons/${id}`,{
        method: "Delete",
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            let index=pokemons.findIndex((val)=>{
                return val._id==id;
            })
             pokemons.splice(index,1);
            display(pokemons);
          
            message("Pokemon Deleted");

        })
        .catch((err) => {
            console.log(err);
        })    

}
