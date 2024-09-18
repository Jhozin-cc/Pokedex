// Definição das constantes de seleção de nome,número e imagem, Conforme o Id definido  
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

// Definição das constantes de seleção no uso da barra de pesquisa e botões
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn--prev');
const buttonNext = document.querySelector('.btn--next');

let searchPokemon = 1 ;

// definição da constante assincrona que ira buscar os dados do pokemon na API e trará
// ao codigo sua imagem, nome e numero
const fetchPokemon =async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    //Espera a resposta da api para dizer se é um número valido ou nao para a continuidade sem erro de dados
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = ' Loading...';
    pokemonNumber.innerHTML = ' ';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default']
        input.value='';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

})

buttonPrev.addEventListener('click', ()=>{
    if (searchPokemon>1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
})

buttonNext.addEventListener('click', ()=>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);


