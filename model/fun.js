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
    allowNull: true,
  },
  MobileNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  City: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "Not Known",
  },
  State: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Country: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "India",
  },
  Course: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "Not Known",
  },
  Textb1: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Center: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  LeadSource: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "Paid - Google (DS)",
  },
  LeadName: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "admission-mitsde",
  },
  LeadType: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: "Online",
  },
  Field1: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  Leadchannel: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  leadcampaign: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
});

module.exports = Fun;
