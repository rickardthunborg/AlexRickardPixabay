let form = document.querySelector('form');
let imageList = document.querySelector('#images');
let previous = document.querySelector("#previous")
let next = document.querySelector("#next")
let search = "";
let colorSelect = document.querySelector('#colorselect');
let colorSelection ="";

let currentPage = 1;
let totalPages = null;

previous.disabled = true;
next.disabled = true;

previous.addEventListener('click', () => {
    currentPage--;
    
    loadPage();

    window.scrollTo({top: 0});
  });

next.addEventListener('click', () => {
    currentPage++;
    
    loadPage();

    window.scrollTo({top: 0});
})

colorSelect.addEventListener('change', () => {

  const selectedColor = colorSelect.value;
  const colorOption = colorSelect.options[colorSelect.selectedIndex];
  const colorOptionColor = colorOption.style.backgroundColor;
  colorSelect.style.backgroundColor = selectedColor !== 'any' ? selectedColor : 'gray';
  colorSelect.style.color = selectedColor !== 'any' ? (selectedColor === 'white' ? 'black' : 'white') : 'black';
})


form.onsubmit = async event => {

    event.preventDefault();

    search = form.textsearch.value.replace(" ","+");
    colorSelection = form.colorselect.value;

    loadPage();
    

    

    currentPage = 1;
}


async function loadPage() {


    while (imageList.firstChild) {
        imageList.removeChild(imageList.firstChild);
    }

    previous.classList.add("hidden")
    next.classList.add("hidden")

    let url = null;

    if (colorSelection != "any") {
        url = `https://pixabay.com/api/?key=33602531-81aa9b6b285c0a9184743cc53` +
            `&q=${search}&per_page=12&page=${currentPage}&colors=${colorSelection}`
    }
    else {
        url = `https://pixabay.com/api/?key=33602531-81aa9b6b285c0a9184743cc53` +
            `&q=${search}&per_page=12&page=${currentPage}`
    }

    let response = await fetch(url);
    let json = await response.json();

    for (i = 0; i < json.hits.length; i++) {
        let li = document.createElement('li')
        let img = document.createElement('img');
        let imgDiv = document.createElement('div')
        let h2 = document.createElement('h2')
        let p = document.createElement('p')

        let imgLink = json.hits[i].webformatURL.replace("_640", "_340");

        img.src = imgLink;
        h2.textContent = json.hits[i].tags;
        p.textContent = "taken by: " + json.hits[i].user;

        imgDiv.append(img);

        li.append(imgDiv);
        li.append(h2)
        li.append(p)
        imageList.append(li);

        
    }

    if(json.hits.length > 0){
        previous.classList.remove("hidden")
        next.classList.remove("hidden")
    }
    

    toggleButtons(json);
} 

function toggleButtons(json) {
    if (currentPage === 1) {
        previous.disabled = true;
    }
    else{
        previous.disabled = false;
    }
    if(currentPage >= (json.totalHits) / 10){
        next.disabled = true;
    }
    else{
        next.disabled = false;
    }
}

