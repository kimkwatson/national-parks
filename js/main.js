import { initMap as buildMap } from "./map.js";

window.initMap = async () => {
    const response = await fetch("https://developer.nps.gov/api/v1/parks?limit=500&api_key=amsIZUIObPexCdxaNPdbpUOq0lKUxhjwD91MOVj8");
    const json = await response.json();
    const parks = json.data;
    console.log("NPS returned:", json.data.length, "of total:", json.total, "limit:", json.limit, "start:", json.start);

    buildMap(parks);
};

// Hamburger Menu

const hamburger = document.querySelector('#hamButton');
const navigation = document.querySelector('#animated');
const menuItems = document.querySelectorAll('#animated ul.menu li');

hamburger.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamburger.classList.toggle('open');
});

// Menu Selection



menuItems.forEach(item => {
  item.addEventListener('click', () => {
    // remove active from all
    menuItems.forEach(i => i.classList.remove('active'));

    // add active to the selected menu item
    item.classList.add('active');

    // close hamburger menu after choosing
    navigation.classList.remove('open');
    hamburger.classList.remove('open');
  });
});
