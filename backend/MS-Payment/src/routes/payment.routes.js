const PaymentService = require("../services/payment.service");

module.exports = (app) => {
  const service = new PaymentService();
  const baseUrl = "/payment";

  app.post(`${baseUrl}/create-session/:id`, async (req, res) => {
    try {
      const result = await service.CreateCheckoutSession(req, res);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  });

  app.get(`${baseUrl}/session-status`, async (req, res) => {
    const result = await service.getCheckoutSession(req, res);
    res.send(result);
  });

  app.post(`${baseUrl}/create-entry`, async (req, res) => {
    const result = await service.createTransactionEntry(req, res);
    res.send(result);
  });

  app.get(`${baseUrl}/get-transactions`, async (req, res) => {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    const result = await service.getTransactionHistory(req.body, token);
    res.send(result);
  });
};
