 const bupd = document.querySelector("button[name=upd]");
 const bdel = document.querySelector("button[name=del]");

function frmUpd() {
  const frm = document.querySelector("form[name=frm]"); 
  frm.setAttribute('action', "/updpoint")
}

function frmDel() {
  const frm = document.querySelector("form[name=frm]"); 
  frm.setAttribute('action', "/delpoint")
}


bupd.addEventListener("click", frmUpd);
bdel.addEventListener("click", frmDel);

function getItems () {
  const itemsGrid = document.querySelector("[name=itemsList]");
  const itemsList = document.querySelector("input[name=items]");

  const url = `/itemsCollect`;
  let selectedItems = itemsList.value;


  let grid = "";
  fetch(url)
    .then((res) => res.json())
    .then((items) => {
      for (const item of items) {
        const itemFound = selectedItems.includes(item.id);

      // se já estiver SELECIONADOS, tirar da selação
        if (itemFound) {
          grid += `<li data-id="${item.id}" class="selected">`;
        } else {
          grid += `<li data-id="${item.id}">`;
        }
        grid += `  <img src="${item.image}" alt="${item.description}">`;
        grid += `  <span>${item.description}</span>`;
        grid += `</li>`;
        itemsGrid.innerHTML = grid;
        itemsGrid.addEventListener("click", handleSelectedItem);

      }

    })
    .catch((error) => {
      console.error('Error: ', error);
    });

    
  
}
getItems ();

function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  const stateSelect = document.querySelector("input[name=uf1]");
  const stateid = document.querySelector("input[name=ufid]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        if (state.nome == stateSelect.value) {
          ufSelect.innerHTML += `<option value="${state.id}" selected>${state.nome}</option>`;
          stateid.value = state.id
          getCities1();
        } else {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
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


function getCities1() {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=uf]");

  const city1Select = document.querySelector("[name=city1]");
  const state1Input = document.querySelector("[name=uf1]");
  const stateid = document.querySelector("input[name=ufid]");

  const ufValue = stateid.value;

  if (stateid.value != "") {
    citySelect.innerHTML = "";

    stateInput.value = state1Input;
  
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`;
  
    fetch(url)
      .then((res) => res.json())
      .then((cities) => {
        for (const city of cities) {
          if (city.nome == city1Select.value) {
            citySelect.innerHTML += `<option value="${city.nome}" selected>${city.nome}</option>`;
          } else {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
          }
        }
  
        citySelect.disabled = false;
      });
    stateid.value = ""
  
  }
   
}

document.querySelector("select[name=uf]").addEventListener ("change", getCities);

/*
  =======================================
              Ítens de coleta
  =======================================
*/
const collectedItems = document.querySelector("[name=items]");

//Lista de Ítens de coleta
let selectedItems = []
selectedItems.push(collectedItems.value)

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
