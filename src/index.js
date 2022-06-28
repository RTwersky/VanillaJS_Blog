import './index.css';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
// import regeneratorRuntime from "regenerator-runtime";

// fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new Error("NETWORK RESPONSE ERROR");
//         }
//     })
//     .then(data => {
//         data.forEach(e => {
//             $('#users').append($(
//                 `<div>
//                 <h3> ${e.name}<h3> 
//                 <h4>${e.website}<h4>
//                 <h5>${e.company.name, e.company.catchPhrase, e.company.bs}</h5>
//                 <hr>
//             </div>`))
//         });
//     })
//     .catch((error) => console.error("FETCH ERROR:", error));

// async function doTheFetch(file) {
//     try {
//         const response = await fetch(file);
//         if (!response.ok) {
//             throw new Error(`${response.status} ${response.statusText}`);
//         }
//         return await response.json();
//     } catch (e) {
//         console.error('OOPS, ERROR', e);
//     }
// }

// let userArray = await doTheFetch('https://jsonplaceholder.typicode.com/users');
// userArray.forEach(e => {
//     $('#users').append($(
//         `<div>
//             <h3> ${e.name}<h3> 
//             <h4>${e.website}<h4>
//             <h5>${e.company.name, e.company.catchPhrase, e.company.bs}</h5>
//             <hr>
//         </div>`))
// });
(async function () {

    async function doTheFetch(file) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (e) {
            console.error('OOPS, ERROR', e);
        }
    }

    let userArray = await doTheFetch('https://jsonplaceholder.typicode.com/users');
    //console.log(userArray);
    userArray.forEach(e => {
        const addToScreen = $(`<div class="user" class='container'>
            <h2 class="text-info"> ${e.name}<h3> 
            <h4 class="text-secondary">${e.website}<h4>
            <h5 class="text-dark">${e.company.name} | ${e.company.catchPhrase} | ${e.company.bs}</h5>
             <hr>
            </div>` ).on('click', () => {
            localStorage.setItem('setUp', JSON.stringify(e));
            location.href = "posts.html";
        });

        $('#users').append(addToScreen);


    })

    // userArray.forEach(e => {
    //     $('#users').append($(
    //         `<div class='blogs' id="${e.id}">
    //         <h3 id="${e.id}"> ${e.name}<h3> 
    //         <h4>${e.website}<h4>
    //         <h5>${e.company.name, e.company.catchPhrase, e.company.bs}</h5>
    //         <hr>
    //     </div>`))
    // });

    // $('.user').on('click', e => {
    //     console.log('clicked' + e.target.id);
    // });

    // $(document).on('click', '.blogs', () => {
    //     console.log('clicked');
    // });
}());
