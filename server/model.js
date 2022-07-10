const { Ninth } = require('./db');

const getData = async () => {
  let result = await Ninth.find({});
  return result;
};
const postData = () => {
  db.query();
};
const updateData = async (data) => {
  console.log('update:', data.newData)
  let result = await Ninth.updateOne(data.newData);
  return result;
};
const deleteData = () => {
  db.query();
};

/* 
const getData = () => {
  db.query();
};
const postData = () => {
  db.query();
};
const updateData = () => {
  db.query();
};
const deleteData = () => {
  db.query();
};
 */
module.exports = { getData, postData, updateData, deleteData };