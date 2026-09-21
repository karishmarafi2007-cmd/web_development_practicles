function callbackExample(callback) {

    setTimeout(() => {

        callback("Callback completed");

    }, 1000);

}

callbackExample(function(message) {

    console.log(message);

});


function promiseExample() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("Promise completed");

        }, 1000);

    });

}

promiseExample().then(function(message) {

    console.log(message);

});


async function asyncExample() {

    let message = await promiseExample();

    console.log(message);

}

asyncExample();