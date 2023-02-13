let form = document.querySelector('form');
let imageList = document.querySelector('#images');
let currentPage = 1;

form.onsubmit = async event => {

    event.preventDefault();

    let search = form.textsearch.value;
    let colorSelection = form.colorselect.value;

    let url = `https://pixabay.com/api/?key=33602531-81aa9b6b285c0a9184743cc53` +
        `&q=${search}&per_page=10&page=${currentPage}`

    let response = await fetch(url);
    let json = await response.json();

    for (i = 0; i < json.hits.length; i++) {
        let li = document.createElement('li')
        let img = document.createElement('img');
        let h2 = document.createElement('h2')
        let p = document.createElement('p')

        let imgLink = json.hits[i].webformatURL.replace("_640", "_340");

        img.src = imgLink;
        h2.textContent = json.hits[i].tags;
        p.textContent = "taken by: " + json.hits[i].user;

        li.append(img);
        li.append(h2)
        li.append(p)
        imageList.append(li);
    }
}

function toggleButtons(json) {

}

