var recepiesData = [];

function openModal (id) {

    document.getElementById('exampleModalLabel').innerHTML = recepiesData[id].mealTitle;
    document.getElementById('exampleModalBody').innerHTML = recepiesData[id].mealDesc;

    $('#exampleModal').modal();
}

function SearchMeal () {

    var search_item = document.getElementById('search-item').value;
    var api = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search_item;

    fetch(api)
    .then(response => response.json())
    .then(data => {
        var recepies = data.meals;

        var main_div = document.getElementById('recepies');

        for (var n=0; n<recepies.length; n++) {

            console.log(recepies[n]);


            var mealTitle = recepies[n].strMeal;
            var mealImage = recepies[n].strMealThumb;
            var mealDesc = recepies[n].strInstructions;

            recepiesData[n] = {
                mealTitle: mealTitle,
                mealImage: mealImage,
                mealDesc: mealDesc,
            }

            var div_col = document.createElement('div');
            var div_card = document.createElement('div');
            var div_cardbody = document.createElement('div');
            var img = document.createElement('img');
            var anchor = document.createElement('a');
            var h5 = document.createElement('h5');

            var txt = document.createTextNode(mealTitle);

            div_col.className = "col-3 my-1";
            
            div_card.className = "card";
            
            div_cardbody.className = "card-body px-1 py-0";

            h5.className = "card-title p-1 m-0 small-font text-center";
            h5.appendChild(txt);
            div_cardbody.appendChild(h5);

            img.setAttribute('src', mealImage);
            img.className = "card-img-top";

            div_card.appendChild(img);
            div_card.appendChild(div_cardbody);

            anchor.setAttribute('href', 'javascript:;');
            anchor.setAttribute('onclick', 'openModal(' + n + ')');
            anchor.appendChild(div_card);

            div_col.appendChild(anchor);

            main_div.appendChild(div_col);

        }

    })
    .catch(err => console.log(err));


}