import express from 'express';
import * as  equipmentController from '../../controller/equipment';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(auth('manageItems'),  equipmentController.findMany)
  .post(auth('manageItems'),  equipmentController.create)
  .patch(auth('manageItems'),  equipmentController.update)
  
router.route('/:id').get(auth('manageItems'),  equipmentController.findUnique);

export default router;
