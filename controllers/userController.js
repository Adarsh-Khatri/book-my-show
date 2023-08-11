const users = require("../data/users.js")


module.exports.login = async (req, res) => {
  let { username, password } = req.body;
  let user = users.find(user => user.username === username);

  console.log(req.body);

  if (!user) {
    return res.status(404).send("Username Not Found")
  }

  if (user.password != password) {
    return res.status(404).send("Incorrect Password")
  }


  let { userId } = user;
  return res.status(200).send(userId);
}


module.exports.getUserById = (req, res) => {
  let { userId } = req.params;

  let user = users.find(user => user.userId === userId);

  if (!user) {
    return res.status(404).send("User Not Found By Id")
  }

  return res.status(200).json(user)
}


module.exports.updateUserById = (req, res) => {

  let { userId } = req.params;

  let userIndex = users.findIndex(user => user.userId === userId);

  if (userIndex < 0) {
    return res.status(404).send("User Not Found By Id");
  }

  let deletedUsers = users.splice(userIndex, 1, { userId, ...req.body });

  console.log('DELETED USERS: ', deletedUsers);

  return res.status(200).json(req.body);

}
