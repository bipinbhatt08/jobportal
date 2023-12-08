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
db.employers = require("./employerProfileModel.js")(sequelize, DataTypes);
db.candidates = require("./candidateProfileModel.js")(sequelize, DataTypes);
db.appliedJobs = require("./appliedJobModel.js")(sequelize, DataTypes);

// Relationships
db.users.hasOne(db.employers, { foreignKey: 'userId', onDelete: 'CASCADE', constraints: false });
db.employers.belongsTo(db.users, { foreignKey: 'userId', onDelete: 'CASCADE', constraints: false });

db.users.hasOne(db.candidates, { foreignKey: 'userId', onDelete: 'CASCADE', constraints: false });
db.candidates.belongsTo(db.users, { foreignKey: 'userId', onDelete: 'CASCADE', constraints: false });

db.employers.hasMany(db.jobs, { as: 'employer', foreignKey: 'employerId' });
db.jobs.belongsTo(db.employers, { as: 'employer', foreignKey: 'employerId' });

db.candidates.hasMany(db.appliedJobs, { foreignKey: 'userId', onDelete: 'CASCADE', constraints: false });
db.appliedJobs.belongsTo(db.candidates, { foreignKey: 'userId', onDelete: 'CASCADE', constraints: false });




db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;