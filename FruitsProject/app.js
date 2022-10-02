
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    score: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});


const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    
    score: 34,
    review: "Pretty solid as a fruit."
});

// fruit.save();


// const orange = new Fruit ({
//     name: "Orange",
//     score: 4,
//     review: "Too sour for me"
// });

// const banana = new Fruit ({
//     name: "Banana",
//     score: 3,
//     review: "Weird Texture"
// });

// const kiwi = new Fruit ({
//     name: "Kiwi",
//     score: 10,
//     review: "The Best Fruit!"
// });

// Fruit.insertMany([kiwi, orange, banana], function (err) {
//     if (err){
//         console.log(err);
//     }
//     else{
//         console.log("Successfully added all the fruits")
//     }
// })




Fruit.find(function (err, fruits) {
    if (err){
        console.log(err);
    }else{

        
        fruits.forEach(fruit => {
            console.log(fruit.name);
        });
        
    }
});

Fruit.updateOne({_id: "633828835d143d3f7b58de4d"}, {name: "Peach"}, function (err) {
    if (err){
        console.log(err);
    }else{
        mongoose.connection.close();
        console.log("Succesffuly updated the document")
    }
})