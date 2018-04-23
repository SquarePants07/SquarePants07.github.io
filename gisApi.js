//ключ + ссылка на каталог
var key = "rutnpt3272"
var url = `https://catalog.api.2gis.ru/2.0/catalog/branch/search?key=${key}&format=json&region_id=1`

//ссылки на хранилища сущностей
var categoryItemsURL = `https://catalog.api.2gis.ru/2.0/catalog/branch/search?key=${key}&region_id=16&format=json&page_size=50&fields=items.point`

var categoryURL = `https://catalog.api.2gis.ru/2.0/catalog/rubric/list?key=${key}&region_id=16&format=json`

var areaURL = `https://catalog.api.2gis.ru/2.0/geo/list?key=${key}&region_id=16&type=adm_div.district&fields=items.geometry.selection`

//запрос итемов категорий
function getCategoryItems(categoryName, districtId, page, allItems){

    var newCategoryItemsURL = categoryItemsURL + "&district_id=" + districtId  + "&q=" + categoryName + "&page=" + page;
    return fetch(newCategoryItemsURL, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
     },
   }).then(response => response.json()).then(data => {
     allItems = allItems.concat(data.result.items);
     var total = data.result.total
     var ceil = Math.ceil(total/50);

     if(ceil == page){
       return allItems;
     }
     else {
        var nextPage = page + 1;
        return getCategoryItems(categoryName, districtId, nextPage, allItems);
     }
});
}

//запрос самих категорий
function getCategories(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", categoryURL, true);
    xhr.onload = function(){
      callback(JSON.parse(xhr.responseText));
    }
    xhr.send();

}

//запрос областей
function getAreas(callback){

  var xhr = new XMLHttpRequest();
  xhr.open("GET", areaURL, true);
  xhr.onload = function(){
    callback(xhr.responseText);
  }
  xhr.send();
}
