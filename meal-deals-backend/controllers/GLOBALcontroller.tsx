// CREATE
const createItem = (model, modelName) => async (req, res) => {
  try {
    const newInfo = req.body;
    console.log(`Received request to create new ${modelName} with info`, newInfo);
    const newItem = await model.create(newInfo);

    if (!newItem) {
      console.error(`Unable to create new ${modelName}.`);
      return res.status(404).send({ error: `Unable to create new ${modelName}.` });
    }

    console.log(`Created new ${modelName} with ID ${newItem.id}`);
    res.status(201).json({ message: `Created new ${modelName} with ID ${newItem.id}`, id: newItem.id }); // REQUIRED so that the frontend can know that the request succeeded
  } catch (err) {
    console.error(`Database error in ${modelName}:`, err);
    res.status(500).send({ error: "Couldn't connect to the database." });
  }
};

const createMultipleItems = (model, modelName) => async (req, res) => {
  try {
    const newInfo = req.body;
    console.log(`Received request to create multiple ${modelName} with information`, newInfo);
    const newItems = await model.bulkCreate(newInfo);

    if (!newItems) {
      console.error(`Unable to create new ${modelName}s.`);
      return res.status(404).send({ error: `Unable to create new ${modelName}s.` });
    }

    console.log(`Created new ${modelName}s`);
    res.status(201).json({ message: `Created new ${modelName} with IDs,`, newItems });
  } catch (err) {
    console.error(`Database error in ${modelName}:`, err);
    res.status(500).send({ error: "Couldn't connect to the database." });
  }
};

// READ
const getAllInfo = (model, modelName) => async (req, res) => {
  try {
    console.log(`Received request for all ${modelName}s.`);
    const info = await model.findAll();

    if (!info.length) {
      console.error(`No ${modelName}s found.`);
    }

    res.send(info);
  } catch (err) {
    console.error(`Database error in ${modelName}: ${err}`);
    res.status(500).send({ error: "Couldn't connect to the database." });
  }
};

const getOneInfoByPk = (model, modelName) => async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Received request for ${modelName} with ID ${id}`);
    const info = await model.findByPk(id);

    if (!info.length) {
      console.error(`${modelName} with that ID doesn't exist.`);
      return res.status(404).send({ error: `${modelName} with that ID doesn't exist.` });
    }

    console.log("Query result:", info);
    res.send(info);
  } catch (err) {
    console.error(`Database error in ${modelName}: ${err}`);
    res.status(500).send({ error: "Couldn't connect to the database." });
  }
};

const getAllWhere = (model, modelName, attribute) => async (req, res) => {
  try {
    const condition = req.params[attribute]; // the [] converts it from text to a 'dynamic key'
    console.log(`Received request for ${modelName} with ${attribute}: ${condition}`);
    const info = await model.findAll({ where: { [attribute]: condition } });

    if (!info.length) {
      console.error(`${modelName} with ${attribute}=${condition} doesn't exist.`);
      return res.status(404).send({ error: `${modelName} with ${attribute}=${condition} doesn't exist.` });
    }

    console.log("Query result:", info);
    res.send(info);
  } catch (err) {
    console.error(`Database error in ${modelName}: ${err}`);
    res.status(500).send({ error: "Couldn't connect to the database." });
  }
};

// UPDATE
const updateItemPatch = (model, modelName) => async (req, res) => {
  try {
    const id = req.params.id;
    const newInfo = req.body;
    console.log(`Received request to update ${modelName} with ID ${id} and info `, newInfo);
    const result = await model.update(newInfo, { where: { id } });

    if (result[0] === 0) return res.status(404).send({ error: `${modelName} with ID ${id} doesn't exist.` });

    res.status(201).json({ message: `Updated ${modelName} with ID ${id}` });
  } catch (err) {
    console.error(`Database error in ${modelName}: ${err}`);
    res.status(500).send({ error: "Couldn't connect to the database." });
  }
};

// DELETE
const deleteItem = (model, modelName) => async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Received request to delete ${modelName} with ID ${id}`);
    const item = await model.findByPk(id);

    if (!item) {
      console.error(`${modelName} with that ID doesn't exist.`);
      return res.status(404).send({ error: `${modelName} with that ID doesn't exist.` });
    }

    await item.destroy();

    // if (item) {
    //   console.error(`Error deleting ${modelName}.`);
    //   return res.status(404).send({ error: `Error deleting ${modelName}.` });
    // }

    console.log(`Deleted ${modelName} with ID ${id}`);
    res.status(201).json({ message: `Deleted ${modelName} with ID ${id}` }); // REQUIRED so that the frontend can know that the request succeeded
  } catch (err) {
    console.error(`Database error in ${modelName}: ${err}`);
    res.status(500).send({ error: "Couldn't connect to the database." });
  }
};

const deleteAllWhere = (model, modelName, attribute) => async (req, res) => {
  try {
    const condition = req.params[attribute];
    console.log(`Received request to delete ${modelName}s with with ${attribute}: ${condition}`);

    await model.destroy({ where: { [attribute]: condition } });

    console.log(`Deleted all ${modelName}s with ID ${attribute}: ${condition}`);
    res.status(201).json({ message: `Deleted ${modelName}s with ${attribute}: ${condition}` });
  } catch (err) {
    console.error(`Database error in ${modelName}: ${err}`);
    res.status(500).send({ error: "Couldn't connect to the database." });
  }
};

module.exports = { createItem, createMultipleItems, getAllInfo, getOneInfoByPk, getAllWhere, updateItemPatch, deleteItem, deleteAllWhere };
