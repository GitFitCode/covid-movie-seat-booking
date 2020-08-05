const seatsSection = document.getElementById('seats');
const seatsTable = seatsSection.children[0];
const seatsTableBody = seatsTable.children[0];


//for loop section 
console.log('Logging our Loops:')
 for (let i = 0; i < seatsTableBody.children.length; i++) {
   // iterate over our table rows
   console.log('index of Body: ' + i)
   console.log('length var: ' + seatsTableBody.children[i].children.length);
   
   const seatsTableRow = seatsTableBody.children[i];
   const numTableDataLength = seatsTableRow.children.length;

   for (let j = 0; j < numTableDataLength; j++) {
     // iterate over table squares/data
     const seatsTableData = seatsTableRow.children[j];
     //on click add 'x'
     console.log(seatsTableData);
     seatsTableData.addEventListener('click', function(e){
      e.target.innerText = 'X';
     });
   }
 }