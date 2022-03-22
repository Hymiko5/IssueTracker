// Do not change this file
require('dotenv').config();

const mongoose = require('mongoose');
const URI = process.env['MONGO_URI'];

main().catch(error => {
  console.log(error)
  throw new Error('Unable to Connect to Database')
  });

async function main(){
  await mongoose.connect(URI);
}

  const issueSchema = new mongoose.Schema({
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    assigned_to: { type: String, default: '' },
    status_text: { type: String, default: '' },
    project: { type: String, required: true },
    open: { type: Boolean, default: true }
  }, { timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' } });

  const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;

