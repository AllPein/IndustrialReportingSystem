import express from 'express';
import authRoutes from './auth';
import itemRoutes from './item';
import groupRoutes from './group';
import cellRoutes from './cell';
import equipmentRoutes from './equipment';
import pavilionRoutes from './pavilion';
import userRoutes from './user';
import countries from '../../config/countries';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/item', itemRoutes);
router.use('/group', groupRoutes);
router.use('/cell', cellRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/pavilion', pavilionRoutes);
router.use('/user', userRoutes);
router.get('/country/:search', async (req, res) => {
  const search = req.params['search'];

  const result = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  res.send(result);
});

export default router;
