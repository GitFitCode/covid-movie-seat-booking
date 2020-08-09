## TODO List:

* DONE EventHandlers - update to update movie object seatsOccupied
  * (consider querySelector at this point)

* DONE Load Movie into our visual display. Change class to match seat status
  * Store dummy objects in localStorage so we can refresh the page w/o losing data

* DONE B4 changing movies, confirm w/ user to purchase 
  * change selected seats back to unoccupied if no purchase made
  * allow user to clear occupied seats ... back to default 
  * localStorage management 
  * Save seats, movie and price to local storage so that UI is still populated on refresh
  * Use JSON.stringify() to parse data from local storage

* DONE Movie Select Section - Display list of movies to choose from

* DONE Update CSS visuals
* DONE Update Readme together

# Description of Setup & User Loop #

The user selects a movie that they would like to watch. Then select the seats they would like to sit in. They are allowed to deselect seats if they change their mind and also be able to see the price and what their total is based on how many seats they have chosen.  Then there is 2 options to purchase tickets.  If they select the 'Purchase Tickets' button they are alerted with a "Thank You" message, the other option would be to try and switch to another movie while they have seats selected, they get an alert asking if they would like to buy the seats or cancel the order.  



# Description of Logic #

1. We start with an object array of all the movies offered in the theater.
2. Since our movie selector starts out in a disabled selection we use onChange to start our functionality.
3. On first onChange , we call swapMovies that both resets our labels to a beginning state and calls our very important setUpSeatSection.
4. setUpSeatSection takes our selected movie and changes our display to include all the occupied seats in our movie object and then calls selectASeat for each seat.
5. selectASeat then adds an event listener to the seat and pushes the selected seat to an array and toggles the visibility of the seat.
6. We then have a purchase button that lets you purchase tickets and stay on the current display to continue purchasing more tickets or you can change to another movie and get alerted to either purchase movies or stay in the current movie if canceled.
