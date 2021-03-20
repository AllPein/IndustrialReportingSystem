import express from 'express';
import * as itemController from '../../controller/item';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(auth('manageItems'), itemController.findMany)
  .post(auth('manageItems'), itemController.create)
  .patch(auth('manageItems'), itemController.create)
  
router.route('/:id').get(auth('manageItems'), itemController.findUnique);

export default router;
