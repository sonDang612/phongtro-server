import db from "../models";

export const getAreasService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Area.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get areas",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAreaByCodeService = (areaCode) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Area.findOne({
        where: { code: areaCode },
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get areas",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
