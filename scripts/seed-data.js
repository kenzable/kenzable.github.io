const fs = require('fs');
const { promisify } = require('util');
const { pipeline, Writable } = require('stream');
const csv = require('csv-parser'); // eslint-disable-line
const firebase = require('firebase');
const { firebase: firebaseConfig } = require('../config.json');

const asyncPipeline = promisify(pipeline);
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

async function writeToDb(data, encoding, callback) {
  try {
    const { id, name, description, price, type } = data;
    const item = { id, name, price: parseInt(price, 10), type, status: 'A' };
    if (description) item.description = description;
    await firestore
      .collection(type)
      .doc(id)
      .set(item);
    callback();
  } catch (err) {
    console.error('An error occured while writing data to DB.');
    throw err;
  }
}

async function run() {
  await asyncPipeline([
    fs.createReadStream('./item-data.csv'),
    csv(),
    new Writable({
      objectMode: true,
      write: writeToDb,
    }),
  ]);
  console.log('Successfully seeded data.');
}

run()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
