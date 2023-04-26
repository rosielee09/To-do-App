'use strict';

const lists = document.querySelector('.lists');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__btn');
const form = document.querySelector('.new-form');




// get today's date
function todaysDate(){
  let date = new Date();
  let options = { weekday: 'short', month: 'short', day: 'numeric', 
                   day: '2-digit', year: 'numeric' };
  let formattedDate = date.toLocaleDateString(undefined, options);
  const header = document.querySelector('.header__date');
  header.innerHTML = ` ${formattedDate}
  
  `;
  return header;
}
todaysDate();


// store list to localStorage
let myList = []; 
const listKey = 'myList'; 

// to save the myList array to LocalStorage
function saveList() {
  localStorage.setItem(listKey, JSON.stringify(myList));
}


// load the list items from Local Storage
function loadList() {
  const listData = localStorage.getItem(listKey);
  if(listData) {
    myList = JSON.parse(listData);     

    // Set the checked state of the items
    myList.forEach(item => {
      const list = createList(item.text, item.id);
      if (item.checked) {
        list.classList.add('checked');
        list.querySelector('.fa-circle-check').classList.add('clicked');
      }
    });

    renderList();

    // Scroll to the last added list item after rendering the list
    const listItems = document.querySelectorAll('.list__row');
    listItems[listItems.length - 1].scrollIntoView({ block: 'center' });
  }
}

// to render the list items on screen 
function renderList() {
  lists.innerHTML = '';
  myList.forEach(item => {
    const list = createList(item.text, item.id);
    if (item.checked) {
      list.classList.add('checked');
      list.querySelector('.fa-circle-check').classList.add('clicked');
    }
    lists.appendChild(list);
  });
}

loadList(); // load saved list from local storage

// submit the form(input text click or enter)
form.addEventListener('submit', onAdd);

// createList
function createList(text, id){
  const listRow = document.createElement('li');
  listRow.setAttribute('class', 'list__row');
  listRow.setAttribute('data-id', id || Date.now());
  listRow.innerHTML = `
         <div class="list" >
            <button class="list__done" >
              <i class="fa-sharp fa-regular fa-circle-check"></i>
            </button>
            <span class="list__name">${text}</span>
            <button class="list__delete" >
              <i class="fa-solid fa-trash-can" data-id=${id || Date.now()}></i>
            </button>
        </div> 
      `;
  
  return listRow;
}

// add Today's task by getting input text
function onAdd(event){  
  event.preventDefault();

  const text = input.value;
  if(text === ''){
    input.focus();
    return;
  }
  
  const list = {text: text, id: Date.now()};
  myList.push(list);
  saveList();

  const listRow = createList(text, list.id);  
  lists.appendChild(listRow);
  listRow.scrollIntoView({block: 'center'});
  input.value = '';
  input.focus();
}




lists.addEventListener('click', event => {
  const clickedElement = event.target;
  const listItem = clickedElement.closest('.list__row');
  if (!listItem) return;

  const id = parseInt(listItem.dataset.id);

   if (listItem){    
    
    //  if trash icon clicked, delete the list
    if (clickedElement.classList.contains('fa-trash-can')) {
      myList = myList.filter(item => item.id !== id);
      saveList();
      listItem.remove();
      }
    }
    
    //  if check-icon clicked, line-through the list
    if (clickedElement.classList.contains('fa-circle-check')) {
      listItem.classList.toggle('checked');
      clickedElement.classList.toggle('clicked');
      const item = myList.find(item => item.id === id);
      item.checked = !item.checked;
      saveList();
    }
  });


