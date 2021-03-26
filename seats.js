//Movie Objects Section
let movieObjects;
if (localStorage.getItem('movies')) {
  movieObjects = JSON.parse(localStorage.getItem('movies'));
}
else {
  movieObjects = [
    {
      name: 'Wedding Crashers',
      price: '5.50',
      seatsOccupied: []
    },
    {
      name: 'Ratatouille',
      price: '10.00',
      seatsOccupied: []
    },
    { 
      name: 'Pulp Fiction',
      price: '6.25', 
      seatsOccupied: []
    },
    {
      name: 'Lion King',
      price: '7.33',
      seatsOccupied: []
    },
    {
      name: 'Vertigo',
      price: '8.00',
      seatsOccupied: []
    }
  ];
}

//Global Variables:
//Grabbing our Table from Dom
let seatsSection = document.getElementById('seats');
const seatsTable = seatsSection.children[0];
const seatsTableBody = seatsTable.children[0];
//Grabbing our ticket cost labels 
const ticketQuantityLabel = document.getElementById('quantity');
const ticketPriceLabel = document.getElementById('pricePerTicket');
const totalPriceLabel = document.getElementById('totalPrice');
const moviesSelectValue = document.getElementById('movies');
const purchaseButton = document.getElementById('purchase');
const clearLocalStorage = document.getElementById('clearLocalStorage');

//Non-HTML Global Variables
//selected seats not purchased (to be pushed into seatsOccupied)
let userSelectedSeats = []; 
let currentMovieSelected;
let ticketCounter = 0;
//counts how many time the user has switched movies 
//(ie set up clickListeners only on first)
let movieSelectOnChangeCount = 0;
let movieSelected;
//true default (when no seats selected) so no alerts given
let ticketsPurchased = true;


//Major Functions:
//Select which movie
moviesSelectValue.onchange = function() {
  const movieSelected = moviesSelectValue.value;

  //tickets not yet purchased
  if (!ticketsPurchased) {
    onMovieChangeAndTicketsSelected(movieSelected);
    disablePurchaseButton();
  }
  swapMovies(movieSelected);
  updateMovieValues(movieSelected);
  updateTicketPrices(null);
}

function updateMovieValues(movieSelected) {
  currentMovieSelected.seatsOccupied = currentMovieSelected.seatsOccupied.concat(userSelectedSeats);
  userSelectedSeats = [];
}

function onMovieChangeAndTicketsSelected(movieSelected) {
  const confirmStatus = confirm(`Do you want to buy these tickets for $${(parseFloat(currentMovieSelected.price) * ticketCounter).toFixed(2)}?`);
  if (confirmStatus){
    currentMovieSelected.seatsOccupied = currentMovieSelected.seatsOccupied.concat(userSelectedSeats);
    userSelectedSeats = [];
  
    alert(`Total was $${(parseFloat(currentMovieSelected.price) * ticketCounter).toFixed(2)}. Thank you for your purchase!`);
    updateLocalStorage();
    disablePurchaseButton();
  } 
  else {
    moviesSelectValue.value = movieSelected;
    userSelectedSeats = [];
  }
}

//setting up our tickets, prices, and totals
function swapMovies(movieSelected) {
  movieSelectOnChangeCount++;
  currentMovieSelected = movieObjects[movieSelected];

  //pass in selected movie object and change count
  setUpSeatSection(movieObjects[movieSelected], movieSelectOnChangeCount);
}

//iterate over each seat & apply classes
function setUpSeatSection(movie, movieSelectOnChangeCount) {
  let tableDataCounter = 0;
  for (let i = 0; i < seatsTableBody.children.length; i++) {
    // iterate over our table rows
    const seatsTableRow = seatsTableBody.children[i];
    const numTableDataLength = seatsTableRow.children.length;

    for (let j = 0; j < numTableDataLength; j++) {
      // iterate over table squares/data
      tableDataCounter++;
      const seatTableData = seatsTableRow.children[j];
      seatTableData.className = '';
      //Add ID to element based on tableDataCounter
      seatTableData.setAttribute('id', tableDataCounter);

      //checks for occupied seats in movie object array and sets their class name 
      if (movie.seatsOccupied.includes(tableDataCounter)){
        seatTableData.className = 'occupiedSeat';
      }
      // if first movie clicked
      if (movieSelectOnChangeCount === 1) {
        selectASeat(seatTableData);
      }
    }
  }
}

