import express from 'express';
import { getWeatherForecast } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/forecast', getWeatherForecast);
//router.get('/history', getSearchHistory);

export default router;
