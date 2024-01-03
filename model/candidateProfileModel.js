module.exports = (sequelize, DataTypes) => {
    const Candidate = sequelize.define("candidate", { //you user le garda table banxa ra users banxa not he user
      name: {
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
        type: DataTypes.STRING,
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
      skills:{
        type: DataTypes.STRING,
        allowNull: false,
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
      profile:{
        type: DataTypes.STRING,
        allowNull : true
      },
      age:{
        type: DataTypes.INTEGER,
        allowNull : true
      },
      gender:{
        type: DataTypes.STRING,
        allowNull : true
      },
      level:{
        type: DataTypes.STRING,
        allowNull : true
      },
      experiencePosition:{
        type: DataTypes.STRING,
        allowNull : true
      },
      organization:{
        type: DataTypes.STRING,
        allowNull : true
      },
      experienceDescription:{
        type: DataTypes.STRING,
        allowNull : true
      },
      college:{
        type: DataTypes.STRING,
        allowNull : true
      },
      educationDescription:{
        type: DataTypes.STRING,
        allowNull : true
      },
      facebook:{
        type: DataTypes.STRING,
        allowNull : true
      },
      instagram:{
        type: DataTypes.STRING,
        allowNull : true
      },
      github:{
        type: DataTypes.STRING,
        allowNull : true
      },
      linkedin:{
        type: DataTypes.STRING,
        allowNull : true
      },

      
    });
    return Candidate;
  };