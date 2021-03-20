import express from 'express';
import authRoutes from './auth';
import itemRoutes from './item';
import groupRoutes from './group';
import cellRoutes from './cell';
import equipmentRoutes from './equipment';
import pavilionRoutes from './pavilion';
import userRoutes from './user';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/item', itemRoutes);
router.use('/group', groupRoutes);
router.use('/cell', cellRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/pavilion', pavilionRoutes);
router.use('/user', userRoutes);

export default router;
