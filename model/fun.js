const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Fun = sequelize.define('Fun', {
  AuthToken: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Source: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  FirstName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  MobileNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  City: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "Not Known",
  },
  State: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Country: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "India",
  },
  Course: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "Not Known",
  },
  Textb1: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Center: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  LeadSource: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "Paid - Google (DS)",
  },
  LeadName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "admission-mitsde",
  },
  LeadType: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "Online",
  },
  Field1: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Leadchannel: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  leadcampaign: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
});

module.exports = Fun;
