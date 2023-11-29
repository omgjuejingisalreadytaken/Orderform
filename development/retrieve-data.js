import pg from "pg";

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"LEShop",
    password:"Stupidpp1esuck",
    port:5432,
});



// const execute = async (query) => {
//     try {
//         await db.connect();     // gets connection
//         await db.query(query);  // sends queries
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     } finally {
//         await db.end();         // closes connection
//     }
// };



var outcome;
const retriveWeeks = `SELECT * FROM "weeks"`;

db.connect();
db.query(retriveWeeks, (err,res)=>{
    if(err){
        console.error(err.stack);
    }else {
        outcome = res.rows;
    }
});
db.end();


console.log("test");
console.log(outcome);