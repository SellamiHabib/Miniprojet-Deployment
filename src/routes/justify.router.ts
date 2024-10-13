import { Router } from 'express';
import { justifyTextController } from '../controllers/justify.controller';
import { rateLimitMiddleware } from '../middlewares/rateLimit.middleware';
import { validateData, validateHeaders } from '../middlewares/validation.middleware';
import { justifyRequestBodySchema, justifyTextRequestHeadersSchema } from '../dtos/requests/justify.requests';
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
 *         text/plain:
 *            schema:
 *              type: string
 *              example: "Your text here."
 *              required: true
 *
 *
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
router.post(
  '/justify',
  validateData(justifyRequestBodySchema),
  validateHeaders(justifyTextRequestHeadersSchema),

  authMiddleware,

  rateLimitMiddleware,

  justifyTextController,
);

export default router;
