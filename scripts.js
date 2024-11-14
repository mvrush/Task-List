/************* TO DO **************/
// The addItem() function is placing another itemStates array item when it re-adds items after the removeItem() function is pressed.
// So I need to fix something in line 109, or how line 109 is being used to populate the 'itemStates' array.
// For example, if I have 2 items and i delete 1, the itemStates array has one state for the remaining item.
// But when it re-adds that 1 item using the addItem() function, it adds it again into the itemStates array, resulting in 2 states when there's only 1 item, messing everything up.
// I somehow have to tell it, if there is already a state, to not re-add it, but not sure how to do that.

console.log('If you can see this, your script loaded. SHOUT HOORAY!!');
/***** MASTER VARIABLES (use 'const' instead of 'let' for full page scope, it's not necessary, but good practice.) *****/
const items = []; // An empty array that will hold our list items. It can be a 'const' which protects it and still allows you to modify that contents of the array.
const itemStates = []; // Am empty array that will hold our Checkbox states for when an item is deleted and the list is repopulated.

// The following event listeners listen for the Enter key to be pressed while the Input box is in focus. If Enter is pressed, it calls the 'textSubmit()' function below. This allows the user to simply press the enter key instead of pressing the 'Submit' button.

// In the next line, the script waits for the DOM to be fully loaded using 'DOMContentLoaded'.
// The '(event)' parameter is simply a placeholder for the event object that gets passed to the event handler function when the 'DOMContentLoaded' event is fired.
// You can't use ('DomContentLoaded') without a paramenter, therefore ', (event)' is the placeholder.
document.addEventListener('DOMContentLoaded', (event) => { 
    const input = document.getElementById('task'); // 'input' is specified as a constant to hold the input box element.

    // In the next function we have the ('keydown') event followed by the ', function(event)' parameter, in this case 'event' will hold the 'key' or 'keyCode' event below.
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.keyCode === 13) { // This line specifies that the 'event' parameter now holds either 'key' or 'keyCode'. FYU 'keyCode' is deprecated.
            event.preventDefault(); // Prevent the default form submission
            textSubmit(); // Call the 'textSubmit()' function below.
        }
    });
    
});

function textSubmit() {
    console.log('this is the textSubmit function.');
    let newtask = document.getElementById("task").value.trim(); // You need .value to pull the text out of the input box. The trim() function removes white space before and after text.
    console.log("This is the newtask ->", newtask);

    // The 'if' condition just exits the function if the user presses the button with no input in the input box.
    if (newtask === "") {
        alert('Please enter a task item. 😊')
        return;
    }
    else {
        items.push(newtask); // adds each 'newtask' text into the 'items' array.

    }

    addItem(newtask); //calls the 'addItem()' function passing the data held in 'newtask' to that function.
};

