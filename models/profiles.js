'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Profiles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Profiles.belongsTo(models.Users, { foreignKey: 'user_id', targetKey: 'id' })
        }
    };
    Profiles.init({
        user_id: DataTypes.INTEGER,
        fullName: DataTypes.STRING,
        gender: DataTypes.ENUM('male', 'female'),
        age: DataTypes.INTEGER,
        profilePicture: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Profiles',
    });
    return Profiles;
};