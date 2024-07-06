const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 4010;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'Sales API',
      description: 'Sales API Information',
      version: '1.0.0',
      contact: {
        name: 'Amazing Developer',
      },
    },
    servers: [
      {
        url: 'http://localhost:4010',
      },
    ],
  },
  apis: ['./server.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Returns sales data
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: string
 *         required: true
 *         description: The number of days
 *       - in: query
 *         name: columns
 *         schema:
 *           type: string
 *         required: true
 *         description: The columns to include
 *       - in: query
 *         name: resources
 *         schema:
 *           type: string
 *         required: true
 *         description: The resources to include
 *     responses:
 *       200:
 *         description: A list of sales data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   date:
 *                     type: string
 *                     example: "2024-07-03"
 *                   amount:
 *                     type: number
 *                     example: 123.45
 */
app.get('/sales', (req, res) => {
  const { days, columns, resources } = req.query;

  if (!days || !columns || !resources) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const salesData = [
    { id: 1, date: '2024-07-01', amount: 100.00 },
    { id: 2, date: '2024-07-02', amount: 200.00 },
    { id: 3, date: '2024-07-03', amount: 300.00 },
  ];

  res.json(salesData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
