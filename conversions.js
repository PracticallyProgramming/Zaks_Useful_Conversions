// Author: Zachary Dulac <zdulac@fordham.edu>
// Internet and Web Programming Final Project

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
const submit = document.getElementById('submit');

// Conversion functions for the appropriate tools.
async function convertDistance(){
    console.log('Distance');
    let dist = distinput.value;
    let fromUnit = distselect1.value;
    let toUnit = distselect2.value;
    
    // To simplify the conversion process, every unit is first converted to meters, then from meters to the intended unit.
    // Structured in this way, the switches do not need to be nested.
    switch(fromUnit){
        case 'millimeter':
            dist *= 0.001;
            break;
        case 'centimeter':
            dist *= 0.01;
            break;
        case 'meter':
            break;
        case 'kilometer':
            dist *= 1000;
            break;
        case 'inch':
            dist *= 0.0254;
            break;
        case 'foot':
            dist *= 0.3048;
            break;
        case 'yard':
            dist *= 0.9144;
            break;
        case 'mile':
            dist *= 1609.344;
            break;
    }

    switch(toUnit){
        case 'millimeter':
            dist = mToMm(dist);
            break;
        case 'centimeter':
            dist = mToCm(dist);
            break;
        case 'meter':
            break;
        case 'kilometer':
            dist = mToKm(dist);
            break;
        case 'inch':
            dist = mToIn(dist);
            break;
        case 'foot':
            dist = mToFt(dist);
            break;
        case 'yard':
            dist = mToYd(dist);
            break;
        case 'mile':
            dist = mToMi(dist);
            break;
    }

    // Removing any floating point precision past this place will prevent counter-intuitive results caused by the conversions between imperial and metric units (i.e. 2 yards = 6.0000001 feet)
    distoutput.value = dist.toFixed(6);

}

async function convertVolume(){
    let vol = volinput.value;
    let fromUnit = volselect1.value;
    let toUnit = volselect2.value;
    
    if(fromUnit == toUnit){
        voloutput.value = vol;
    }else{
        // Pints were chosen as the base unit for volume as there are many more imperial units than metric ones,
        // making more of the available units consistent.
        switch(fromUnit){
            case 'liter':
                vol *= 2.11338;
                break;
            case 'fluidOunce':
                vol *= 0.0625;
                break;
            case 'cup':
                vol *= 0.50721;
                break;
            case 'pint':
                break;
            case 'quart':
                vol *= 2;
                break;
            case 'gallon':
                vol *= 8;
                break;
        }
        switch(toUnit){
            case 'liter':
                vol = ptToL(vol);
                break;
            case 'fluidOunce':
                vol = ptToOz(vol);
                break;
            case 'cup':
                vol = ptToCp(vol);
                break;
            case 'pint':
                break;
            case 'quart':
                vol = ptToQt(vol);
                break;
            case 'gallon':
                vol = ptToGa(vol);
                break;
        }
    }

    voloutput.value = vol.toFixed(5);
}

async function convertMass(){
    let mass = massinput.value;
    let fromUnit = massselect1.value;
    let toUnit = massselect2.value;

    if(fromUnit == toUnit){
        massoutput.value = mass;
    }else{
        switch(fromUnit){
            case 'milligram':
                mass *= .001;
                break;
            case 'gram':
                break;
            case 'kilogram':
                mass *= 1000;
                break;
            case 'ounce':
                mass *= 28.3495;
                break;
            case 'pound':
                mass *= 453.592;
                break;
            case 'stone':
                mass *= 6350.29;
                break;
        }
        switch(toUnit){
            case 'milligram':
                mass = gToMg(mass);
                break;
            case 'gram':
                break;
            case 'kilogram':
                mass = gToKg(mass);
                break;
            case 'ounce':
                mass = gToOz(mass);
                break;
            case 'pound':
                mass = gToLb(mass);
                break;
            case 'stone':
                mass = gToSt(mass);
                break;
        }

        massoutput.value = mass.toFixed(4);
    }
}

function convertTime(){
    let time = timeinput.value;
    let fromUnit = timeselect1.value;
    let toUnit = timeselect2.value;

    time = parseFloat(time);

    if(fromUnit == toUnit){
        timeoutput.value = time;
    }else{
        switch(fromUnit){
            case 'second':
                break;
            case 'minute':
                time *= 60;
                break;
            case 'hour':
                time *= 3600;
                break;
            case 'day':
                time *= 86400;
                break;
            case 'week':
                time *= 604800;
                break;
            case 'year':
                time *= 31557600;
                break;
        }
        switch(toUnit){
            case 'second':
                break;
            case 'minute':
                time = sToM(time);
                break;
            case 'hour':
                time = sToH(time);
                break;
            case 'day':
                time = sToD(time);
                break;
            case 'week':
                time = sToW(time);
                break;
            case 'year':
                time = sToY(time);
                break;
        }
    }

    timeoutput.value = time;
}

function convertTemperature(){
    let temp = tempinput.value;
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
}

async function convertCurrency(){
    let curr = currinput.value;
    let fromUnit = currselect1.value;
    let toUnit = currselect2.value;

    await fetch(`https://api.exchangerate-api.com/v4/latest/${fromUnit}`)
        .then(res => res.json())
        .then(data => {
            er = data.rates[toUnit];
            curr *= er;
        });

    curroutput.value = curr;
}

// Converter functions
function mToMm(meters){
    return meters * 1000;
}

function mToCm(meters){
    return meters * 100;
}

function mToKm(meters){
    return meters * 0.001;
}

function mToIn(meters){
    return meters * 39.37;
}

function mToFt(meters){
    return meters * 3.28084;
}

function mToYd(meters){
    return meters * 1.09361;
}

function mToMi(meters){
    return meters * 0.000621371;
}

function ptToL(pints){
    return pints * 0.473176;
}

function ptToOz(pints){
    return pints * 16;
}

function ptToCp(pints){
    return pints * 1.97157;
}

function ptToQt(pints){
    return pints * 0.5;
}

function ptToGa(pints){
    return pints * 0.125;
}

function gToMg(grams){
    return grams * 1000;
}

function gToKg(grams){
    return grams * 0.001;
}

function gToOz(grams){
    return grams * 0.035274;
}

function gToLb(grams){
    return grams * 0.00220462;
}

function gToSt(grams){
    return grams * 0.000157473;
}

function sToM(seconds){
    return seconds / 60;
}

function sToH(seconds){
    return seconds / 3600;
}

function sToD(seconds){
    return seconds / 86400;
}

function sToW(seconds){
    return seconds / 604800;
}

function sToY(seconds){
    return seconds / 31536000;
}

// Event Listeners
distsubmit.addEventListener('click', convertDistance);
volsubmit.addEventListener('click', convertVolume);
masssubmit.addEventListener('click', convertMass);
timesubmit.addEventListener('click', convertTime);
tempsubmit.addEventListener('click', convertTemperature);
currsubmit.addEventListener('click', convertCurrency);
submit.addEventListener('click', printAll);

async function printAll(){
    
}