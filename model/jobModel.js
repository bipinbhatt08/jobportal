module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define("job", { //you user le garda table banxa ra users banxa not he user
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobDescription:{
        type: DataTypes.TEXT,
        allowNull: false,
      },
      salary:{
        type: DataTypes.STRING,
        allowNull : false
      },
      jobLevel:{
        type: DataTypes.STRING,
        allowNull:false
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'others'),
        allowNull: false,
      },
      requiredExperienceYr : {
        type: DataTypes.INTEGER,
        allowNull : false
      },
      requiredQualification: {
        type: DataTypes.STRING,
        allowNull : false
      },
      deadLine : {
        type:DataTypes.STRING,
        allowNull : false
      },
      requiredSkills:{
        type: DataTypes.STRING,
        allowNull : false
      },
      jobTime:{
        type: DataTypes.STRING,
        allowNull : false
      },
      workLocation:{
        type: DataTypes.ENUM('remote', 'physical', 'both'),
        allowNull: false,
      },
    })
    return Job;
  };