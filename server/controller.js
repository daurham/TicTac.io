const model = require('./model');
const io = require('./socket');


const getData = async (req, res) => {
  let data = await model.getData();
  // io.getIO().emit('placements', data);
  console.log('data: ', data);
  res.send(data);
};
const postData = (req, res) => {
  model.postData();
}; 
const updateData = async (req, res) => {
  let data = req.body;
  console.log(data);
  let result = await model.updateData(data);
  // io.getIO().emit('update');
  res.status(203).send(result);
};
const deleteData = (req, res) => {
  model.deleteData();
};




// const getData = (req, res) => {
//   model.getData();
// };
// const postData = (req, res) => {
//   model.postData();
// };
// const updateData = (req, res) => {
//   model.updateData();
// };
// const deleteData = (req, res) => {
//   model.deleteData();
// };
module.exports = { getData, postData, updateData, deleteData };