const express = require("express");
const cors = require("cors");
//const helmet = require("helmet");
const { contactValidationRules, validate } = require("./middleware/validate");
const contactController = require("./controllers/contactController");
const logger = require("./utils/logger");

const app = express();

//app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.post(
  "/api/contact",
  contactValidationRules(),
  validate,
  contactController.submitContact
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
