/**
 * @swagger
 * /students:
 *   tags:
 *     name: Students
 *   get:
 *     summary: Get all students
 *     description: Retrieve a list of students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of students.
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
 *                   image:
 *                     type: string
 *                     example: <bytes>
 *                   imageType:
 *                     type: string
 *                     example: png
 *                   firstname:
 *                     type: string
 *                     example: firstname
 *                   lastname:
 *                     type: string
 *                     example: lastname
 *                   email:
 *                     type: string
 *                     example: firstname.lastname@epitech.eu
 *                   promotion:
 *                     type: number
 *                     example: 2027
 *                   activities:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: name
 *                       xpOrganisation:
 *                         type: number
 *                         example: 2
 *                       xpParticipation:
 *                         type: number
 *                         example: 1
 *                       category:
 *                         type: string
 *                         example: talk
 *                       role:
 *                         type: string
 *                         example: participant
 *                       present:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.
 *   post:
 *     summary: Create a student
 *     description: Create a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: firstname
 *               lastname:
 *                 type: string
 *                 example: lastname
 *               email:
 *                 type: string
 *                 example: lastname
 *               promo:
 *                 type: number
 *                 example: 2027
 *               image:
 *                 type: string
 *                 example: <bytes>
 *     responses:
 *       200:
 *         description: A list of students.
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
 *                   image:
 *                     type: string
 *                     example: <bytes>
 *                   imageType:
 *                     type: string
 *                     example: png
 *                   firstname:
 *                     type: string
 *                     example: firstname
 *                   lastname:
 *                     type: string
 *                     example: lastname
 *                   email:
 *                     type: string
 *                     example: firstname.lastname@epitech.eu
 *                   promotion:
 *                     type: number
 *                     example: 2027
 *                   activities:
 *                     type: array
 *       400:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student ID not given"
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.

 * /students/{id}:
 *   get:
 *     summary: Update a student
 *     description: Update a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student selected
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
 *                   image:
 *                     type: string
 *                     example: <bytes>
 *                   imageType:
 *                     type: string
 *                     example: png
 *                   firstname:
 *                     type: string
 *                     example: firstname
 *                   lastname:
 *                     type: string
 *                     example: lastname
 *                   email:
 *                     type: string
 *                     example: firstname.lastname@epitech.eu
 *                   promotion:
 *                     type: number
 *                     example: 2027
 *                   activities:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: name
 *                       xpOrganisation:
 *                         type: number
 *                         example: 2
 *                       xpParticipation:
 *                         type: number
 *                         example: 1
 *                       category:
 *                         type: string
 *                         example: talk
 *                       role:
 *                         type: string
 *                         example: participant
 *                       present:
 *                         type: boolean
 *                         example: true
 *       400:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student ID not given"
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.
 *       404:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student not found"

 *   put:
 *     summary: Update a student
 *     description: Update a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: firstname
 *               lastname:
 *                 type: string
 *                 example: lastname
 *               email:
 *                 type: string
 *                 example: lastname
 *               promo:
 *                 type: number
 *                 example: 2027
 *               image:
 *                 type: string
 *                 example: <bytes>
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
 *                   example: "Student updated successfully"
 *       400:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student ID not given"
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.
 *       404:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student not found"

 *   delete:
 *     summary: Update a student
 *     description: Update a student
 *     tags: [Students]
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
 *                   example: "Student deleted successfully"
 *       400:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student ID not given"
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.
 *       404:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student not found"
 */