// This function adds list items.
function addItem(newtask, isChecked = false) { // Function takes 2 arguments, 'newtask' is the text item received from either 'textSubmit()' or 'loadList()', 'isChecked = false' is the state of the checkbox, default value is false, for unchecked when created, or overridden by values from 'loadList()'.
    //items.push(newtask); // adds each 'newtask' text into the 'items' array. // NOTE: Took this line out here and put it in the 'textSubmit()' function so that the 'removeItem()' function wouldn't add to the existing array.
    console.log("This is the 'items' array", items); // Shows us what's in the 'items' array.
    let listItem = document.createElement("li"); // Create a <li> item

    let span = document.createElement("span"); // create a <span> item
    
    let checkbox = document.createElement("input"); // This creates a <input> tag

    let removeButton = document.createElement("button"); // creates a button
    // The following lines set the attributes for the checkbox <input> tag. i.e. when created, it will look like this: <input type='checkbox' name ='listBox' value='complete' id='listBox'>
    checkbox.type = 'checkbox'; // The type sets it to a checkbox on the HTML page, it could be 'radio' if you'd prefer radio buttons. 'Type' is important!
    checkbox.name = 'listBox'; // 'name' attribute is the 'key' in a 'key/value' pair with the 'value' attribute, when sent with a form when submitted. I'm not using the form method here so it's less important.
    checkbox.value = 'complete'; // 'value' is the value that is submitted when the box is checked and the form submitted. Since I'm not using a form submission, it's not as important. I'm only using JavaScript to detect if it's checked or not.
    checkbox.id = 'listBox'; // 'id' is the unique id value that identifies an HTML element in the document. I can use the id in a JavaScript function to identify the HTML element or I can us it in CSS to apply CSS by the id.
    checkbox.checked = isChecked; // Sets the checkbox's checked status. THIS LINE SUGGESTED BY CHAT GPT

    // The following sets the attibutes for the button. When created it will look and act like this <button class="remove-item" id="removeItem" onclick="textSubmit()">x</button>. NOTE: it won't have 'onclick="textSubmit()" because I used a JavaScript onclick overlay on the button as shown a few lines below.
    removeButton.className = 'remove-item'; // Sets the class value for the button.
    removeButton.id = 'removeItem'; // sets the ID of the button
    removeButton.innerHTML = 'x'; // Sets the text value that is output onto the button.
    // I could write an inline function here to remove the item, but I wanted it to call another function. 
    /*** REPLACE THIS TEST INLINE FUNCTION WITH THE LOOPING ONE TO REMOVE ITEMS 
    removeButton.onclick = function() { 
        alert("Remove Button Clicked!");
    }; 
    ****/
    
    // This is how to call another function using the 'onclick' parameter on the.
   // removeButton.onclick = itemRemove; // This layers the button with an 'onclick' event that will then call the 'textSubmit()' function. Removed and replaced with the next lines.
    removeButton.onclick = function() { // this adds a function to find the index of the current item that the button is associated with. 'onclick' assigns an onclick event to the 'removeButton'. When button is clicked, it runs the function.
        // The next 3 lines isolate the index number of the <li> item that the <button> resides in so I can splice() it out of the array.
        //let item = this.parentNode; // looks at the parentNode of the <button> which is the indexed <li> item and gets it's index number. 'this' specifies to look at 'this button's' parentNode.
        let item = span.textContent; // This looks at the <span> associated with the <li> item and gets the text content using the built-in 'textContent' node and holds it in the 'item' variable.
        console.log("this is the removeButton item ->,", item); // This will console.log the item that was clicked. This lets you know the button is working AND which item the button is associated with.
        /*** NOTE WE NEED TO FIND OUT HOW TO DETERMINE THE INDEX OF THE TEXT ITEM THE removeButton IS ATTACHED TO  ****/
        //let index = items.findIndex(i => i === item); // uses the built-in 'findIndex()' function to find the index of the item that the button resides in. The arrow (=>) function serves as the callback for the 'findIndex()' function. 'i === item' means the value and type of the item should match i. === is 'is equal to'.
        let index = items.indexOf(item); // uses the built-in 'indexOf()' function to find the index of of the textContent held in the 'item' variable of the 'items' array.
        console.log("This is the index of the removeButton item ->", index); // This will show you what index whas found, it it's a -1, something is wrong and the function exits because of the following 'if' statement.
        // This then returns the value of 'index' to the 'itemRemove()' function.
        if (index >= 0) {itemRemove(index) // I wrote this 'if' statement in case of problems with the item not being removed from the screen but removed from the array, which would result in the next button press resulting in array index of -1, which doesn't exist. Or an incorrect index position detected of -1, 
        } else {
            return; // use 'return' to simply exit the function if the 'if' statement is not true.
        }
    };


    let textnode = document.createTextNode(newtask); // Create a text node using the built-in 'createTextNode' function and the text value. (could maybe shorten the code by removing the 'newtask' variable above and having it get the value here from the DOM).
    span.append(textnode); // append the 'textnode' into the <span> tag.
    // listItem.appendChild(checkbox); // add the checkbox to the <li> item
    // listItem.appendChild(span); // add the text value in the <span> to the <li> item
    // listItem.appendChild(removeButton); // add the remove button to the end of the list item.

    listItem.append(checkbox, span, removeButton); // combined three preceding lines into one line using the 'append()' function with the 'checkbox' and 'textnode' values inside.

    
    //document.getElementById("outputList").appendChild(listItem); // append the listItem with the 'checkbox' and 'textnode' value to the HTML document.
    
    document.getElementById("task").value = ""; // this erases whatever input was in the text input box to prepare for new input values.
    
    document.getElementById("outputList").appendChild(listItem); // This line takes the listItem and appends it to the 'outputList' located in the DOM.

    itemStates.push(isChecked); // Add the checkbox state to the 'itemStates' array.
    console.log("This is the 'itemStates' array ->", itemStates);
    /*** THE NEXT LINE CALLED THE OLD addItem() function listed below  ****/
    //addItem(listItem); // Call the 'addItem()' function below, passing the value of 'listItem' to that function.

    /***********The following 2 lines will output one value at a time, but won't append a new value. *****
    listValue = document.getElementById("outputList");

    listValue.innerHTML = `<li>${newtask}</li>`; // use backtick ` instead of quote ' to use the ${variable} to use a Template Literal and interpolate a variable value in a string.
    */
};

