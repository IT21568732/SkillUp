const Payment = require("../model/paymentModel");
const axios = require("axios");

// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51PFbFKSEaCzE8vGJv2U7OaQl242FtQNSrdfBQ0PIIRq3wShnrGrW69Tr8uBMv8dP7TIEPC9PzJW7fyIrxzUMA6Mk00V12I0ggt"
);

exports.CreateCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    client_reference_id: req.body._id,

    line_items: [
      {
        price_data: {
          currency: "lkr",
          product_data: {
            name: req.body.name,
            description: req.body.description,
            images: [req.body.image],
          },
          unit_amount: req.body.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `http://localhost:8003/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ clientSecret: session.client_secret });
};

exports.getCheckoutSession = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  if (session.status === "complete") {
    const data = {
      course: session.client_reference_id,
      user: req.user.id,
      userName: req.user.name,
      price: session.amount_total / 100,
      session_id: req.query.session_id,
    };

    this.createTransactionEntry(data);
  }

  return {
    status: session.status,
    course_id: session.client_reference_id,
    price: session.amount_total,
  };
};
