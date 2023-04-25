'use strict';

const lists = document.querySelector('.lists');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__btn');
const form = document.querySelector('.new-form');

form.addEventListener('submit', event => {
  event.preventDefault();
  onAdd();
})


// get inputText, and add on to list when clicked
function onAdd(){  
  const text = input.value;
  if(text === ''){
    input.focus();
    return;
  }
  
  const list = createList(text);  
  lists.appendChild(list);
  list.scrollIntoView({block: 'center'});
  input.value = '';
  input.focus();
}

// createList
let id = 0; // UUID or object hashcode. 
function createList(text){
  const listRow = document.createElement('li');
  listRow.setAttribute('class', 'list__row');
  listRow.setAttribute('data-id', id);
  listRow.innerHTML = `
         <div class="list" >
            <button class="list__done" >
              <i class="fa-sharp fa-regular fa-circle-check"></i>
            </button>
            <span class="list__name">${text}</span>
            <button class="list__delete" >
              <i class="fa-solid fa-trash-can" data-id=${id}></i>
            </button>
        </div> 
      `;
  id++;
  return listRow;

}


lists.addEventListener('click', event => {
  const clickedElement = event.target;
  
   if (clickedElement.closest('.list__row')) {
    
    const listItem = clickedElement.closest('.list__row');
   
    //  if  clicked trash ico, delete the list
    if (clickedElement.classList.contains('fa-trash-can')) {
      const id = clickedElement.dataset.id;
      const toBeDeleted = document.querySelector(`.list__row[data-id="${id}"]`);
      toBeDeleted.remove();
    }
    
    //  if  clicked check icon, line-through the list
    if (clickedElement.classList.contains('fa-circle-check')) {
      listItem.classList.toggle('checked');
      clickedElement.classList.toggle('clicked');
    }
  }
});