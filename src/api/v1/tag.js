const { getConnection } = require("../../connectionManager");
const tagService = require("../../service/tag");
// const userService = require("../../service/user");

const tagSignUp = async (req, res) => {
  try {
    const dbConnection = getConnection();
    // console.log("tagSignUp dbConnection", dbConnection.name);
    const tag = await tagService.createTag(dbConnection, req.body);
    const station = req.headers.fuel_station;

    res.status(200).json(
      { 
        success: true,
        station: station,
        tag:tag,
      }
    );
  } catch (err) {
    // console.log("tagSignUp error", err);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchAll = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const tages = await tagService.getAllTages(dbConnection);

    const station = req.headers.fuel_station;
    // console.log(dbConnection)

    const custome_tag = [];
    const tagObj = {}
    for (let i = 0; i < tages.length; i++) {
      
      tagObj.id = tages[i]._id ;
      tagObj.station = station;
      
      tagObj.Tag = tages[i].Tag ;
      tagObj.Name = tages[i].Name ;
      tagObj.Valid = tages[i].Valid ;
      tagObj.createdAt = tages[i].createdAt ;
      tagObj.updatedAt = tages[i].updatedAt ;
      // tagObj.__v = tages[i].__v ;

      custome_tag.push({ ...tagObj });
    }

    res.status(200).json({
      success:true,
      tages:custome_tag

    });

  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const tages = await tagService.getTagById(dbConnection);
    const singleTag= await tages.findById(req.params.tagId);

    res.status(200).json(
      { success: true, 
       tages: singleTag,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const tages = await tagService.getDeleteById(dbConnection);
    const removeTag= await tages.remove({_id:req.params.tagId});

    res.status(200).json(
      {
        success: true, 
        message: "Tag Successfully Deleted", 
        tages: removeTag,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const updateById = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const tages = await tagService.getDeleteById(dbConnection);

    const tagData = {
       
    _id: req.params.tagId,
    Tag: req.body.Tag,
    Name:req.body.Name,
    Valid: req.body.Valid,
      
    };

    const updateTag= await tages.updateMany(
      {_id:req.params.tagId},  tagData    
      );

    res.status(200).json(
      {
        success: true, 
        message: "Tag Successfully Updated", 
        tages: updateTag,
      },
        );
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};


module.exports = { tagSignUp, fetchAll,fetchById,deleteById,updateById };

