import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateData } from '../middlewares/validation.middleware';
import { loginSchema } from '../dtos/requests/auth.requests';

const router = Router();

/**
 * @swagger
 * /api/token:
 *   post:
 *     summary: Generate a new authentication token
 *     description: Generates a new token for the given email address.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "foo@bar.com"
 *     responses:
 *       200:
 *         description: Token generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "abc123xyz"
 *       400:
 *         description: Email is required.
 */
router.post('/token', validateData(loginSchema), AuthController);

export default router;
