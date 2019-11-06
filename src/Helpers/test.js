form = require('./form');

const ditut = {
	"id": 1,
    "product_name": "dituuuut",
    "product_description": "hahah",
    "product_image" : "ditut.jpg",
    "id_category" : 4,
    "product_price" : 15000,
    "date_added" : "dqweq",
    "data_updated": "r23r23"
};

// dita = [3,54,25,13]
// let ditam = dita.map((e) =>{
// 	return e.toString(2);
// })
// let ditMap = ditut.map((e) => {
// 	return {
// 		id: item.id,
//         name: item.product_name,
//         description: item.product_description,
//         image: item.product_image,
//         category: item.id_category,
//         price: item.product_price,
//         date_add: item.date_added,
//         date_update: item.data_updated
// 	}
// });
// console.log("hallo");
// console.log(ditMap);
// console.log(form.format(ditut));


// let runApp = {
//     run: function(arg) { 
//         console.log(`It's running! ${arg}`);
//     },
//     init: function() {   
//          this.run("dita");
//     },
//     anot: () => {
//     	console.log("another function");
//     }

// };

// let runApp = {
//     run: (arg) => { 
//         console.log(`It's running! ${arg}`);
//     },
//     init: () => {   
//          this.run("dita");
//     },

// };



// runApp.init();
// runApp.anot();



const promize = new Promise ((resolve, reject) =>{
    resolve('good');
    // reject('bad');
})
.then(value =>{
    throw 'really bad';
    console.log(value); //return good

    return 1;
})
.then(value =>{
    console.log(value); //return 1, karena nilai sebelumnya mengembalikan value = 1
    return 2;
})
.catch(err =>{
    console.log(err);
});




// const promize1 = (req) => {
//     return new Promise((resolve, reject) => {
//         resolve(req.kelas);

// })
// };



// const promize2 = (req,dbPro ) => {
//     return new Promise((resolve, reject) => {
//         let nama = req.nama;
//         resolve(`Nama saya ${nama} dan sekarang kelas ${dbPro} `);

// })
// }

// const update = (req) => {
// promize1(req)
// .then (dbPro => {
//     let nama = dbPro
//     return nama;
// })
// .then (dbPro => {
//     promize2(req, dbPro)
//     .then(value2 => {
//         console.log(value2);
//     })
//     .catch (err2 =>{
//         console.log(err2);
//     })
// })
// .catch(err1 =>{
//     console.log(err1);
// })
// }



// let req = {
//     "nama" : "dita",
//     "kelas" : 12
// }

// update(req);