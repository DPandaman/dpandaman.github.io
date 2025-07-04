function themeChanger() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    const button = document.getElementById('themeButton');
    button.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.getElementById('themeButton').textContent = currentTheme === 'dark' ? '☀️' : '🌙';
});


const header = document.getElementById("header");
const arrow = document.getElementById("arrow");
header.style.visibility = "hidden";
const scrollThreshold = 800; 
const arrowThreshold = window.innerHeight / 3;

window.addEventListener("scroll", function() {
  if (window.scrollY > scrollThreshold) {
    header.style.visibility = "visible"; 
  } else {
    header.style.visibility = "hidden";     
  }

  if (window.scrollY > arrowThreshold) {
    arrow.style.visibility = "hidden";
  
  } else {
    arrow.style.visibility = "visible";
  }
});

function unfade(element) {
    var op = 0.0;  // initial opacity
    element.style.display = 'flex';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}


function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("myVideo");
  const overlay = document.getElementById("overlay2");

  function updateOverlaySize() {
    const rect = video.getBoundingClientRect();
    overlay.style.position = "absolute";
    overlay.style.top = rect.top + window.scrollY + "px";
    overlay.style.left = rect.left + window.scrollX + "px";
    overlay.style.height = rect.height + "px";
    overlay.style.pointerEvents = "none"; 
  }

  updateOverlaySize();
  window.addEventListener("resize", updateOverlaySize);
  window.addEventListener("scroll", updateOverlaySize);
  video.addEventListener("loadedmetadata", updateOverlaySize);
});

// Carousel
const map = new Map ([
  [0, "JavaScript"],
  [1, "C++"],
  [2, "Python"],
  [3, "OpenCV"],
  [4, "Google Cloud"],
  [5, "React"],
  [6, "TypeScript"],
  [7, "HTML/CSS"],
  [8, "ThreeJS"]
]);

const iconMap = new Map ([
  [0, document.getElementById("js")],
  [1, document.getElementById("cpp")],
  [2, document.getElementById("python")],
  [3, document.getElementById("opencv")],
  [4, document.getElementById("gcp")],
  [5, document.getElementById("react")],
  [6, document.getElementById("typescript")],
  [7, document.getElementById("htmlcss")],
  [8, document.getElementById("threejs")]
]);

const projectMap = new Map ([
  [0, ["TrackMyData", "BlankSpace for Google Maps", "Gyro PRY Modeling"]],
  [1, ["The van Emde Boas Tree", "Gyro PRY Modeling"]],
  [2, ["Illini Solar Car Calypso's RR", "VoxLink"]],
  [3, ["Work for ShotHawk.ai", "Integration with Norfair"]],
  [4, ["BlankSpace for Google Maps", "VoxLink"]],
  [5, ["BlankSpace for Google Maps"]],
  [6, ["BlankSpace for Google Maps", "TrackMyData"]],
  [7, ["TrackMyData", "Gyro PRY Modeling", "This Website"]],
  [8, ["Gyro PRY Modeling", "BlankSpace for Google Maps"]],
]);


const language = document.getElementById("detailText");
const projects = document.getElementById("projectsUsed");
const favicon = document.getElementById("favicon");
language.innerHTML = "<b>" + map.get(0) + "</b>";
const carousel = document.querySelector('.carousel');
var numIcons = 9;
var selectedIndex = 0;
updateProjects(0);

function updateProjects(mapIndex) {
  let s = "<ul>"
  for (var i = 0; i < projectMap.get(mapIndex).length; i++) {
    s += "<li>" + projectMap.get(mapIndex)[i] + "</li>";
  }
  s += "</ul>"
  projects.innerHTML = s;

  let opIndex1 = (mapIndex + 4) % numIcons;
  let opIndex2 = (mapIndex + 5) % numIcons;
  let unIndex1 = (opIndex1 - 1) % numIcons;
  let prevIndex = mapIndex - 1;

  // not true modulo so need to correct in case neg
  if (unIndex1 < 0) {
    unIndex1 += numIcons;
  }
  if (prevIndex < 0) {
    prevIndex += numIcons;  
  }

  iconMap.get(opIndex1).style.opacity = 0.3;
  iconMap.get(opIndex2).style.opacity = 0.3;
  iconMap.get(unIndex1).style.opacity = 1;

  iconMap.get(mapIndex).querySelector("img").style.boxShadow = "0 20px 20px rgba(0, 204, 255, 0.4)";
  iconMap.get(prevIndex).querySelector("img").style.boxShadow = "none";


}

function rotateCarousel() {
  selectedIndex++;
  language.innerHTML = "<b>" + map.get(selectedIndex % numIcons) + "</b>";
  updateProjects(selectedIndex % numIcons);
  var angle = selectedIndex / numIcons * -360;
  carousel.style.transform = 'translateZ(-288px) rotateY(' + angle + 'deg)';
}

const interval = setInterval(rotateCarousel, 3500);
interval.clearInterval();