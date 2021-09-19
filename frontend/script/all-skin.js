const images_list = []

async function createImagesDiv() {
    const images_container = document.getElementById("images-container");

    await fetch('http://localhost:8080/coins')
        .then(response => {
            return response.json();
        })
        .then(elements => {
            for (const element of elements) {
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

                images_list.push(image_div)
            }
        })
}

function searchCoin() {
    value = document.getElementById("searchBar").value
    const matches = images_list.filter(s => s.id.includes(value));

    for (const image of images_list) {
        image.classList.remove("hide")
        if (!matches.includes(image)) {
            image.classList.add("hide")
        }
    }
}

window.onload = async function() {
    await createImagesDiv()
    console.log(images_list)
}