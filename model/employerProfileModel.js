module.exports = (sequelize, DataTypes) => {
    const Employer = sequelize.define("employer", { //you user le garda table banxa ra users banxa not he user
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location:{
        type: DataTypes.STRING,
        allowNull : false
      },
      employerCategory:{
        type: DataTypes.STRING,
        allowNull:false
      },
      contactNo:{
        type: DataTypes.INTEGER,
        allowNull:false
      },
      website : {
        type: DataTypes.STRING,
        allowNull : false
      },
      about : {
        type:DataTypes.TEXT,
        allowNull : false
      },
    });
    return Employer;
  };