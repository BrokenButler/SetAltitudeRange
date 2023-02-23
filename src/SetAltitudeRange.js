// ==UserScript==
// @name         min/max-control for topographic-map.com
// @namespace    http://brokenbutler.com/
// @version      1.0
// @description  A little userscript that allows you to manipulate the maximum and minimum values of the height map on topographic-map.com
// @author       BrokenButler
// @match        https://*.topographic-map.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=topographic-map.com
// @grant        none
// @updateURL    https://raw.githubusercontent.com/BrokenButler/SetAltitudeRange/main/src/SetAltitudeRange.js
// @downloadURL  https://raw.githubusercontent.com/BrokenButler/SetAltitudeRange/main/src/SetAltitudeRange.js
// ==/UserScript==

addUI();

function addUI(){
    let module = document.querySelector("#moduleMap");
    let map = document.querySelector("#moduleMap > div");

    let wrapper = document.createElement("p");

    let descMin = document.createElement("a");
    descMin.textContent = "Minimum Altitude: ";
    let inputMin = document.createElement("input");
    inputMin.id = "inputMin";
    inputMin.type = "number";
    inputMin.name = "Min";

    let descMax = document.createElement("a");
    descMax.textContent = "Maximum Altitude: ";
    let inputMax = document.createElement("input");
    inputMax.id = "inputMax";
    inputMax.type = "number";
    inputMax.name = "Max";

    let setButton = document.createElement("button");
    setButton.id = "setButton";
    // setButton.type = "button";
    setButton.name = "Set";
    setButton.textContent = "Set Altitude Range";
    setButton.onclick = function(){ set(); };

    wrapper.append(descMin, inputMin, descMax, inputMax, setButton);

    module.insertBefore(wrapper, map);
}

function set(){
    let heightOverlay = document.querySelector("#moduleMap > div > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > img");
    let url = new URL(heightOverlay.src);

    let inputMin = document.querySelector("#inputMin");
    let inputMax = document.querySelector("#inputMax");

    if (inputMin.value != ''){
        if (url.searchParams.has("minimum")){
            url.searchParams.set("minimum", inputMin.value);
        } else {
            url.searchParams.append("minimum", inputMin.value);
        }
    }
    if (inputMax.value != ''){
        if (url.searchParams.has("maximum")){
            url.searchParams.set("maximum", inputMax.value);
        } else {
            url.searchParams.append("maximum", inputMax.value);
        }
    }

    heightOverlay.src = url.href
}
