import { Router } from 'express';
import { justifyTextController } from '../controllers/justify.controller';
import { rateLimitMiddleware } from '../middlewares/rateLimit.middleware';
import { validateData } from '../middlewares/validation.middleware';
import { justifyRequestSchema } from '../dtos/requests/justify.requests';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @swagger
 * /api/justify:
 *   post:
 *     summary: Justify the provided text
 *     description: Justifies a block of text to 80 characters per line.
 *     tags: [Justify]
 *     security:
 *      - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                text:
 *                  type: string
 *                  description: The text to justify.
 *                  example: "Your text here."
 *     responses:
 *       200:
 *         description: Text justified successfully.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Your justified text here."
 *       400:
 *         description: No text provided.
 *       401:
 *         description: Unauthorized, invalid token.
 *       402:
 *         description: Rate limit exceeded.
 */
router.post('/justify', validateData(justifyRequestSchema),
  authMiddleware,
  rateLimitMiddleware, justifyTextController);

export default router;
