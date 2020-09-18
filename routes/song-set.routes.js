const {Router} = require('express')
const controller = require('../controllers/song-set')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.get('/', auth, controller.getAll)
router.post('/', auth, controller.create)
router.patch('', auth, controller.update)
router.delete('/:id', auth, controller.delete)

module.exports = router
