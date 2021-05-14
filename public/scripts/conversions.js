// Author: Zachary Dulac <zdulac@fordham.edu>
// Internet and Web Programming Final Project

// Obtain DOM elements
const root = document.querySelector(':root');
const distinput = document.getElementById('distinput');
const distselect1 = document.getElementById('distselect1');
const distselect2 = document.getElementById('distselect2');
const distoutput = document.getElementById('distoutput');
const distsubmit = document.getElementById('distsubmit');
const volinput = document.getElementById('volinput');
const volselect1 = document.getElementById('volselect1');
const volselect2 = document.getElementById('volselect2');
const voloutput = document.getElementById('voloutput');
const volsubmit = document.getElementById('volsubmit');
const massinput = document.getElementById('massinput');
const massselect1 = document.getElementById('massselect1');
const massselect2 = document.getElementById('massselect2');
const massoutput = document.getElementById('massoutput');
const masssubmit = document.getElementById('masssubmit');
const timeinput = document.getElementById('timeinput');
const timeselect1 = document.getElementById('timeselect1');
const timeselect2 = document.getElementById('timeselect2');
const timeoutput = document.getElementById('timeoutput');
const timesubmit = document.getElementById('timesubmit');
const tempinput = document.getElementById('tempinput');
const tempselect1 = document.getElementById('tempselect1');
const tempselect2 = document.getElementById('tempselect2');
const tempoutput = document.getElementById('tempoutput');
const tempsubmit = document.getElementById('tempsubmit');
const currinput = document.getElementById('currinput');
const currselect1 = document.getElementById('currselect1');
const currselect2 = document.getElementById('currselect2');
const curroutput = document.getElementById('curroutput');
const currsubmit = document.getElementById('currsubmit');
const history = document.getElementById('hist');
const clear = document.getElementById('clear');
const mode = document.getElementById('mode');
const parent = document.getElementById('parent');

// Conversion functions for the appropriate tools.
async function convertDistance(){
    let dist = distinput.value;
    if(dist == ""){
        dist = 0;
    }
    let distIn = dist;
    let fromUnit = distselect1.value;
    let toUnit = distselect2.value;

    // Fetch the conversion factor from the database
    data = {_id:fromUnit};
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options)
    const json = await response.json();
    factor = json[0][toUnit];
    dist *= factor;

    distoutput.value = dist;
    // Update the history log
    saveHistory(distIn, toUnit, fromUnit, dist);
    loadHistory();
}

async function convertVolume(){
    let vol = volinput.value;
    if(vol == ""){
        vol = 0;
    }
    let volIn = vol;
    let fromUnit = volselect1.value;
    let toUnit = volselect2.value;
    
    data = {_id:fromUnit};
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options)
    const json = await response.json();
    factor = json[0][toUnit];
    vol *= factor;

    voloutput.value = vol;
    saveHistory(volIn, toUnit, fromUnit, vol);
    loadHistory();
}

async function convertMass(){
    let mass = massinput.value;
    if(mass == ""){
        mass = 0;
    }
    let massIn = mass;
    let fromUnit = massselect1.value;
    let toUnit = massselect2.value;

    data = {_id:fromUnit};
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options)
    const json = await response.json();
    factor = json[0][toUnit];
    mass *= factor;

    massoutput.value = mass;
    saveHistory(massIn, toUnit, fromUnit, mass);
    loadHistory();
}

async function convertTime(){
    let time = timeinput.value;
    if(time == ""){
        time = 0;
    }
    let timeIn = time;
    let fromUnit = timeselect1.value;
    let toUnit = timeselect2.value;

    data = {_id:fromUnit};
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options)
    const json = await response.json();
    factor = json[0][toUnit];
    time *= factor;

    timeoutput.value = time;
    saveHistory(timeIn, toUnit, fromUnit, time);
    loadHistory();
}

