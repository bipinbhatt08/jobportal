module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", { //you user le garda table banxa ra users banxa not he user
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull : false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull:false
      },
      otp: {
        type: DataTypes.STRING,
        allowNull:true
      },
      otpGeneratedTime: {
        type: DataTypes.STRING,
        allowNull:true
      },
      role : {
        type: DataTypes.STRING,
        allowNull : false
      },
      
    },);
    return User;
  };