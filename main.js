var currentTicketCount=1;
var ticketGenerateButtonIncrement=1;
var ticketSolveButtonIncrement=1;
var currentCashCount=1;
var cashRate=0;
var ticketRate=0;
var l1=0;
var l1Rate=1;
var l1Cost;
var l2=0;
var l2Rate=10;
var l2Cost;
var l3=0;
var l3Rate=50;
var l3Cost;
var supervisor=0;
var supervisorRate=1;
var supervisorCost;
var engineer=0;
var engineerRate=10;
var engineerCost;
var productiveEngineer=0;
var productiveEngineerRate=50;
var productiveEngineerCost;
var newGamePlusPoints=1;
var totalPointsPlus=0;
var totalCashEarned=0;

//sets correct values in the html fields
adjRates();

//Loop that sends the command to generate the tickets and cash every second
window.setInterval(function(){
	secondCycle();
}, 1000);

//Handles the clicking of the tweak code button to increase tickets
function generateClickHandler(){
    currentTicketCount=currentTicketCount+1*ticketGenerateButtonIncrement;
    document.querySelector('#currentTickets').innerHTML = currentTicketCount;
    adjRates();
}

//Handles the clicking of the solve tickets button to decrease tickets and increase cash
function solveClickHandler(){
    if (currentTicketCount>=1*ticketSolveButtonIncrement){
        currentTicketCount=currentTicketCount-1*ticketSolveButtonIncrement;
        currentCashCount=currentCashCount+1*ticketSolveButtonIncrement;
        totalCashEarned = totalCashEarned + 1*ticketSolveButtonIncrement;
    }
    adjRates();
}

//produces money and tickets
function secondCycle(){
    currentTicketCount = currentTicketCount + ticketRate;
   
    if (currentTicketCount>=cashRate){
        currentCashCount = currentCashCount + cashRate;
        currentTicketCount = currentTicketCount-cashRate;
        totalCashEarned = totalCashEarned + cashRate;
    } else {
        currentCashCount = currentCashCount+currentTicketCount;
        totalCashEarned = totalCashEarned + currentTicketCount;
        currentTicketCount = 0;
    }
    
    //Updates the html fields
    adjRates();
}

//Adjusts rates costs and html elements
function adjRates(){
    cashRate = (l1*(l1Rate+supervisor)+l2*l2Rate+l3*l3Rate)*newGamePlusPoints;
    ticketRate = (supervisor*supervisorRate+engineer*engineerRate+productiveEngineer*productiveEngineerRate)*newGamePlusPoints; 
    l1Cost=10+l1*11;
    l2Cost=50+l2*51;
    l3Cost=200+l3*201;
    supervisorCost=10+supervisor*11;
    engineerCost=50+engineer*51;
    productiveEngineerCost=200+productiveEngineer*201;
    
    //Updates the html elements
    document.querySelector('#currentTickets').innerHTML = currentTicketCount.toFixed(0);
    document.querySelector('#currentCash').innerHTML = currentCashCount.toFixed(0);
    document.querySelector('#currentL1s').innerHTML = l1;
    document.querySelector('#currentL2s').innerHTML = l2;
    document.querySelector('#currentL3s').innerHTML = l3;
    document.querySelector('#currentSupervisors').innerHTML = supervisor;
    document.querySelector('#currentEngineers').innerHTML = engineer;
    document.querySelector('#currentProductiveEngineers').innerHTML = productiveEngineer;
    document.querySelector('#l1Cost').innerHTML = l1Cost;
    document.querySelector('#l2Cost').innerHTML = l2Cost;
    document.querySelector('#l3Cost').innerHTML = l3Cost;
    document.querySelector('#supervisorCost').innerHTML = supervisorCost;
    document.querySelector('#engineerCost').innerHTML = engineerCost;
    document.querySelector('#productiveEngineerCost').innerHTML = productiveEngineerCost;
    document.querySelector('#newGameMaybe').innerHTML = (totalCashEarned/(5000000*Math.sqrt(newGamePlusPoints))).toFixed(4);
    document.querySelector('#newGamePlusPoints').innerHTML = newGamePlusPoints.toFixed(0)-1;
    
    //These disable the button if the purchase conditions haven't been met
    if (currentCashCount >=l1Cost & 25+supervisor*25>l1) {
    document.getElementById("l1Button").disabled = false;
    } else {document.getElementById("l1Button").disabled = true;}
    
    if (currentCashCount >=l2Cost & l1>0 & l2<l1/5) {
    document.getElementById("l2Button").disabled = false;
    } else {document.getElementById("l2Button").disabled = true;}
    
    if (currentCashCount >=l3Cost & l2>0 & l3<l2/5) {
    document.getElementById("l3Button").disabled = false;
    } else {document.getElementById("l3Button").disabled = true;}
    
    if (currentCashCount >=supervisorCost & l2>0 & supervisor<l1/5) {
    document.getElementById("supervisorButton").disabled = false;
    } else {document.getElementById("supervisorButton").disabled = true;}
    
    if (currentCashCount >=engineerCost) {
    document.getElementById("engineerButton").disabled = false;
    } else {document.getElementById("engineerButton").disabled = true;}
    
    if (currentCashCount >=productiveEngineerCost & engineer>0 & productiveEngineer<engineer/5) {
    document.getElementById("productiveEngineerButton").disabled = false;
    } else {document.getElementById("productiveEngineerButton").disabled = true;}
    
    if (totalCashEarned/(5000000*Math.sqrt(newGamePlusPoints))>1) {
    document.getElementById("newGamePlusButton").disabled = false;
    } else {document.getElementById("newGamePlusButton").disabled = true;}
}


