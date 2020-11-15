# Description of Setup & User Loop #

The user selects a movie that they would like to watch. Then they select the seats they would like to purchase. They are allowed to deselect seats if they change their mind and also are able to see the price and what their total is based on how many seats they have chosen.  Then there are 2 options to purchase tickets. If they select the 'Purchase Tickets' button they are alerted with a "Thank You" message; the other option would be to try and switch to another movie while they have seats selected, in which case, they get an alert asking if they would like to buy the seats or cancel the order.  


# Description of Logic #

1. We start with an object array of all the movies offered in the theater.
2. Since our movie selector starts out in a disabled selection we use onChange to start our functionality.
3. On first onChange, we call swapMovies that both resets our labels to a beginning state and calls our very important setUpSeatSection.
4. setUpSeatSection takes our selected movie and changes our display to include all the occupied seats in our movie object and then calls selectASeat for each seat.
5. selectASeat then adds an event listener to the seat (is clickable only if not occupied or already purchased) and pushes the selected seat to an array and toggles the visibility of the seat.
6. We then have a purchase button that lets you purchase tickets and stay on the current display to continue purchasing more tickets or you can change to another movie and get alerted to either purchase movies or stay in the current movie if cancelled.


# Quirks / Problems #

* Purchase Button
  * Allows the user to 'purchase' seats w/o leaving the selected movie, as opposed to our pop-up confirmations when switching movies.
  * (11/20202) This has been partially resolved: after purchasing seats the user stays on the same page. The purchased seats are still colored selected, but cannot be clicked anymore. But the user can add new seats and purchase those. 

* Dynamic Code
  * The code is not fully dynamic with regards to the HTML table, rows, and data setup, but could easily be made so. Currently the movie options and number of seats are hard-coded in, but that could be updated given adequate reason to do so.