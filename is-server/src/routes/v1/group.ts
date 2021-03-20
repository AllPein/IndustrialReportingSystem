import express from 'express';
import * as groupController from '../../controller/group';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(auth('manageItems'), groupController.findMany)
  .post(auth('manageItems'), groupController.create)
  .patch(auth('manageItems'), groupController.create)
  
router.route('/:id').get(auth('manageItems'), groupController.findUnique);

export default router;
