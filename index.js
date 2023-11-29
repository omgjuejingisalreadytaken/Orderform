import "dotenv/config";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.listen(port, ()=>{
    console.log("Server running on port ", port);
    console.log(__dirname);
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public")); 
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("shop.ejs", {
        items:shopItems, 
        freeDelivery:freeDelivery, 
        deliveryCharge:deliveryCharge,
        maxCapacity:maxCapacity,
        weeks:weeks,
        dailycap:dailycap,
    });
});

app.post("/particulars", (req, res) => {
    

    var cart=generateCart(req.body,weeks,freeDelivery,deliveryCharge);  
    
    res.render("orderdetails.ejs",{
        body: req.body,
        items:shopItems,
        cart:cart,
    });
});




/*************************Functions*************************************** */


//computeweek

function checkOrderWeek(body,weeks){
    var day = new Date(body.date);
    for (let i = 0; i < weeks.length; i++) {
        var start = new Date(weeks[i][0]);
        var end = new Date(weeks[i][1]);
        if(day >= start && day <= end){
        return "week"+i;
        };
    };
};

//generate cart
function generateCart(body,weeks,freeDelivery,deliveryCharge){
    var purchaseList = [];
    var subTotal = 0;
    var delivery = deliveryCharge;
    var total = 0
    for (let i = 2; i < Object.keys(body).length; i++) {
        if (Object.values(body)[i]!=0){
            var item = [];
            var unitPrice = shopItems.find(x => x.name == Object.keys(body)[i]).price[checkOrderWeek(body,weeks)];
            item.push(Object.keys(body)[i]);
            item.push(Object.values(body)[i]);
            item.push(unitPrice);
            item.push(Object.values(body)[i]*unitPrice);
            purchaseList.push(item);
            subTotal += Object.values(body)[i]*unitPrice
        };
    if(Object.keys(body)[1]=="Collection" || subTotal>=freeDelivery){
        delivery = 0;
    }
    total = subTotal + delivery;
    }; 
    return [purchaseList, subTotal, delivery, total];
};

/***************************Create Data***************************************/


var freeDelivery = 100;
var deliveryCharge = 30;
var maxCapacity = 1000;
var weeks = [
    ["2024-01-12","2024-01-18"],
    ["2024-01-19","2024-01-25"],
    ["2024-01-26","2024-02-01"],
    ["2024-02-02","2024-02-09"],
];

var shopItems = [];
    shopItems.push({
        name:"Item1",
        price:{ 
            "week0":10,
            "week1":11,
            "week2":12,
            "week3":13,
            },
        capacity: 10,
            
    });
    shopItems.push({
        name:"Item2",
        price:{  
            "week0":15,
            "week1":16,
            "week2":17,
            "week3":18,
            },
        capacity: 20,
    });

var dailycap = generatedailycap(weeks[0][0],weeks[weeks.length-1][1],maxCapacity);
console.log(dailycap);

function generatedailycap(startdate,enddate,maxCapacity){
    var start = new Date(startdate);
    var end = new Date(enddate);
    var loop = new Date(start);
    var min = Math.ceil(0);
    var max = Math.floor(maxCapacity);
    var dailycap = {};
    while(loop <= end){
        var cap = Math.floor(Math.random() * (max - min + 1)) + min;
        var day = loop.toISOString().split('T')[0];
        dailycap[day] = cap;
        var newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
    return dailycap;
}