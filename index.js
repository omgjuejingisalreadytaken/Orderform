import "dotenv/config";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.listen(port, ()=>{
    console.log("Server running on port ", port);
    console.log(__dirname);
});

app.use(express.static(__dirname + "/public")); 

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    
    //create data

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


    //render

    res.render("index.ejs", {
        items:shopItems, 
        freeDelivery:freeDelivery, 
        deliveryCharge:deliveryCharge,
        maxCapacity:maxCapacity,
        weeks:weeks,
        dailycap:dailycap,
    });
});


