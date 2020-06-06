// const button = document.querySelector("form button");

// function validateItems() {
//   const items = document.querySelector("input[name=items]"); 

//   if (items.value == "") {
//     alert("Selecione um ou mais itens de coleta");
//     document.location.href = '/savepoint';
//   }
// }

// button.addEventListener("click", validateItems);


function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;
  if (ufValue == "") {
    citySelect.innerHTML = `<option value="">Selecione o Cidade</option>`;
    citySelect.disabled = true;
    return;
  }

  citySelect.innerHTML = "";

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }

      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

/*
  =======================================
              Ítens de coleta
  =======================================
*/
//Pegar todos os items do campo li
const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");

//Lista de Ítens de coleta
let selectedItems = [];

function handleSelectedItem(event) {
  //Adicionar ou remover uma classe com js
  const itemLi = event.target;
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;
  /*   
  Verificar se existem ITENS selecionados, 
  se sim pegar os ITENS selecionados
 */
  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;
    return itemFound;
  });

  // se já estiver SELECIONADOS, tirar da selação
  if (alreadySelected >= 0) {
    // tirar da seleção
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });

    // console.log(itemIsDifferent);
    selectedItems = filteredItems;
  } else {
    // se não estiver SELECIONADOS, adicionar à seleção
    selectedItems.push(itemId);
  }
  // console.log(selectedItems);

  // atualizar o(s) campo(s) escondido com ITENS selecionados
  collectedItems.value = selectedItems;
}
