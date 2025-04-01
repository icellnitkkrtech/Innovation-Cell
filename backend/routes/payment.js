const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { auth, adminAuth } = require('../middleware/auth');

// User payment routes
router.post('/', auth, paymentController.createPayment);
router.get('/history', auth, paymentController.getPaymentHistory);
router.get('/:id', auth, paymentController.getPaymentById);
router.get('/:id/receipt', auth, paymentController.getPaymentReceipt);
router.post('/:id/refund-request', auth, paymentController.requestRefund);

// Admin payment routes
router.put('/:id/status', [auth, adminAuth], paymentController.updatePaymentStatus);
router.post('/:id/process-refund', [auth, adminAuth], paymentController.processRefund);

module.exports = router; 