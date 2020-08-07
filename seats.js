let stringVariable = 'hello there';
let stringVar2 = 'general kenobi';
let var3 = 'goodbye';

const hello = function(a, b) {
  console.log(a);
  console.log(b);
  console.log(a);
  console.log(b);
  console.log(a);
  console.log(b);
}

hello(stringVariable, var3);



//Movie Objects Section
const movieObjects = [  //movieObjects[1]
  {
    name: 'Wedding Crashers',
    price: 5,
    seatsOccupied: [1, 2, 3]
  },
  {
    name: 'Ratatouille',
    price: 10,
    seatsOccupied: [4, 10, 9]
  },
  { 
    name: 'Pulp Fiction',
    price: 6, 
    seatsOccupied: [2, 4, 12, 14, 15, 16]
  },
  {
    name: 'Lion King',
    price: 7,
    seatsOccupied: [10, 5, 1, 9, 2]
  },
  {
    name: 'Vertigo',
    price: 8,
    seatsOccupied: [2, 5, 8, 9, 6, 11, 14]
  }
];

//Switching Movie Problem - Possible Solns:
// - clone node 
// - remove eventListener (add in a named function)
// - call addEventListener only once 
       // 1. keep count of times we've changed movies
       // 2. if count === 1, set up eventListeners
       // 3. to apply correct movie, change a global variable
/*
let currentMovieSelected; 

{ currentMovieSelected.seatsOccupied.push()}

onMovieClick { currentMovieSelected = movie2}
*/


//Grabbing our Table from Dom
let seatsSection = document.getElementById('seats');
const seatsTable = seatsSection.children[0];
const seatsTableBody = seatsTable.children[0];
let currentMovieSelected;

const moviesSelectValue = document.getElementById('movies');
let movieSelectOnChangeCount = 0;
moviesSelectValue.onchange = function() {
  console.log(movieObjects[this.value]);
  movieSelectOnChangeCount++;
  currentMovieSelected = movieObjects[this.value];
  setUpSeatSection(movieObjects[this.value], movieSelectOnChangeCount);
}


function setUpSeatSection(movie, movieSelectOnChangeCount) {
  console.log('movieSelectOnChangeCount: ' + movieSelectOnChangeCount);
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
      /*
      let selectASeatCounter = 0;
      selectASeatCounter++;
      console.log(selectASeatCounter);*/

      // if first 
      if (movieSelectOnChangeCount === 1) {
        //selectASeat(currentMovieSelected, seatTableData);
        selectASeat(seatTableData);
      }
     }
  }
  console.log('our current movie: ' + currentMovieSelected.name);
}

function selectASeat(seatTableData){  
  // a global variable called currentMovieSelected
  // but we have a parameter also called currentMovieSelcted
  // ^ that will 'override' the global one


  /*add clickListener:
  - check if seat is already occupied (don't add to seatsOccupied)
  - apply selectedSeat class/color`
  - push seat number to seatsOccupied
  */  
  
  seatTableData.addEventListener('click', function(e){

    if(seatTableData.className !== 'occupiedSeat'){
      //check if already clicked
      //if clicked, unclick 
      const seatIDNumber = parseInt(e.target.getAttribute('id'));

      if (e.target.className === '') { 
        e.target.className = 'selectedSeat';
        currentMovieSelected.seatsOccupied.push(seatIDNumber);
      }
      else if (e.target.className === 'selectedSeat'){
        e.target.className = '';
        const index = currentMovieSelected.seatsOccupied.indexOf(seatIDNumber);
        currentMovieSelected.seatsOccupied.splice(index, 1);
      }  
    }
    console.log('LOOK HERE: ' + currentMovieSelected.name);
    console.log(currentMovieSelected.seatsOccupied);
  });

}

/*
function createSeatEventListener(movie, seatTableData) {
  return function() {
    if (seatTableData.className !== 'occupiedSeat'){
      //check if already clicked
      //if clicked, unclick 
      const seatIDNumber = parseInt(seatTableData.getAttribute('id'));

      if (seatTableData.className === '') { 
        console.log(movie);
        seatTableData.className = 'selectedSeat';
        movie.seatsOccupied.push(seatIDNumber);
      }
      else if (seatTableData.className === 'selectedSeat') {
        seatTableData.className = '';
        const index = movie.seatsOccupied.indexOf(seatIDNumber);
        movie.seatsOccupied.splice(index, 1);
     }   
    }
  };
}
*/