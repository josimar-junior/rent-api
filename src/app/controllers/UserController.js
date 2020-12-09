/* eslint-disable class-methods-use-this */
class UserController {
  findAll(req, res) {
    const users = [
      { name: 'Josimar', email: 'josimar@gmail.com' },
    ];
    return res.status(200).json(users);
  }

  save(req, res) {
    return res.status(201).json(req.body);
  }
}

export default new UserController();
