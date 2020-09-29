// grab the form element
const urlForm = document.querySelector('.shortening');

// the links section will be used in the axios call to append the created url element to
const linksSection = document.querySelector('.shortend-links');

// the array that keeps track of all the links that have been shortened during this session
// if this is a new session then the array is empty
const shortendURLS = sessionStorage.getItem('urls') ? JSON.parse(sessionStorage.getItem('urls')) : [];

// grabbing the error paragraph element
const errorElement = document.querySelector('.input-error');

// create the components stored inside shortenedUrls if there are any in the session saved
shortendURLS.forEach(component => {
    const urlComponent = createComponent(component);
    linksSection.appendChild(urlComponent); 
})


// function that changes the button text after clicking it and copies the text to the clipboard using the clipboard api
function copyUrlButton(button, urlToCopy) {
    button.innerText = "Copied!";
    button.className = 'copied';
    navigator.clipboard.writeText(urlToCopy);
}

// function that creates the shortend url component
function createComponent(urlObj) {
    // create all the elements that new component will need
    const container = document.createElement('div');
    const left = document.createElement('p');
    const right = document.createElement('div');
    const rightALink = document.createElement('a');
    const rightButton = document.createElement('button');

    // add the data that is needed to the elements
    left.innerText = urlObj.url;
    rightALink.innerText = urlObj.shortend;
    rightALink.href = urlObj.shortend;
    rightButton.innerText = "Copy";

    // add onclick to button
    rightButton.addEventListener('click', () => {
        copyUrlButton(rightButton, urlObj.shortend);
    });


    // append the elements to their containers
    right.appendChild(rightALink);
    right.appendChild(rightButton);

    container.appendChild(left);
    container.appendChild(right);

    container.className = 'link';

    return container
}

// the function that sends the api request
const requestShortURL = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formInput = document.querySelector('#url-input');
    if(!formInput.value) {
        formInput.className = 'error';
        errorElement.textContent = "Please add a link"
    } else {
        // actual request
        axios.post('https://rel.ink/api/links/', { url: formInput.value })
            .then(res => {
                formInput.classList.remove('error');
                errorElement.textContent = ""
                const newUrl = `https://rel.ink/${res.data.hashid}`

                // i will need both the url and the shortendUrl when creating the url element
                return { url: res.data.url, shortend: newUrl }
            })
            .then(data => {
                // add the new data obj to the array and save it into sessionStorage
                shortendURLS.push(data);
                sessionStorage.setItem('urls', JSON.stringify(shortendURLS));
                const newUrlComponent = createComponent(data); 
                
                linksSection.appendChild(newUrlComponent);
            })
            .catch(err => {
                console.log(err)
            })
        }
}

// add a click function that sends an axios request
urlForm.addEventListener('submit', requestShortURL);