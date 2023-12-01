const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// la sequelize yo config haru lag ani database connect gardey vaneko hae 
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("CONNECTED!!");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files 

db.users = require("./userModel.js")(sequelize, DataTypes);
db.jobs = require("./jobModel.js")(sequelize, DataTypes);
db.employers = require("./employerModel.js")(sequelize, DataTypes);
db.appliedJobs = require("./appliedJobModel.js")(sequelize, DataTypes);

//Relationship 
db.users.hasMany(db.appliedJobs)
db.appliedJobs.belongsTo(db.users)

db.employers.hasMany(db.jobs)
db.jobs.belongsTo(db.employers)

db.jobs.hasMany(db.appliedJobs);
db.appliedJobs.belongsTo(db.jobs);



db.sequelize.sync({ force: true }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;