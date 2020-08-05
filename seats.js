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



const moviesSelectValue = document.getElementById('movies');
moviesSelectValue.onchange = function() {
  console.log(movieObjects[this.value]);
  setUpSeatSection(movieObjects[this.value]);
}

//Grabbing our Table from Dom
const seatsSection = document.getElementById('seats');
const seatsTable = seatsSection.children[0];
const seatsTableBody = seatsTable.children[0];

function setUpSeatSection(movie) {
  
  let tableDataCounter = 0;

  for (let i = 0; i < seatsTableBody.children.length; i++) {
    // iterate over our table rows
    
    const seatsTableRow = seatsTableBody.children[i];
    const numTableDataLength = seatsTableRow.children.length;

    for (let j = 0; j < numTableDataLength; j++) {
      // iterate over table squares/data
      tableDataCounter++;
      
      const seatsTableData = seatsTableRow.children[j];
      seatsTableData.className = '';
      //Add ID to element based on tableDataCounter
      seatsTableData.setAttribute('id', tableDataCounter);

      //checks for occupied seats in movie object array and sets their class name 
      if (movie.seatsOccupied.includes(tableDataCounter)){
        seatsTableData.className = 'occupiedSeat';
      }
      
      selectASeat(movie, seatsTableData);
     }
  }
}

function selectASeat(movie, seatsTableData){  
  /*add clickListener:
  - check if seat is already occupied (don't add to seatsOccupied)
  - apply selectedSeat class/color
  - push seat number to seatsOccupied
  */       
  seatsTableData.addEventListener('click', function(e){
    if(seatsTableData.className !== 'occupiedSeat'){
      //check if already clicked
      //if clicked, unclick 
      const seatIDNumber = parseInt(e.target.getAttribute('id'));

      if (e.target.className === '') { 
        e.target.className = 'selectedSeat';
        movie.seatsOccupied.push(seatIDNumber);
      }
      else if (e.target.className === 'selectedSeat'){
        e.target.className = '';
        const index = movie.seatsOccupied.indexOf(seatIDNumber);
        movie.seatsOccupied.splice(index, 1);
      }  
    }
    console.log(movie.name);
    console.log(movie.seatsOccupied);
  });
}


