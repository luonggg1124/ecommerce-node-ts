import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createProductRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Product name is required",
    }),
    price: Joi.number().required().messages({
      "number.base": "Price must be a number",
      "number.empty": "Price is required",
    }),
    description: Joi.string().optional().messages({
      "string.base": "Description must be a string",
    }),
    short_description: Joi.string().optional().messages({
      "string.base": "Short description must be a string",
    }),
    image: Joi.string().required().messages({
      "string.base": "Image is required",
    }),
    images: Joi.array()
      .items(
        Joi.string().optional().messages({
          "string.base": "Images url must be a string",
        })
      )
      .optional(),
    hasVariants: Joi.boolean().required().messages({
      "boolean.base": "Has variants field must be a boolean",
      "boolean.empty": "Has variants field is required",
    }),
    variants: Joi.when("hasVariants", {
      is: true,
      then: Joi.array().items(
        Joi.object({
          attribute: Joi.string().required().messages({
            "string.base": "Attribute must be a string",
            "string.empty": "Attribute is required",
          }),
          attribute_value: Joi.string().required().messages({
            "string.base": "Attribute value must be a string",
            "string.empty": "Attribute value is required",
          }),
        })
      ),
      otherwise: Joi.forbidden().messages({
        "any.unknown": "This product doesn't have any variants",
      }),
    }),
    categories: Joi.array()
      .items(
        Joi.string().optional().messages({
          "string.base": "Category id invalid",
        })
      )
      .messages({
        "array.base": "Category must be an array",
      }),
  });
  const { error } = validate.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.reduce((acc: any, err: any) => {
      acc[err.path[0]] = err.message;
      return acc;
    }, {});
    res.status(400).json({ errors });
  }
  next();
};
