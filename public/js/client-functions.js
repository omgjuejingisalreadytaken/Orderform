
function showItems(){

    var itemList = [ "item1", "item2", "item3"];
    var show = "";

    array.forEach(element => {
        show += element;
        show += "<br>";
        console.log(element);
    });

    return show;

};

function test(){
    alert("test");
};