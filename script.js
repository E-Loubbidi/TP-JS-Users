//Start Grid Creation 

var div = document.querySelector('.hidden  .user');
var dest = document.querySelector('.countainer .row');

users.forEach(user => {
    var node = div.cloneNode(true);

    node.setAttribute('style', 'margin-top:10px;');
    node.setAttribute('class', 'col-sm-6 col-md-4');

    node.querySelector('img').setAttribute('src', user.picture.large);
    node.querySelector('.card-title').innerHTML = '<strong>' + user.name.title + '</strong> ' +
        '<span>' + user.name.first + '</span>';
    node.querySelector('.card-text').innerHTML = '<span>' + user.email + '</span>';
    node.querySelector('.btn').addEventListener('click', ModifierCardUser(user));
    node.querySelector('.valider').addEventListener('click', ValiderUserCard(user));

    dest.appendChild(node);
});


// End Grid Creation 

//Start table Creation 
var trbody = document.querySelector('.hidden .tableau .table tbody tr');
var trhead = document.querySelector('.hidden .tableau .table tHead tr');


var tbodyDest = document.querySelector(' .tableau .table tbody');
var theadDest = document.querySelector(' .tableau .table thead');
theadDest.appendChild(trhead.cloneNode(true));


users.forEach((user, index) => {
    var trClone = trbody.cloneNode(true);

    trClone.querySelector('.img').innerHTML = '<img src= "' + user.picture.medium + '">';
    trClone.querySelector('.title span').innerHTML = user.name.title;
    trClone.querySelector('.first span').innerHTML = user.name.first;
    trClone.querySelector('.last span').innerHTML = user.name.last;
    trClone.querySelector('.gender span').innerHTML = user.gender;
    trClone.querySelector('.email span').innerHTML = user.email;
    trClone.querySelector('.modifier').addEventListener("click", ModifierTableau(user));
    trClone.querySelector('.valider').addEventListener("click", ValiderModification(user));


    tbodyDest.appendChild(trClone);
});

//End table Creation 

//Switch between table to grid
var grid = true;
var table = false;
var button = document.querySelector('.btn');
var tableauDisplay = document.querySelector('.countainer .tableau');
var gridDisplay = document.querySelector('.grid');

function changeToTable() {
    if (grid) {
        grid = !grid;
        table = !table;
        tableauDisplay.setAttribute('style', 'display:flex;');
        gridDisplay.setAttribute('style', 'display:none;');
        button.innerHTML = 'Grille';
    } else {
        grid = !grid;
        table = !table;
        tableauDisplay.setAttribute('style', 'display:none;');
        gridDisplay.setAttribute('style', 'display:flex;');
        button.innerHTML = 'Tableau';
    }
}




//Start user modif



function ModifierTableau(user) {
    return function () {

        var trParent = this.parentNode.parentNode;
        var valider = this.parentNode.querySelector('.valider');

        //on change le label du button modifier 
        this.setAttribute('style', 'display:none');
        valider.setAttribute('style', 'display:flex');






        // start title Modif
        var inputTitle = document.querySelector('.input-model input').cloneNode(true);
        inputTitle.setAttribute('value', user.name.title);
        var title = trParent.querySelector('.title');
        var spantitle = title.querySelector('span');
        title.replaceChild(inputTitle, spantitle);
        // End title Modif

        // start first Modif
        var inputfirst = document.querySelector('.input-model input').cloneNode(true);
        inputfirst.setAttribute('value', user.name.first);
        var first = trParent.querySelector('.first');
        var spanfirst = first.querySelector('span');
        first.replaceChild(inputfirst, spanfirst);
        // End first Modif

        // start last Modif
        var inputlast = document.querySelector('.input-model input').cloneNode(true);
        inputlast.setAttribute('value', user.name.last);
        var last = trParent.querySelector('.last');
        var spanlast = last.querySelector('span');
        last.replaceChild(inputlast, spanlast);
        // End last Modif

        // start Email Modif
        var inputEmail = document.querySelector('.input-model input').cloneNode(true);
        inputEmail.setAttribute('value', user.email);
        inputEmail.style.width = "250px";
        var email = trParent.querySelector('.email');
        var spanEmail = email.querySelector('span');
        email.replaceChild(inputEmail, spanEmail);
        // End Email Modif

        // start Gender Modif
        var options = document.querySelector('.input-model .option select').cloneNode(true);
        options.setAttribute('selected', user.gender);
        var gender = trParent.querySelector('.gender');
        options.value = user.gender;
        var spangender = gender.querySelector('span');
        gender.replaceChild(options, spangender);
        // End Gender Modif








    }

}


