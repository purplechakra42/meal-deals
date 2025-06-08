import axios from "axios";

export const fetchInfo = async (location: string, updater: Function, errorUpdater: Function) => {
  try {
    const response = await axios.get(`http://localhost:3000/${location}/`);
    console.log(`Succesfully got all ${location} data.`);
    updater(response.data);
  } catch (err) {
    errorUpdater(err.message);
    console.error(`Failed to get ${location} data.`);
  }
};

export const patchInfo = async (location: string, data, errorUpdater: Function) => {
  console.log("attempting to patch item with ID", data.id);
  try {
    await axios.patch(`http://localhost:3000/${location}`, data);
    console.log(`Succesfully updated ${location} data.`);
  } catch (err) {
    errorUpdater(err.message);
    console.error(`Failed to update ${location} data.`);
  }
};

export const deleteMultipleInfo = async (location: string, errorUpdater: Function) => {
  try {
    await axios.delete(`http://localhost:3000/${location}`);
    console.log(`Succesfully deleted multiple ${location} data.`);
  } catch (err) {
    errorUpdater(err.message);
    console.error(`Failed to delete multiple ${location} data.`);
  }
};
