let form = document.querySelector('form');
let imageList = document.querySelector('#images');

form.onsubmit = async event => {

    event.preventDefault();

    let search = form.textsearch.value;
    let colorSelection = form.colorselect.value;

    let url = `https://pixabay.com/api/?key=33602531-81aa9b6b285c0a9184743cc53&q=${search}&per_page=10`

    let response = await fetch(url);
    let json = await response.json();

    let li = document.createElement('li')
    let img = document.createElement('img');
    img.src = json.hits[0].webformatURL;

    li.append(img);

    imageList.append(li);

}