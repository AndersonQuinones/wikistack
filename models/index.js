const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false
});

const Page = db.define("page", {
  name:{
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM("open", "close")
  },
}
, {
  hooks: {
    beforeValidate: function(page) {
      page.slug= page.title.replace(/\s+/g, '_').replace(/\W/g, '')
    }
  }
})

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false // name MUST have a value
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db,
  Page,
  User
};


