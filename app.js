var dronepos = 0;
var commandsActive =0;
var receivedData = "None";

document.addEventListener("keydown", e => {
	e.preventDefault();
	switch(e.keyCode){
		case 37:
			document.getElementById('btnLeft').click();
			break;
		case 38:
			document.getElementById('btnUp').click();
			break;
		case 39:
			document.getElementById('btnRight').click();
			break;
		case 40:
			document.getElementById('btnDown').click();
	}
});

function Drone(control) {
var connection = 
new WebSocket('ws://127.0.0.1:65432');
   connection.onopen = function () {
     connection.send(control); // Send control message to drone
   };

   connection.onmessage = function (evt) {
     console.log('Server: ' + evt.data);
     var receivedData = evt.data;
     document.getElementById("DroneData").innerHTML = receivedData;
     
   };
   
  const speech = new SpeechSynthesisUtterance( "Drone " + control );
  window.speechSynthesis.speak(speech);

}; 

var heightvalue = 0;

function DroneHeight() {
var connection = 
new WebSocket('ws://127.0.0.1:65432');
   connection.onopen = function () {
     connection.send('get tof'); // Send control message to drone
   };

   connection.onmessage = function (evt) {
     console.log('Server: ' + evt.data);
     var receivedData = evt.data;
     
     heightvalue = ( Number(receivedData) - 100 ) / 10;
     document.getElementById("Brightness").innerHTML = heightvalue;
     
   };
   

return heightvalue;  
}; 



var Height = 300; //The height of the graph
var Width = 500; //The width of the graph
var StartingWidth = 100; //The starting point in the x-axis to plot the graph
var widthPerSample = 5; //One sample every 5 width 
var maxWidthSample = Width/widthPerSample; //Max number of samples for the entire width
var i=0; //The initial number to setup the starting number of an array
var Light; //The value of the light sensor
var BrightnessValue = []; //Setting up an array for BrightnessValue to store Light's value

//Used to extract their respective IDs from HTML
var BrightnessElement; 

// Compiling the coordinates
var updatedBrightnessPoints 

//Setting up the coordinates
var BrightnessPoints = []; 

function updatedGraph(){
	//Using an if statement to shift the entire graph to the left when the length of Brightness value > maxWidthSample
	if(BrightnessValue.length > maxWidthSample){
		BrightnessPoints = []; //Setting a new blank array for BrightnessPoints
		BrightnessValue.shift(); //Remove leftmost sample
		var A = 0; //Setting A as 0 for the while loop to update the entire arrays mentioned above
		var B = 100; //B has to have the same value as the StartingWidth, however do not use "StartingWidth" as they are not 100 during this if statement
		while (A < maxWidthSample){ //This condition avoids overflow
		//Redrawing the entire arrays that will be used to display on the graph; shifting the values to the left
		BrightnessPoints[A]=(B+","+(Height-BrightnessValue[A]));
	A++;
			B+=5;
		}
	}else{
		//Setting up the coordinates in the arrays to display them on the graph
		BrightnessPoints[i]=(StartingWidth+","+(Height-BrightnessValue[i]));
		StartingWidth +=5;
		i++;
	}
	
	//Extracting the IDs of the HTML under SVG
	BrightnessElement = document.getElementById('brightnessGraph');
	
	//Compiling the contents of the array into a string that can be used for Polyline
	updatedBrightnessPoints = BrightnessPoints.join(" ");

	//Displaying the graph with the polyline points
	BrightnessElement.setAttribute('points',updatedBrightnessPoints);

}

//Displaying the highest, current, and lowest brightness level of the light sensor to the webpage
//function displayValues(){
//	document.getElementById('Brightness').innerHTML = "Current //Drone Temperature: "+Light+" degC";
//}

var P = 1;