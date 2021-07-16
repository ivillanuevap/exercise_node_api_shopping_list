const ITEMS = [
    { id: 1, name: 'Milk' },
    { id: 2, name: 'Eggs' },
    { id: 3, name: 'Cheese' },
];
module.exports = {
    create: function (req, res) {
        let response = { "id": ITEMS.length+1 };
        if(req['body']['item']) {
            ITEMS.push({ id: response.id, name: req['body']['item'] });
        } else {
            response.id = 0;
            response.message = "Param item not found";
        }
        res.status(201).json(response);
    },

    getAll: function (req, res) {
        res.json(ITEMS);
    },

    getById: function (req, res) {
        let id = req['url'].replace('/', '');
        let result = ITEMS.find( item => item.id == id );
        if(result) {
            res.json(result);
        } else {
            res.json({id: 0, name: 'Not found'});
        }
    }
};
