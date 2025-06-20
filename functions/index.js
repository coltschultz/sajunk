const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submissions
app.post('/api/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Log form data (replace with Firestore or other storage logic)
  console.log('Form submission:', { name, email, message });

  // Example: Save to Firestore (uncomment and configure Firestore if needed)
  /*
  const admin = require('firebase-admin');
  admin.initializeApp();
  const db = admin.firestore();
  db.collection('submissions').add({ name, email, message, timestamp: admin.firestore.FieldValue.serverTimestamp() })
    .then(() => {
      res.status(200).json({ message: 'Form submitted successfully' });
    })
    .catch((error) => {
      console.error('Error saving to Firestore:', error);
      res.status(500).json({ error: 'Failed to save form data' });
    });
  */

  // For now, send a success response
  res.status(200).json({ message: 'Form submitted successfully' });
});

// Export the Express app as a Cloud Function
exports.app = functions.https.onRequest(app);