function ValiderModification(user) {

    return function () {




        var trParent = this.parentNode.parentNode;



        var title = trParent.querySelector('.title input').value;
        var first = trParent.querySelector('.first input').value;
        var last = trParent.querySelector('.last input').value;
        var gender = trParent.querySelector('.gender select option:checked').value;
        var email = trParent.querySelector('.email input').value;


        //dest.forEach() n'pas fonctionner
        var cards = document.querySelectorAll('.countainer .card .card-title');
        // console.log(cards);

        cards.forEach((element) => {
            var first_name = element.querySelector('span').textContent;


            if (first_name === user.name.first) {
                element.querySelector('span').textContent = first;
                element.querySelector('strong').textContent = title;
                element.parentNode.querySelector('p').textContent = email;
            }

        })

        user.gender = gender;
        user.email = email;
        user.name.first = first;
        user.name.last = last;
        user.name.title = title;


        var trClone = trbody.cloneNode(true);

        trClone.querySelector('.img').innerHTML = '<img src= "' + user.picture.medium + '">';
        trClone.querySelector('.title span').innerHTML = user.name.title;
        trClone.querySelector('.first span').innerHTML = user.name.first;
        trClone.querySelector('.last span').innerHTML = user.name.last;
        trClone.querySelector('.gender span').innerHTML = user.gender;
        trClone.querySelector('.email span').innerHTML = user.email;
        trClone.querySelector('.modifier').addEventListener("click", ModifierTableau(user, trClone));
        trClone.querySelector('.valider').addEventListener("click", ValiderModification(user, trClone));


        trParent.parentNode.replaceChild(trClone, trParent);



    }

}


//End user modif



//Start Modifier Card User 

function ModifierCardUser(user) {
    return function () {
        button_parent = this.parentNode;

        this.style.display = "none";
        button_parent.querySelector('.valider').style.display = "flex";


        //Debut : remplacer le nom et le title par des champs input pour modifier

        var title_card = button_parent.querySelector('.card-title strong');
        var input_title = document.querySelector('.hidden .input-model input').cloneNode(true);
        input_title.setAttribute('value', title_card.textContent);
        input_title.style.margin = "5px";

        var first_name_card = button_parent.querySelector('.card-title span');
        var input_first = document.querySelector('.hidden .input-model input').cloneNode(true);
        input_first.setAttribute('value', first_name_card.textContent);
        input_first.style.margin = "5px";

        var email = button_parent.querySelector('.card-text span');
        var input_email = document.querySelector('.hidden .input-model input').cloneNode(true);
        input_email.setAttribute('value', email.textContent);
        input_email.style.width = "90%";

        console.log(button_parent);


        button_parent.querySelector('.card-title').replaceChild(input_title, title_card);
        button_parent.querySelector('.card-title').replaceChild(input_first, first_name_card);
        button_parent.querySelector('.card-text').replaceChild(input_email, email);


        //fin : remplacer le nom et le title par des champs input pour modifier

    }
}
//End Modifier Card User 



function ValiderUserCard(user) {
    return function () {
        var button_parent = this.parentNode;

        var email = button_parent.querySelector('.card-text input').value;
        var inputs = button_parent.querySelectorAll('.card-title input');
        var title = inputs[0].value;
        var first_name = inputs[1].value;


        var src = document.querySelector('.hidden  .user');

        var title_firstName = src.querySelector('.card-title').cloneNode(true);
        title_firstName.innerHTML = '<strong>' + title + '</strong> ' +
            first_name;

        var email_field = src.querySelector('.card-text').cloneNode(true);
        email_field.innerHTML = email;

        button_parent.replaceChild(title_firstName, button_parent.querySelector('.card-title'))
        button_parent.replaceChild(email_field, button_parent.querySelector('.card-text '))

        console.log(button_parent);


    }
}