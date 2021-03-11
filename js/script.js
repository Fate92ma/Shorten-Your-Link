// Dom Variables
let input = document.getElementsByTagName("input")[0],

    inputValue,

    result = document.getElementsByClassName('result')[0],

    // Data Variables
    myRequest,

    myData,

    URL;

// Events

input.addEventListener('keypress', isValidURL);

/**************************************************************************************************/

// function to check user url is it valid or not
function isValidURL(event) {

    inputValue = input.value.trim();

    let regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

    // if key pressed is 'enter'
    if (event.keyCode == 13) {

        // if the url is valid
        if (regex.test(inputValue)) {

            URL = `https://api.shrtco.de/v2/shorten?url=${inputValue}`

            result.innerHTML = `<img src="img/loading.svg" alt="loading">`

            shortMyLink()

        }

        //
        else {

            alert("Enter a Valid URL")

            return false

        }

    }

}

/**************************************************************************************************/

// function to shorten user link
function shortMyLink() {

    myRequest = new XMLHttpRequest()

    myRequest.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 201) {

            myData = JSON.parse(this.responseText)

            result.innerHTML = '';

            result.innerHTML =

                `<div>
<input type="url" value="${myData.result.short_link}">
<p class='toCopy'>Copy Link</p>
</div>

<div>
<input type="url" value="${myData.result.short_link2}">
<p class='toCopy'>Copy Link</p>
</div>

<div>
<input type="url" value="${myData.result.short_link3}">
<p class='toCopy'>Copy Link</p>
</div>`

            //
            targetToCopy()

        }
    }

    myRequest.onerror = function () {
        throw "Request Failed"
    }

    myRequest.open("GET", URL, true)

    myRequest.send()

}

/**************************************************************************************************/

// function to target all 'toCopy' classes to allow copy short links
function targetToCopy() {

    let toCopy = [...document.getElementsByClassName('toCopy')];

    toCopy.forEach((span) => {

        // get previous element of 'toCopy' class
        // previous element is an input with short linke value
        let copyLink = span.previousElementSibling;

        // on click
        span.addEventListener('click', function () {

            // select value of input
            copyLink.select()

            // sets the start and end positions of value
            copyLink.setSelectionRange(0, 99999)

            // copy the value
            document.execCommand("copy");

            // print msg after 'copy' is done
            span.parentElement.innerHTML += `<em>Text Copied</em>`

        })

    })

}

/**************************************************************************************************/