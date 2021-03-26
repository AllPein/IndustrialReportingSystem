import express from 'express';
import * as  pavilionController from '../../controller/pavilion';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(auth('manageItems'),  pavilionController.findMany)
  .post(auth('manageItems'),  pavilionController.create)
  .patch(auth('manageItems'),  pavilionController.update)
  
router.route('/:id').get(auth('manageItems'),  pavilionController.findUnique);

export default router;
