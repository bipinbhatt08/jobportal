module.exports = (sequelize, DataTypes) => {
    const Candidate = sequelize.define("candidate", { //you user le garda table banxa ra users banxa not he user
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address:{
        type: DataTypes.STRING,
        allowNull : false
      },
      profession:{
        type: DataTypes.STRING,
        allowNull : false
      },
      
      contactNo:{
        type: DataTypes.INTEGER,
        allowNull:false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      about:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      experience : {
        type: DataTypes.INTEGER,
        allowNull : false
      },
      qualification : {
        type:DataTypes.STRING,
        allowNull : false
      },
      offeredSalary:{
        type:DataTypes.INTEGER,
        allowNull : false
      },
      resume:{
        type: DataTypes.STRING,
        allowNull : true
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull : false
      }
    });
    return Candidate;
  };