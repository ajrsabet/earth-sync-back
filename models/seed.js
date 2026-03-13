const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
const seedData = require('./seedData'); // The file you created earlier

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function seed() {
  // Seed users
  for (const user of seedData.users) {
    await db.collection('users').doc(user.id.toString()).set(user);
  }
  // Seed productModels
  for (const model of seedData.productModels) {
    await db.collection('productModels').doc(model.id.toString()).set(model);
  }
  // Seed productInstances
  for (const instance of seedData.productInstances) {
    await db.collection('productInstances').doc(instance.id.toString()).set(instance);
  }
  // Seed processesModels
  for (const process of seedData.processesModels) {
    await db.collection('processesModels').doc(process.id.toString()).set(process);
  }
  // Seed conditions
  for (const condition of seedData.conditions) {
    await db.collection('conditions').doc(condition.id.toString()).set(condition);
  }
  // Seed impacts
  for (const impact of seedData.impacts) {
    await db.collection('impacts').doc(impact.id.toString()).set(impact);
  }
  // Seed media
  for (const media of seedData.media) {
    await db.collection('media').doc(media.id.toString()).set(media);
  }
  // Seed ratings
  for (const rating of seedData.ratings) {
    await db.collection('ratings').add(rating);
  }
  // Seed edits
  for (const edit of seedData.edits) {
    await db.collection('edits').add(edit);
  }
  // Seed reviews
  for (const review of seedData.reviews) {
    await db.collection('reviews').add(review);
  }

  console.log('Database seeded!');
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});