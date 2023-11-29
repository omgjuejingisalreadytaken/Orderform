import pg from "pg";

// const db = new pg.Client({
//     user:"postgres",
//     host:"localhost",
//     database:"LEShop",
//     password:"Stupidpp1esuck",
//     port:5432,
// });

const db = new pg.Client({
    user:"jjpgsql_user",
    host:"postgres://jjpgsql_user:PGtECsKVtkVabUFwXK0fnlenW90xfNiG@dpg-cljb17q4ed1s73c7odu0-a.singapore-postgres.render.com/jjpgsql",
    database:"jjpgsql",
    password:"PGtECsKVtkVabUFwXK0fnlenW90xfNiGk",
    port:5432,
});


const execute = async (query) => {
    try {
        await db.connect();     // gets connection
        await db.query(query);  // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await db.end();         // closes connection
    }
};



/************************queries******************************* */



const createTableWeeks = `
    CREATE TABLE "weeks" (
	"start_date" DATE NOT NULL PRIMARY KEY,
	"end_date" DATE NOT NULL
    );
`;



const insertWeeks = 
`
    INSERT INTO "weeks"                    
    ("start_date", "end_date")
    VALUES 
    ('2024-01-12','2024-01-18'),
    ('2024-01-19','2024-01-25'),
    ('2024-01-26','2024-02-01'),
    ('2024-02-02','2024-02-09');
`;



const createTableItems = `
    CREATE TABLE "items" (
	"item_number" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
	"price" INTEGER ARRAY NOT NULL,
    "capacity" INTEGER
    );
`;



const insertItems = 
`
    INSERT INTO "items"                    
    ("name", "price", "capacity")
    VALUES 
    ('Item1','{10,11,12,13}', 10),
    ('Item2','{15,16,17,17}', 20);
`;




const queryResponse = [
    [createTableWeeks, "Weeks table created"],
    [insertWeeks, "Weeks table populated"],
    [createTableItems, "Items table created"],
    [insertItems, "Items table populated"],
];


db.connect();
for (let i = 0; i < queryResponse.length; i++) {
    db.query(queryResponse[i][0], (err,res)=>{
        if(err){
            console.error(err.stack);
        }else {
            console.log(queryResponse[i][1]);
        }
        if(i==queryResponse.length-1){
            db.end();
        }          
    });
}



