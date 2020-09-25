TODO - should add more appealing visuals
# Description of Setup & User Loop #

The user selects a movie that they would like to watch. Then select the seats they would like to sit in. They are allowed to deselect seats if they change their mind and also be able to see the price and what their total is based on how many seats they have chosen.  Then there is 2 options to purchase tickets.  If they select the 'Purchase Tickets' button they are alerted with a "Thank You" message, the other option would be to try and switch to another movie while they have seats selected, they get an alert asking if they would like to buy the seats or cancel the order.  


# Description of Logic #

1. We start with an object array of all the movies offered in the theater.
2. Since our movie selector starts out in a disabled selection we use onChange to start our functionality.
3. On first onChange , we call swapMovies that both resets our labels to a beginning state and calls our very important setUpSeatSection.
4. setUpSeatSection takes our selected movie and changes our display to include all the occupied seats in our movie object and then calls selectASeat for each seat.
5. selectASeat then adds an event listener to the seat and pushes the selected seat to an array and toggles the visibility of the seat.
6. We then have a purchase button that lets you purchase tickets and stay on the current display to continue purchasing more tickets or you can change to another movie and get alerted to either purchase movies or stay in the current movie if canceled.


# Quirks / Problems #

* Purchase Button
  * Allows the user to 'purchase' seats w/o leaving the selected movie, as opposed to our pop-up confirmations when switching movies.
  * It also allows the user to continue making purchases of seats (it will update the cost too), **BUT** it will not protect the user from selecting/purchasing already purchased seats (shame).
  * This behavior has been deemed acceptable for two reasons: 
    1. In a real-world app the purchasing process would be greatly elongated and would eliminate the need for this scrutiny. 
    2. It increases profits. 

* Code Repetition
  * While there is no egregious repetition of code, there are some lines of code repeated repeated in multiple places. All of these that could be easily grouped into small functions have been. To eliminate the other repetitions, we would have to rearrange how we structure much of our code in the first half of __seats.js__(which would increase future workability), but due to current deadlines that was unfeasible. 

* Dynamic Code
  * The code is not fully dynamic, but could easily be made so. Currently the movie options and number of seats are hard-coded in, but that could be updated given adequate reason to do so.