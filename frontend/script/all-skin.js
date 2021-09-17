function createImagesDiv() {
    const images_container = document.getElementById("images-container");

    let image_div = document.createElement("div");
    image_div.classList.add("image");
    
    let image = document.createElement("img");
    image.src = "/utilities/image_generator/final_images/japan.png"
    image.alt = "japan"
    
    let name = document.createElement("h5");
    name.innerText = "japan";
    
    image_div.appendChild(image);
    image_div.appendChild(name)
    
    images_container.appendChild(image_div);
}

function test() {
    console.log("test");

    let reader = new FileReader("/utilities/image_generator/filenames.txt");
    
    reader.onload = function(evt) {
        console.log(evt.target.result);
    };
    reader.readAsText("/utilities/image_generator/filenames.txt");
}

document.onload = test()