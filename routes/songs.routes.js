const {Router} = require('express')
const controller = require('../controllers/song')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', auth, controller.getAll)
router.post('/', auth, controller.create)
router.get('/:id', auth, controller.getById)
router.patch('', auth, controller.update)
router.delete('/:id', auth, controller.delete)

module.exports = router
