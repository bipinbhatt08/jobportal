module.exports = (sequelize, DataTypes) => {
    const Applied = sequelize.define("applied", { //you user le garda table banxa ra users banxa not he user
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    })
    return Applied;
  };