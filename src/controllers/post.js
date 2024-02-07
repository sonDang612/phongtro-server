import * as postService from "../services/post";
import removeNullFromObject from "../utils/removeNullFromObject";

export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at post controller: " + error,
    });
  }
};

export const getPostsLimit = async (req, res) => {
  const { page, ...query } = req.query;
  const { priceCode, areaCode, categoryCode } = query;
  try {
    const response = await postService.getPostsLimitService(
      page,
      removeNullFromObject({ priceCode, areaCode, categoryCode })
    );
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at post controller: " + error,
    });
  }
};
export const getNewestPosts = async (req, res) => {
  try {
    const response = await postService.getNewestPostsService();
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at post controller: " + error,
    });
  }
};