/**** THIS WAS MY OLD addItem() FUNCTION  ******
// This function adds list items.
function addItem(listItem) { // receives the 'listItem' value from above.    
    document.getElementById("outputList").appendChild(listItem); // This line takes the listItem and appends it to the 'outputList' located in the DOM.
    // let items = []; // Creates an empty array. Problem with putting this here is that every time through the function, it creates a new array and loses the old one. Put it in master variables at the top of the page.    
    //items.push(listItem); // add the item to the 'items' array. //NOTE: This was pushing the entire node item into an array which wouldn't work using saving to localStorage.
    console.log(items); // console log all the items in the 'items' array.
    
};
**** END OF OLD addItem() FUNCTION *********/


// This function removes list items.
/* What you need to write is 
1. remove the item by array index when the xButton is clicked. Use the 'splice(x, y)' function where x=index of item and y=number of items to remove (may not need the y value).
2. clear the existing list so the next step won't just append items to the existing list. 
3. loop through the array, and for each item, call the 'addItem()' function above to output it to the list.
*/
function itemRemove(index) { // receives the index # from the button press.
    //alert("Remove Button Clicked Ya Dirty Ol' Ho!!!"); // Used this line to test button functionality.
    items.splice(index, 1); // uses the built-in 'splice()' function to remove 1 item at the specified index position.
    console.log(`Item removed at index ${index} from items array ->`, items); // sends a console log of the 'items' array with the item removed. I used backticks (`) to ouput the string of text that includes a template literal ${variable} to show what was held in the variable.
    itemStates.splice(index, 1); // uses the built-in 'splice()' function to remove 1 item at the specified index position from the 'itemStates' array.
    console.log(`item removed at index ${index} from itemStates array ->`, itemStates); // console logs which index was removed from the 'itemStates' array and outputs the new array.
    // code to clear list goes here
    let outputList = document.getElementById("outputList"); // gets the <ul> by 'outputList' id and puts it in a variable called 'outputList'
    while (outputList.firstChild) { // this 'while' function will clear the list before looping through the array and adding to the list.
        outputList.removeChild(outputList.firstChild); // Says that while there is a 'firstChild' in the outputList, remove that child using 'removeChild'.
    }

    
    // The following loops through the 'items' array using the built-in 'forEach()' function and grabs the index 'idx' of each item, then grabs the idx of each 'itemStates' array item and sends them to the 'addItem()' function.
    items.forEach((listItem, idx) => { // says look at the 'items' array and for each 'listItem', send it to the 'addItem()' function along with it's index position, specified by my variable 'idx'.
        let isChecked = itemStates[idx]; // Get the saved checkbox state at the specified index 'idx' position and hold it in the 'isChecked' variable.
        console.log(`Index: ${idx}, Item: ${listItem}, Checked: ${isChecked}`) // Debugging output to make sure everything looks right.
        //document.getElementById("outputList").appendChild(listItem) //NOTE: Used to look at each Node item and append it to the Dom, instead I call the 'addItem()' function on the next line.
        addItem(listItem, isChecked);
    });
};

