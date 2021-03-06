
    function pupulateUFs(){
        const ufSelect = document.querySelector("select[name=uf]")

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( (res) => { return res.json() })
        .then( states => {
            
            for( const state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        } )
    }

    pupulateUFs()
    
    function getCities(event) {
        const citySelect = document.querySelector("select[name=city]")
        const stateInput = document.querySelector("input[name=state]")

        const ufValue = event.target.value

        const indexOfSelectedState = event.target.selectedIndex
        stateInput.value = event.target.options[indexOfSelectedState].text

        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

        citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
        citySelect.disabled = true

        fetch(url)
        .then( (res) => { return res.json() })
        .then( cities => {
            
            for( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false

        } )

    }


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

// Itens de coleta
// Pegar cada click e adicionar a classe
// Pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

// Colocar uma variavel para receber a Id selecionada
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // Adicionar ou remover uma classe em JavaScript
    // (add = adiciona a classe 
    // remove = ele remove a classe
    // toggle = adiciona ou remove a classe)

    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    // verificar se existem items selecionados
    // se sim, pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se estiver selecionado, tirar da seleção
    if ( alreadySelected >= 0 ) {
        // tirar a class da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado,
        // adicionar a seleção

        selectedItems.push(itemId)

    }
    // atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}