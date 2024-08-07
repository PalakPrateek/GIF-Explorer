let submitBut = document.getElementById("submit-btn");

let generateGif = () => {
    //display loader until GIF loads
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    document.querySelector(".wrapper").style.display = "none";

    //get search value (default: kitten)
    let q = document.getElementById("search-box").value;

    //20 GIFS to be displayed in result
    let gifCount = 20;

    //API
    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;

    //clears any existing content in the .wrapper element
    document.querySelector(".wrapper").innerHTML = "";

    //make a call to the API
    fetch(finalURL)
        .then(resp => resp.json())
        .then(info => {
            console.log(info.data);
            //array of GIF data
            let gifsData = info.data;
            gifsData.forEach((gif) => {
                //generate cards for GIF
                let container =document.createElement("div"); //create a new div element for each GIF
                container.classList.add("container"); //adds the container class to the new div element
                let iframe = document.createElement("img"); //create a new img element for the GIF
                console.log(gif);
                iframe.setAttribute("src", gif.images.downsized_medium.url); //set src attribute
                iframe.onload = () => {
                    //if iframes loaded correctly, reduce the count when each GIF loads
                    gifCount--;
                    if(gifCount == 0) {
                        //if all GIFs have loaded, then hide the loader
                        loader.style.display = "none";
                        document.querySelector(".wrapper").style.display = "grid"; //shows the .wrapper element as grid layout
                    }
                };
                container.append(iframe); //appends the img element to the div container
                document.querySelector(".wrapper").append(container); //append the div container to the .wrapper element
            });
        });
};

//Generate GIFs when page loads or when user clicks on submit
submitBut.addEventListener("click", generateGif);
window.addEventListener("load", generateGif);