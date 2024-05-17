const Payment = require("../schema/payment.schema");
const HashMap = require("hashmap");
const axios = require("axios");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  async CreateCheckoutSession(req, res) {
    const course = await axios.get(
      `http://localhost:8001/course/course_by_id/${req.params.id}`
    );

    console.log(course);

    //creating session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      client_reference_id: course.data._id,

      line_items: [
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name: course.data.courseName,
              description: course.data.description,
              images: [course.data.imageUrl],
            },
            unit_amount: parseInt(course.data.price) * 100,
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      return_url: `http://localhost:5173/learner/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
  }

  //Get Checkout session

  async getCheckoutSession(req, res) {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    if (session.status === "complete") {
      const data = {
        course: session.client_reference_id,
        user: req.user.userId,
        userName: req.user.userEmail,
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
  }

  async createTransactionEntry(payload) {
    try {
      const session_id = await Payment.findOne({
        session_id: payload.session_id,
      });

      if (session_id) {
        console.log("duplicated transaction");
      } else {
        const payment = await Payment.create(payload);
      }
    } catch (error) {
      return { message: "Server error: " + error.message };
    }
  }

  async getTransactionHistory(req, token) {
    try {
      const allPayments = await Payment.find();

      //getting distinc course ids
      const courseIds = allPayments.map((payment) => payment.course);
      const setCoursIds = new Set(courseIds.map((id) => id.toString()));
      const distinctCourseIds = Array.from(setCoursIds);

      //calling get course by id function of the course microservice
      const courseDetailsPromises = distinctCourseIds.map(async (course) => {
        const courseDetailsResponse = await axios.get(
          `http://localhost:8001/course/course_by_id/${course}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return courseDetailsResponse.data;
      });

      const CourseDetails = await Promise.all(courseDetailsPromises);

      const courseNameLookup = {};
      for (const course of CourseDetails) {
        courseNameLookup[course._id] = course.courseName;
      }

      const updatedPayments = allPayments.map((payment) => {
        const courseName = courseNameLookup[payment.course];
        return courseName ? { payment, courseName } : payment;
      });

      if (updatedPayments) {
        return updatedPayments;
      } else {
        return { message: "No Payments done yet" };
      }
    } catch (error) {
      return { message: "Server error: " + error.message };
    }
  }
}

module.exports = PaymentService;
