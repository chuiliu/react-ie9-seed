const Mock = require('mockjs');

const proxy = {
  'GET /api/index': (req, res) => {
    const data = Mock.mock({
      'id|1-1000': 0
    });
    return res.json({
      code: 0,
      data: data
    });
  },
  'POST /api/login/account': (req, res) => {
    const { password, username } = req.body;
    if (password === '888888' && username === 'admin') {
      return res.json({
        status: 'ok',
        code: 0,
        token: "sdfsdfsdfdsf",
        data: {
          id: 1,
          username: 'kenny',
          sex: 6
        }
      });
    } else {
      return res.status(403).json({
        status: 'error',
        code: 403
      });
    }
  }
};

module.exports = proxy;
