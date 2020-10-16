// nedb initialisierung
const Datastore = require('nedb');
const db = new Datastore({filename: '.data/orders.db', autoload: true });

class Order{
    constructor(pizzaName, orderedBy){
        this.orderedBy = orderedBy;
        this.pizzaName = pizzaName;
        this.orderDate = new Date();
        this.state = "OK";
    }
}

class OrderStore {
    constructor() {
    }

    add(pizzaName, orderedBy, callback) {
        let order = new Order(pizzaName, orderedBy);
        db.insert(order, function(err, doc) {
            console.log('Inserted', doc['pizzaName'], 'with ID', doc['_id']);
            if(callback){
                callback(err,doc);
            }
        });
    }


    delete(id, callback) {

        db.update({_id: id},{$set: {"state": "DELETED"}}, {returnUpdatedDocs: true}, function(err, numDocs, doc){
               callback(err,doc);
        });
    }

    get(id, callback) {
        db.findOne({_id: id}, function (err, doc) {
            console.log('Found', doc);
            callback(err, doc);
        });
    }

    all(callback) {
        db.find({}, function(err,docs){
            callback(err,docs);
        });
    }
}

module.exports = new OrderStore();
