let endOfThePage = 0;
let preloading = false;

const showGif = () => {
    let gif = document.getElementById('gif');
    console.log(`showGif()`);
    gif.style.display = 'block';
    preloading = true;
}

const hideGif = () => {
    let gif = document.getElementById('gif');
    console.log(`hideGif()`);
    gif.style.display = 'none';
    preloading = false;
}

const fetchData = () => {
    if (!preloading) {
    showGif();

    fetch('https://akademia108.pl/api/ajax/get-users.php')
        .then(res => res.json())
        .then(data => {

            let content = document.getElementById('content');

            for (let user of data) {
                let pId = document.createElement('p');
                let pName = document.createElement('p');
                let pWebsite = document.createElement('p');

                pId.innerText = `User ID: ${user.id}`;
                pName.innerText = `User Name: ${user.name}`;
                pWebsite.innerHTML = `User Website: ${user.website}<br/>--------`;


                content.appendChild(pId);
                content.appendChild(pName);
                content.appendChild(pWebsite);
            }

            hideGif();
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }
};

const handleIntersection = (entries, observer) => {
    console.log('bla');
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            endOfThePage += 1;
            console.log(`Scrolled to the End of Page: ${endOfThePage}`);
            fetchData();
            // observer.unobserve(entry.target);
        }
    });
};

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
};



const observer = new IntersectionObserver(handleIntersection, options);
observer.observe(document.querySelector('#loading'));