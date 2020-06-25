const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const models = require("./models");
const user = require("./routes/user");
const wiki = require("./routes/wiki");

const app = express();

//PLUG IN ROUTES

//LOGGING MIDDLEWARE
app.use(morgan("dev"));

//STATIC MIDDLEWARE
app.use(express.static(__dirname + "/public"));

//BODY PARSING MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/user", user);
app.use("/wiki", wiki);

app.get("/", (req, res, next) => {
  try {
    res.redirect("/wiki");
  } catch (error) {
    next(error);
  }
});

models.db.authenticate().then(() => {
  console.log("connected to the database");
});

const PORT = 3000;

const init = async () => {
  await models.db.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
