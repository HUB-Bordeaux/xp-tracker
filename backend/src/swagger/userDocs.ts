/**
 * @swagger
 * /users:
 *   tags:
 *     name: Users
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: username
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.

 * /users/{id}:
 *   tags:
 *     name: Users
 *   put:
 *     summary: Update one user
 *     description: Update the infos of one user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: username
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *       400:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User ID not given"
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.

 *   delete:
 *     summary: Delete one user
 *     description: Delete the user selected
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       400:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User ID not given"
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.


 * /register:
 *   tags:
 *     name: Users
 *   post:
 *     summary: Register a user
 *     description: Register a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: username
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "token"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: username
 *       400:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Name and password are required"
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.
 *       409:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username already exists"


 * /login:
 *   tags:
 *     name: Users
 *   post:
 *     summary: Login as user
 *     description: Login as user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: username
 *               password:
 *                 type: string
 *                 example: password
 *     responses:
 *       200:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "token"
 *       400:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Username and password are required"
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.
*/