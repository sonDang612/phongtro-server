import { v4 } from "uuid";
import chothuecanho from "../data/chothuecanho.json";
import chothuematbang from "../data/chothuematbang.json";
import chothuephongtro from "../data/chothuephongtro.json";
import nhachothue from "../data/nhachothue.json";
import generateCode from "../utils/generateCode";
import db from "../models";
import { hashPassword } from "./auth";

const data = [
  {
    body: chothuecanho.body,
    categoryCode: "CTCH",
  },
  {
    body: chothuematbang.body,
    categoryCode: "CTMB",
  },
  {
    body: chothuephongtro.body,
    categoryCode: "CTPT",
  },
  {
    body: nhachothue.body,
    categoryCode: "NCT",
  },
];

const insertDataBody = async (data, categoryCode) => {
  data.forEach(async (item) => {
    const postId = v4();
    const labelCode = generateCode(4);
    const attributesId = v4();
    const userId = v4();
    const imagesId = v4();
    const overviewId = v4();
    await db.Post.create({
      id: postId,
      title: item?.header?.title,
      star: item?.header?.star,
      labelCode,
      address: item?.header?.address,
      attributesId,
      categoryCode,
      description: JSON.stringify(item?.mainContent?.content),
      userId,
      overviewId,
      imagesId,
    });

    await db.Attribute.create({
      id: attributesId,
      price: item?.header?.attributes?.price,
      acreage: item?.header?.attributes?.acreage,
      published: item?.header?.attributes?.published,
      hashtag: item?.header?.attributes?.hashtag,
    });

    await db.Image.create({
      id: imagesId,
      image: JSON.stringify(item?.images),
    });
    await db.Label.create({
      code: labelCode,
      value: item?.header?.class?.classType,
    });

    await db.Overview.create({
      id: overviewId,
      code: item?.overview?.content?.find((i) => i.name === "Mã tin:")?.content,
      area: item?.overview?.content?.find((i) => i.name === "Khu vực:")
        ?.content,
      type: item?.overview?.content?.find((i) => i.name === "Loại tin rao:")
        ?.content,
      target: item?.overview?.content?.find((i) => i.name === "Đối tượng thuê:")
        ?.content,
      bonus: item?.overview?.content?.find((i) => i.name === "Gói tin:")
        ?.content,
      created: item?.overview?.content?.find((i) => i.name === "Ngày đăng:")
        ?.content,
      expired: item?.overview?.content?.find((i) => i.name === "Ngày hết hạn:")
        ?.content,
    });

    await db.User.create({
      id: userId,
      name: item?.contact?.content?.find((i) => i.name === "Liên hệ:")?.content,
      password: hashPassword("123456"),
      phone: item?.contact?.content?.find((i) => i.name === "Điện thoại:")
        ?.content,
      zalo: item?.contact?.content?.find((i) => i.name === "Zalo")?.content,
    });
  });
};
export const insert = () =>
  new Promise(async (resolve, reject) => {
    try {
      data.forEach(async (item) => {
        insertDataBody(item.body, item.categoryCode);
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
