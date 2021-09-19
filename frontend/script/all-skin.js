function createImagesDiv() {
    const images_container = document.getElementById("images-container");
    
    try {
        let request = new XMLHttpRequest();
        request.open("GET", "http://localhost:8080/coins");
        request.send();
        request.onload = () => {
            if (request.status === 200) {
                for (const element of JSON.parse(request.response)) {
                    let image_div = document.createElement("div");
                    image_div.classList.add("image");
                    image_div.id = element.slice(0,-4)

                    let image = document.createElement("img");
                    image.src = `../../backend/image_generator/final_images/${element}`
                    image.alt = element.slice(0,-4)
                    
                    let name = document.createElement("h5");
                    name.innerText = element.slice(0,-4);
                    
                    image_div.appendChild(image);
                    image_div.appendChild(name)
                    
                    images_container.appendChild(image_div);
                }
            } else {
                console.log(`error ${request.status} ${request.statusText}`)
            }
        }
    } catch(e) {
        console.log(e)
    }
}

function searchCoin() {
    value = document.getElementById("searchBar");
    console.log(searchBar.value)
}

window.onload = function() {
    createImagesDiv()
    searchCoin()
}