import express from 'express';
import * as  cellController from '../../controller/cell';
import auth from '../../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(auth('manageItems'),  cellController.findMany)
  .post(auth('manageItems'),  cellController.create)
  .patch(auth('manageItems'),  cellController.create)
  
router.route('/:id').get(auth('manageItems'),  cellController.findUnique);

export default router;
