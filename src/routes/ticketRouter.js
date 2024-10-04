import { Router } from 'express';
import TicketController from '../controller/TicketController.js';

export const router = Router();

router.get('/', TicketController.getTickets)
router.post('/', TicketController.createTicket)