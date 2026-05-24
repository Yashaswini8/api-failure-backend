const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// Fake logs data
let logs = [

  {
    id: 1,
    endpoint: "/api/payment",
    status: 504,
    latency: 2340,
    message: "Gateway Timeout",
    time: "11:28 AM"
  },

  {
    id: 2,
    endpoint: "/api/cart",
    status: 200,
    latency: 180,
    message: "OK",
    time: "11:29 AM"
  }

];


// Dashboard API
app.get("/api/dashboard", (req, res) => {

  const totalRequests = logs.length;

  const failedRequests =
    logs.filter(log => log.status >= 500).length;

  const failureRate =
    (failedRequests / totalRequests) * 100;

  res.json({

    totalRequests,
    failedRequests,
    failureRate,

    aiExplanation:
      "Recent deployment caused payment gateway timeout issues.",

    recommendation:
      "Rollback deployment and increase timeout limit.",

    aiConfidence: "92%",

    logs

  });

});


// Alerts API
app.get("/api/alerts", (req, res) => {

  const alerts = logs.filter(
    log => log.status >= 500 || log.latency > 1000
  );

  res.json(alerts);

});


// Timeline API
app.get("/api/timeline", (req, res) => {

  const timeline = [

    {
      time: "11:24 AM",
      event: "Deployment completed"
    },

    {
      time: "11:27 AM",
      event: "Latency started increasing"
    },

    {
      time: "11:29 AM",
      event: "Checkout failures detected"
    },

    {
      time: "11:31 AM",
      event: "AI identified probable cause"
    }

  ];

  res.json(timeline);

});


// Fixes API
app.get("/api/fixes", (req, res) => {

  const fixes = [

    {
      title: "Rollback deployment",
      description:
        "Deployment may be causing timeout issue"
    },

    {
      title: "Increase timeout limit",
      description:
        "Increase API timeout to 30 seconds"
    },

    {
      title: "Check payment gateway",
      description:
        "Payment service may be slow"
    }

  ];

  res.json(fixes);

});


// Add log API
app.post("/api/log", (req, res) => {

  const newLog = req.body;

  logs.push(newLog);

  res.json({
    message: "New log added successfully"
  });

});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});