//Handles the hire an l1 button click
function l1ClickHandler(){
    if (currentCashCount >=l1Cost & 25+supervisor*25>l1){
        l1 = l1+1;
        currentCashCount = currentCashCount-l1Cost;
    }
    adjRates();
}

//Handles the l2 button click
function l2ClickHandler(){
    if (currentCashCount >=l2Cost & l1>0 & l2<l1/5){
        l2 = l2+1;
        currentCashCount = currentCashCount-l2Cost;
        l1 = l1-1;
    }
    adjRates();
}

//handles the l3 button click
function l3ClickHandler(){
    if (currentCashCount >=l3Cost & l2>0 & l3<l2/5){
        l3 = l3+1;
        currentCashCount = currentCashCount-l3Cost;
        l2 = l2-1;
    }
    adjRates();
}

//handles the supervisor button click
function supervisorClickHandler(){
    if (currentCashCount >=supervisorCost & l2>0 & supervisor<l1/5){
        supervisor = supervisor+1;
        currentCashCount = currentCashCount-supervisorCost;
        l2 = l2-1;
    }
    adjRates();
}

//handles the engineer button click
function engineerClickHandler(){
    if (currentCashCount >=engineerCost){
        engineer = engineer+1;
        currentCashCount = currentCashCount-engineerCost;
    }
    adjRates();
}

//handles the productive engineer button click
function productiveEngineerClickHandler(){
    if (currentCashCount >=productiveEngineerCost & engineer>0 & productiveEngineer<engineer/5){
        productiveEngineer = productiveEngineer+1;
        currentCashCount = currentCashCount-productiveEngineerCost;
        engineer = engineer-1;
    }
    adjRates();
}

//Handles the click to resets the game with higher gains
function newGamePlusClickHandler(){
    l1=0;
    l2=0;
    l3=0;
    supervisor=0;
    engineer=0;
    productiveEngineer=0;
    currentTicketCount=1;
    currentCashCount=1;
    newGamePlusPoints=newGamePlusPoints+totalCashEarned/(5000000*Math.sqrt(newGamePlusPoints));
    totalCashEarned=0;
    adjRates();
}

//Click listeners
document.getElementById("generateButton").addEventListener("click", generateClickHandler);
document.getElementById("solveButton").addEventListener("click", solveClickHandler);
document.getElementById("l1Button").addEventListener("click", l1ClickHandler);
document.getElementById("l2Button").addEventListener("click", l2ClickHandler);
document.getElementById("l3Button").addEventListener("click", l3ClickHandler);
document.getElementById("supervisorButton").addEventListener("click", supervisorClickHandler);
document.getElementById("engineerButton").addEventListener("click", engineerClickHandler);
document.getElementById("productiveEngineerButton").addEventListener("click", productiveEngineerClickHandler);
document.getElementById("newGamePlusButton").addEventListener("click", newGamePlusClickHandler);