function convertTemperature(){
    let temp = tempinput.value;
    if(temp == ""){
        temp = 0;
    }
    let tempIn = temp;
    let fromUnit = tempselect1.value;
    let toUnit = tempselect2.value;

    temp = parseFloat(temp);

    if(toUnit == fromUnit){
        tempoutput.value = temp;
    }else{
        switch(fromUnit){
            case 'fahrenheit':
                if(toUnit == 'centigrade'){
                    temp = (temp - 32) / 1.8;
                }else{
                    temp = (temp + 459.67) / 1.8;
                }
                break;
            case 'centigrade':
                if(toUnit == 'fahrenheit'){
                    temp = temp * 1.8 + 32;
                }else{
                    temp = temp + 273.15;
                }
                break;
            case 'kelvin':
                if(toUnit == 'fahrenheit'){
                    temp = temp * 1.8 - 459.67;
                }else{
                    temp = temp - 273.15;
                }
                break;
        }
    }

    tempoutput.value = temp;
    saveHistory(tempIn, toUnit, fromUnit, temp);
    loadHistory();
}

async function convertCurrency(){
    let curr = currinput.value;
    if(curr == ""){
        curr = 0;
    }
    let currIn = curr;
    let fromUnit = currselect1.value;
    let toUnit = currselect2.value;

    // "back-tick string forming"
    await fetch(`https://api.exchangerate-api.com/v4/latest/${fromUnit}`)
        .then(res => res.json())
        .then(data => {
            er = data.rates[toUnit];
            curr *= er;
        });

    curroutput.value = curr;
    saveHistory(currIn, toUnit, fromUnit, curr);
    loadHistory();
}

// Save new history item to local storage
function saveHistory(input, toUnit, fromUnit, output){
    let entry = {'in': input, 'toUnit': toUnit, 'fromUnit': fromUnit, 'out': output};
    let list = new Array();
    cookie = JSON.parse(localStorage.getItem('hist'))
    if(cookie != null){
        // "spread operator"
        list = Array(...cookie);
    }
    list.push(entry);

    // "JSON.stringify"
    localStorage.setItem('hist', JSON.stringify(list));
}

// Fetch history from local storage and display it in the textarea
function loadHistory(){
    history.value = '';
    // "local storage"
    let historyList = new Array();
    cookie = JSON.parse(localStorage.getItem('hist'))
    if(cookie != null){
        historyList = Array(...cookie);
    }
    for(i = 0; i < historyList.length; i++){
        history.value += `${historyList[i].in} ${historyList[i].fromUnit} = ${historyList[i].out} ${historyList[i].toUnit}\n`;
    }
}

// Remove all history items from local storage
function clearHistory(){
    localStorage.clear();
    loadHistory();
}

// Swap background color between light and dark modes.
function toggleMode(){
    // "contains method (classList)"
    if(parent.classList.contains("parent")){ // Switching to Dark Mode
        // "class toggle"
        parent.classList.toggle("parent");
        parent.classList.toggle("parent-dark");
        root.style.setProperty('--back', '#121212');
        root.style.setProperty('--head', '#FFFFFF');
        root.style.setProperty('--hist', '#152028');
        root.style.setProperty('--details', '#080316');
        root.style.setProperty('--text', '#ffffff');
        root.style.setProperty('--over', '#0f162b');
    }else{                                   // Switching to Light Mode
        parent.classList.toggle("parent-dark");
        parent.classList.toggle("parent");
        root.style.setProperty('--back', '#dadada');
        root.style.setProperty('--head', '#000000');
        root.style.setProperty('--hist', '#8a8a8a');
        root.style.setProperty('--details', '#d3cfc7');
        root.style.setProperty('--text', '#000000');
        root.style.setProperty('--over', '#f1f1f1');
    }
}

// Generate the currency option elements
function generateCurrDOM(){
    // "code-generated DOM elements" (Grabs the select elements from the "currency" details tag)
    let det = document.getElementById('currency');
    // "query selectors"
    let selectors = det.querySelectorAll('select');
    // "api"
    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
        .then(res => res.json())
        .then(data => {
            let currencies = Object.keys(data.rates);
            // "array methods (such as map)" (Amend the select elements to contain options for the currencies)
            selectors[0].innerHTML = currencies.map(currency => `<option value="${currency}">${currency}</option>`);
            selectors[1].innerHTML = currencies.map(currency => `<option value="${currency}">${currency}</option>`);
        });
}

// "event listener"
distsubmit.addEventListener('click', convertDistance);
volsubmit.addEventListener('click', convertVolume);
masssubmit.addEventListener('click', convertMass);
timesubmit.addEventListener('click', convertTime);
tempsubmit.addEventListener('click', convertTemperature);
currsubmit.addEventListener('click', convertCurrency);
clear.addEventListener('click', clearHistory);
mode.addEventListener('click', toggleMode);

generateCurrDOM();
loadHistory();