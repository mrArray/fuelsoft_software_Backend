// const bcrypt = require("bcryptjs");


//create tag
const createTag = async (fuelStationDbConnection, body) => {
    try {
      // const Tag = require('../../dbModel/tag/schema');
  
      const Tags = await fuelStationDbConnection.model('Tag');

      
      
      
      const Tag=body.Tag; 
      const Name=body.Name; 
      const Valid=body.Valid; 
      
      const tagPresent = await Tags.findOne({
        Tag
      });
      if (tagPresent) {
        throw new Error("Tag Already Exist");
      }
      const newTag = await new Tags({
        Tag,
        Name,
        Valid
      }).save();
      return newTag;
    } catch (error) {
      // console.log("createTag error", error);
      throw error;
    }
  };
  
  //get all tages
  
  const getAllTages = async fuelStationDbConnection => {
    try {
      const Tag = await fuelStationDbConnection.model("Tag");
      const tages = await Tag.find({});
      // console.log("getAllTags tages", tages);
  
      return tages;
    } catch (error) {
      // console.log("getAllTags error", error);
      throw error;
    }
  };
  
  //get tag by id view
  
  const getTagById = async fuelStationDbConnection => {
    try {
      const Tag = await fuelStationDbConnection.model("Tag");
      return Tag;
    } catch (error) {
      // console.log("getAllTags error", error);
      throw error;
    }
  };
  
  //get tag by id delete
  
  const getDeleteById = async fuelStationDbConnection => {
    try {
      const Tag = await fuelStationDbConnection.model("Tag");
      return Tag;
    } catch (error) {
      // console.log("getAllTags error", error);
      throw error;
    }
  };
  
  //get tag by id update
  
  const getUpdateById = async fuelStationDbConnection => {
    try {
      const Tag = await fuelStationDbConnection.model("Tag");
      return Tag;
    } catch (error) {
      // console.log("getAllTags error", error);
      throw error;
    }
  };
  
  
  
  module.exports = { getAllTages, createTag,getTagById,getDeleteById,getUpdateById };
  