function selectASeat(seatTableData) {  
  /*add clickListener:
  - check if seat is already occupied (don't add to seatsOccupied)
  - apply selectedSeat class/color
  - push seat number to seatsOccupied
  */  
  seatTableData.addEventListener('click', function(e){
    //check if already clicked
    const seatIDNumber = parseInt(e.target.getAttribute('id'));

    //only allow clicking if unoccupied and not already in seatsOccupied (already purchased case)
    if(seatTableData.className !== 'occupiedSeat' && currentMovieSelected.seatsOccupied.indexOf(seatIDNumber) === -1) {
      
      if (e.target.className === '') { 
        e.target.className = 'selectedSeat';
        userSelectedSeats.push(seatIDNumber);
        //update ticket price labels
        updateTicketPrices(true);
        enablePurchaseButton();
      }
      // seat already selected by current user ... unclick
      else {
        e.target.className = '';
        const index = userSelectedSeats.indexOf(seatIDNumber);
        userSelectedSeats.splice(index, 1);
        if (ticketCounter > 0) {
          updateTicketPrices(false);
        }
        if (userSelectedSeats.length === 0) {
          disablePurchaseButton();
        }
      }  
    }
  });
}


//Other Buttons & Minor Functions:
//updates ticket cost labels
function updateTicketPrices(incremental){
  //null value corresponds to onMovieSwitch
  if (incremental === null) {
    ticketCounter = 0;
  }
  //corresponds to seat being clicked
  else {
    incremental ? ticketCounter++ : ticketCounter--;
  }

  let ticketString;
  if (ticketCounter === 1) {
    ticketString = ' ticket @';
  }
  else {
    ticketString = ' tickets @';
  }

  ticketQuantityLabel.innerText = ticketCounter + ticketString;
  ticketPriceLabel.innerText = `$${currentMovieSelected.price}`;
  totalPriceLabel.innerText = `$${(parseFloat(currentMovieSelected.price) * ticketCounter).toFixed(2)}`;
}

//Enable button only after first movie clicked
disablePurchaseButton();

purchaseButton.addEventListener('click', () => {
  //enablePurchaseButton();
  if (userSelectedSeats.length !== 0){
    alert(`Total was $${(parseFloat(currentMovieSelected.price) * ticketCounter).toFixed(2)}. Thank you for your purchase!`);
    disablePurchaseButton();
  }
  //push selected seats to seatsOccupied
  currentMovieSelected.seatsOccupied = currentMovieSelected.seatsOccupied.concat(userSelectedSeats);
  userSelectedSeats = [];
  updateLocalStorage();

  //set ticket counter and HTML values back to 0 for already purchased case
  updateTicketPrices(null);
});

//resets localStorage & reloads page (to clear current movie seats)
clearLocalStorage.addEventListener('click', () => {
  localStorage.clear();
  movieObjects.forEach(movieObject => {
    movieObject.seatsOccupied = [];
  });
  location.reload();
});

//replaces localStorage object w/ updated version
function updateLocalStorage() {
  const movieObjectsJSON = JSON.stringify(movieObjects);
  localStorage.setItem('movies', movieObjectsJSON);
}

function disablePurchaseButton() {
  purchaseButton.disabled = true;
  purchaseButton.classList.remove("purchase-enabled");
  ticketsPurchased = true;
}

function enablePurchaseButton() {
  purchaseButton.disabled = false;
  purchaseButton.classList.add('purchase-enabled');
  ticketsPurchased = false;
}

//let's use an IIFE
(function randomlyPopulateOccupiedSeats() {
  const numberOfMovies = movieObjects.length;
  
  //1-indexed between 1 and 38. 
  //total table-datas (seats) could be calculated programatically
  let randomSeatNumber;
  
  for (let i = 0; i < numberOfMovies; i++) {
    //could do w/o the 0s, but clarity helps:
    const randomSeatCount = Math.floor(Math.random() * (15 - 0) + 0);

    for (let j = 0; j < randomSeatCount; j++) {
      randomSeatNumber = Math.floor(Math.random() * (38 - 1) + 1);
      movieObjects[i].seatsOccupied.push(randomSeatNumber);
    }
  }
}())
