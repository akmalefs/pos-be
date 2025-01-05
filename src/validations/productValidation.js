import joi from "joi";

export const orderReturnValidation = (payload) => {
  const schema = joi.object({
    barcode: joi.string().trim().allow(null).allow(""),
    productName: joi.string().trim().required(),
    image: joi.string().trim().allow(null).allow(""),
    url: joi.string().trim().allow(null).allow(""),
    qty: joi.number().required(),
    price: joi.number().required(),
    categoryId: joi.number().required(),
    supplierId: joi.number().required(),
    file: joi.any().allow(null).allow(""),
  });

  return schema.validate(payload);
};
