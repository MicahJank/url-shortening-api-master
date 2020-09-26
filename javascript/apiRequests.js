// grab the form element
const urlForm = document.querySelector('.shortening');


const requestShortURL = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const formInput = document.querySelector('#url-input');
    
    // actual request
    axios.post('https://rel.ink/api/links/', { url: formInput.value })
        .then(res => {
            const newUrl = `https://rel.ink/${res.data.hashid}`
            console.log(newUrl);
        })
        .catch(err => {
            console.log(err)
        })
}

// add a click function that sends an axios request
urlForm.addEventListener('submit', requestShortURL);