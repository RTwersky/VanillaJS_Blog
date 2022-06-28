
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

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


    let thisUser = localStorage.getItem('setUp');
    thisUser = JSON.parse(thisUser);
    console.log(thisUser);
    $('.header').append($(`
        <h1 class="text-primary text-center">${thisUser.name}'s Posts</h1>
        <h5 class="text-center text-info">${thisUser.company.name} |  ${thisUser.company.catchPhrase}  |  ${thisUser.company.bs}</h5>`
    ));
    $('.contactInfo').append($(`
        <h5 class="text-secondary text-center">Contact ${thisUser.name} at  ${thisUser.website}  or          ${thisUser.email}</h5>`  
    ));
    const fileName = ('https://jsonplaceholder.typicode.com/posts?userId=' + thisUser.id);

    let postArray = await doTheFetch(fileName);
    //console.log(postArray);
    postArray.forEach(e => {
        const addToScreen = $(`<div class="user" class="container">
            <h3 class="row"> ${e.title}</h3>
            <p clas="row">${e.body}</p>
            <button class="cButton btn btn-info" id="${e.id}">Show Comments</button>
            <div id=${'d' + e.id}></div>
            <hr>
            </div>
        ` );

        $('#posts').append(addToScreen);

    });

    $('.cButton').on('click', async e => {
        //hide show button
        e.target.style.display = 'none';
        let divId = ('#d' + e.target.id);

        if ($(divId).is(':empty')) {
            //add hide button
            $(divId).append($(`<button  class="hButton btn btn-info" id="${'hide' + e.target.id}">Hide Comments</button>`).on('click', () => {
                //console.log('hidden...');
                $(divId).css('display', 'none');
                e.target.style.display = 'block';
            }));
            //fetch comments
            let commentsArray = await doTheFetch('https://jsonplaceholder.typicode.com/comments?postId=' + e.target.id);
            commentsArray.forEach(e => {
                $(divId).append($(`<div class="user container bg-light">
                <h6> ${e.name + '   ' + e.email}</h3>
                <h7>${e.body}</p>
                </div>`));
            });
        } else {
            $(divId).css('display', 'block');
        }

    });


}());