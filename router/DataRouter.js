const DataController = require('../controller/DataController');
const router = require("express").Router();

router.post('/add-data', DataController.add);
router.put('/update', DataController.update);
router.delete('/delete/:id', DataController.delete);
router.get('/list', DataController.list);
router.get('/detail/:id', DataController.detail);

module.exports = router;
