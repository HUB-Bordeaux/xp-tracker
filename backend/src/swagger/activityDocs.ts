/**
 * @swagger
 * /activities:
 *   tags:
 *     name: Activities
 *   get:
 *     summary: Get all activities
 *     description: Retrieve a list of activities
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of activities.
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
 *                   name:
 *                     type: string
 *                     example: name
 *                   xpOrganisation:
 *                     type: number
 *                     example: 2
 *                   xpParticipation:
 *                     type: number
 *                     example: 1
 *                   category:
 *                     type: string
 *                     example: talk
 *                   students:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 1
 *                         image:
 *                           type: string
 *                           example: <bytes>
 *                         imageType:
 *                           type: string
 *                           example: png
 *                         firstname:
 *                           type: string
 *                           example: firstname
 *                         lastname:
 *                           type: string
 *                           example: lastname
 *                         email:
 *                           type: string
 *                           example: firstname.lastname@epitech.eu
 *                         promotion:
 *                           type: number
 *                           example: 2028
 *                         role:
 *                           type: string
 *                           example: participant
 *                         present:
 *                           type: boolean
 *                           example: true
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.
 *   post:
 *     summary: Create an activity
 *     description: Create an activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: name
 *               xpOrganisation:
 *                 type: number
 *                 example: 2
 *               xpParticipation:
 *                 type: number
 *                 example: 1
 *               category:
 *                 type: string
 *                 example: talk
 *               students:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studentId:
 *                       type: number
 *                       example: 1
 *                     role:
 *                       type: string
 *                       example: participant
 *                     present:
 *                       type: boolean
 *                       example: true
 *     responses:
 *       200:
 *         description: Activity created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: name
 *                 xpOrganisation:
 *                   type: number
 *                   example: 2
 *                 xpParticipation:
 *                   type: number
 *                   example: 1
 *                 category:
 *                   type: string
 *                   example: talk
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       studentId:
 *                         type: number
 *                         example: 1
 *                       role:
 *                         type: string
 *                         example: participant
 *                       present:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.

 * /activities/hackathons:
 *   tags:
 *     name: Activities
 *   get:
 *     summary: Get all hackathons
 *     description: Retrieve a list of hackathons
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of hackathons.
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
 *                   name:
 *                     type: string
 *                     example: name
 *                   xpOrganisation:
 *                     type: number
 *                     example: 2
 *                   xpParticipation:
 *                     type: number
 *                     example: 1
 *                   category:
 *                     type: string
 *                     example: talk
 *                   students:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 1
 *                         image:
 *                           type: string
 *                           example: <bytes>
 *                         imageType:
 *                           type: string
 *                           example: png
 *                         firstname:
 *                           type: string
 *                           example: firstname
 *                         lastname:
 *                           type: string
 *                           example: lastname
 *                         email:
 *                           type: string
 *                           example: firstname.lastname@epitech.eu
 *                         promotion:
 *                           type: number
 *                           example: 2028
 *                         role:
 *                           type: string
 *                           example: participant
 *                         present:
 *                           type: boolean
 *                           example: true
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.

 * /activities/talks:
 *   tags:
 *     name: Activities
 *   get:
 *     summary: Get all talks
 *     description: Retrieve a list of talks
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of talks.
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
 *                   name:
 *                     type: string
 *                     example: name
 *                   xpOrganisation:
 *                     type: number
 *                     example: 2
 *                   xpParticipation:
 *                     type: number
 *                     example: 1
 *                   category:
 *                     type: string
 *                     example: talk
 *                   students:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 1
 *                         image:
 *                           type: string
 *                           example: <bytes>
 *                         imageType:
 *                           type: string
 *                           example: png
 *                         firstname:
 *                           type: string
 *                           example: firstname
 *                         lastname:
 *                           type: string
 *                           example: lastname
 *                         email:
 *                           type: string
 *                           example: firstname.lastname@epitech.eu
 *                         promotion:
 *                           type: number
 *                           example: 2028
 *                         role:
 *                           type: string
 *                           example: participant
 *                         present:
 *                           type: boolean
 *                           example: true
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.

 * /activities/usergroups:
 *   tags:
 *     name: Activities
 *   get:
 *     summary: Get all usergroups
 *     description: Retrieve a list of usergroups
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of usergroups.
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
 *                   name:
 *                     type: string
 *                     example: name
 *                   xpOrganisation:
 *                     type: number
 *                     example: 2
 *                   xpParticipation:
 *                     type: number
 *                     example: 1
 *                   category:
 *                     type: string
 *                     example: talk
 *                   students:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 1
 *                         image:
 *                           type: string
 *                           example: <bytes>
 *                         imageType:
 *                           type: string
 *                           example: png
 *                         firstname:
 *                           type: string
 *                           example: firstname
 *                         lastname:
 *                           type: string
 *                           example: lastname
 *                         email:
 *                           type: string
 *                           example: firstname.lastname@epitech.eu
 *                         promotion:
 *                           type: number
 *                           example: 2028
 *                         role:
 *                           type: string
 *                           example: participant
 *                         present:
 *                           type: boolean
 *                           example: true
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.

 * /activities/freeprojects:
 *   tags:
 *     name: Activities
 *   get:
 *     summary: Get all freeprojects
 *     description: Retrieve a list of freeprojects
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of freeprojects.
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
 *                   name:
 *                     type: string
 *                     example: name
 *                   xpOrganisation:
 *                     type: number
 *                     example: 2
 *                   xpParticipation:
 *                     type: number
 *                     example: 1
 *                   category:
 *                     type: string
 *                     example: talk
 *                   students:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 1
 *                         image:
 *                           type: string
 *                           example: <bytes>
 *                         imageType:
 *                           type: string
 *                           example: png
 *                         firstname:
 *                           type: string
 *                           example: firstname
 *                         lastname:
 *                           type: string
 *                           example: lastname
 *                         email:
 *                           type: string
 *                           example: firstname.lastname@epitech.eu
 *                         promotion:
 *                           type: number
 *                           example: 2028
 *                         role:
 *                           type: string
 *                           example: participant
 *                         present:
 *                           type: boolean
 *                           example: true
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.


 * /activities/{id}:
 *   tags:
 *     name: Activities
 *   get:
 *     summary: Retreive one activity
 *     description: Retreive one activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activity selected
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
 *                   name:
 *                     type: string
 *                     example: name
 *                   xpOrganisation:
 *                     type: number
 *                     example: 2
 *                   xpParticipation:
 *                     type: number
 *                     example: 1
 *                   category:
 *                     type: string
 *                     example: talk
 *                   students:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         studentId:
 *                           type: number
 *                           example: 1
 *                         role:
 *                           type: string
 *                           example: participant
 *                         present:
 *                           type: boolean
 *                           example: true
 *       400:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Activity ID not given"
 *       401:
 *         description: Unauthorized. Missing or invalid Bearer token.
 *       404:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Activity not found"
 *   put:
 *     summary: Update one activity
 *     description: Update one activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: name
 *               xpOrganisation:
 *                 type: number
 *                 example: 2
 *               xpParticipation:
 *                 type: number
 *                 example: 1
 *               category:
 *                 type: string
 *                 example: talk
 *               students:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studentId:
 *                       type: number
 *                       example: 1
 *                     role:
 *                       type: string
 *                       example: participant
 *                     present:
 *                       type: boolean
 *                       example: true
 *     responses:
 *       200:
 *         description: Activity selected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Activity updated successfully"
 *       400:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Activity ID not given"
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
 *                   example: "Activity not found"
 *   delete:
 *     summary: Delete one activity
 *     description: Delete one activity
 *     tags: [Activities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activity selected
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Activity deleted successfully"
 *       400:
 *         description: Request returned message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Activity ID not given"
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
 *                   example: "Activity not found"
 */