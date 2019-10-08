const moment = require('moment');
const aws = require('aws-sdk');
const s3 = new aws.S3();
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define('Photos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    key: DataTypes.STRING,
    url: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },    
    created: {
      type: DataTypes.DATE,
      defaultValue: moment().format()
    },
    modified: {
      type: DataTypes.DATE,
      defaultValue: moment().format()
    },
  });

  photo.beforeCreate((photo, options) => {
    if(!photo.url)
      return photo.url = `${process.env.APP_URL}/uploads/${photo.key}`;
  });

  /*photo.beforeBulkDestroy((options) => {
    options.individualHooks = true;
    return options;
  });*/

  photo.beforeDestroy((photo, options) => {
    if(process.env.STORAGE_TYPE === 's3') {
      return s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: photo.key,
      }).promise();
    }else {
      return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', photo.key));
    }
  });

  photo.associate = (models) => {
    photo.belongsTo(models.Users, {
      foreignKey: 'user_id',
    });
  };

  return photo;
}