/**** THE FOLLOWING FUNCTIONS SAVE THE LIST TO LOCAL STORAGE AND LOAD THE LIST ON WINDOW LOAD ****/

function saveList() {
    const savedData = items.map((item, index) => ({ // creates a constant called 'savedData' that holds a map() of the 'items' array that contains the text 'item' and 'index' position
        task: item, // this is the text value of the task and for each item is assigned the JSON key of 'task' and the value is the 'item'
        isChecked: document.querySelectorAll('#outputList input[type="checkbox"]')[index].checked // this jSON key is 'isChecked' and stores whether the checkbox is checked which is obtained by queriyng everything in the 'outputList'.
    }));
    localStorage.setItem('savedList', JSON.stringify(savedData)); // takes the 'savedData' constant which holds the data from our 'items' array and checkbox status's, stringifies it into JSON data, names it 'savedList' for saving into localStorage.
    //alert("List Saved!!!"); // puts up an alert box popup alerting that the list was saved.

};

function loadList() {
    const savedData = JSON.parse(localStorage.getItem('savedList')); // This looks at local storage, uses the 'getItem()' function and loads 'savedList', parses the JSON and stores it in the 'savedData' constant.
    console.log("This is our savedData ->", savedData);
    if (savedData) {
        savedData.forEach(({ task, isChecked })=> {
            items.push(task);
            addItem(task, isChecked); // pass the 'task' and checked stat using 'isChecked' to 'addItem()' function
        });
    }
    
    /***********THE FOLLOWING SECTION WAS MY OLD CODE ATTEMPT TO GET CHECKBOX STATES WORKING  ******************
    // First section loads the check box data, it's working, but there's nothing in the saved checkbox array from the saveList() function.
    let checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')); // Looks at the JSON and gets the 'checkboxStates' item.
    console.log('This is our checkboxStates array on load ->', checkboxStates);
    if (checkboxStates) {
        document.querySelectorAll('.listBox').forEach((checkbox, index) => {
            checkbox.checked = checkboxStates[index] || false;
        })
    }
    let savedList = localStorage.getItem('savedList'); // goes to localStorage and gets the items saved as 'savedList' and puts in in the 'savedList' variable.
    if (savedList) { // says, if the 'savedList' variable holds something (is truthy) then run the next line.
        savedList = JSON.parse(savedList); // Parse the JSON back into an array
        console.log("This is the savedList array ->", savedList); // console.log's the content of the new 'savedList' array. It holds objects, not HTML.
    
    savedList.forEach(listItem => {// says look at the 'savedList' variable and for each item ('listItem') append it to the DOM element 'outputList'.
        console.log("This is an individual listItem", listItem); // will console log each listItem in the savedList array.
        //document.getElementById("outputList").appendChild(item) //this method didn't work. I NEED TO ADD EACH ITEM IN THE 'savedList' BACK TO THE 'items' ARRAY! (next line fixed it).
        items.push(listItem); // this pushes each 'listItem' into the 'items' array which is emptied each time the window is closed or refreshed.
        addItem(listItem); // Call the 'addItem()' function with each 'listItem' from 'savedList'.
    });
}
********************* END OF OLD CODE ATTEMPT TO GET CHECKBOX STATES WORKING **********************************/
};


// Load the list when the page is opened
window.onload = loadList; // when the window is opened, run the 'loadList()' function.

// Automatically save list when the window is about to be closed.
window.onbeforeunload = saveList; // when the window is about to be closed, run the 'saveList()' function.

