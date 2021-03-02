console.log('PostMaster Project');


// Initializae Number of parameters
let addedParamsCount = 0;

// Utility Functions
// 1. Ulility function to get DOM element from the string 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// Hide the parametersBox initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// if the user clicks on the params, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// if the user clicks on the json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio')
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

// if user clicks on + button, add more parameters
let addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="row my-4">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}" placeholder="Enter Parameter ${addedParamsCount + 2} value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                    </div>`
    // Comvert the element string to DOM node
    let paramsElement = getElementFromString(string)
    // console.log(paramsElement);
    params.appendChild(paramsElement)
    // add event listerner to remove the parameter
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }

    addedParamsCount++;
})

// user clicks on Submit button 
let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    // Show Please wait in the response box to request patience from user
    document.getElementById('responseJsonText').value = 'Please wait... fetching the response'

    //  Fetch all the values User has entered
    let url = document.getElementById('url').value
    let requesType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;



    // If user has used params option insead of JSON, collect all the parameters in an object
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
            data = JSON.stringify(data);
        }
    }
    else {
        data = document.getElementById('requestJsonText').value
    }

    // Log all the values in the console 
    console.log('URL is', url);
    console.log('request Type is', requesType);
    console.log('Content Type is', contentType);
    console.log('Data', data);

    // post request, invoke fetch api to create a post request
    if (requesType == 'GET') {
        fetch(url, {
            method: 'GET',

        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text
            })
    }
    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text
            })
    }
})