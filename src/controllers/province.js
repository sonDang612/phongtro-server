import * as provinceService from "../services/province";

export const getProvinces = async (req, res) => {
  try {
    const response = await provinceService.getProvincesService();
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at province controller: " + error,
    });
  }
};
