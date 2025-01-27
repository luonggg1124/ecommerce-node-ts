import Joi from "joi";
import mongoose from "mongoose";

export const existingModel = Joi.extend((joi) => ({
  type: "exists",
  base: joi.any(),
  messages: {
    "exists.notFound": "{{#label}} contains invalid IDs",
  },
  rules: {
    db: {
      method(
        collection: mongoose.Model<any>,
        field: string,
        isArray: boolean = false
      ) {
        return this.$_addRule({
          name: "db",
          args: { collection, field, isArray },
        });
      },
      async validate(value, helpers, args) {
        const { collection, field, isArray } = args;
        if (isArray) {
          if (!Array.isArray(value)) {
            return helpers.error("exists.notFound");
          }
          const validIds = await collection
            .find({
              [field]: { $in: value },
            })
            .select(field);
          const validIdSet = new Set(
            validIds.map((doc: any) => String(doc[field]))
          );
          const allExists = value.every((id: string | number) =>
            validIdSet.has(String(id))
          );
          if (!allExists) {
            return helpers.error("exists.notFound");
          }
        } else {
          const exists = await collection.exists({ [field]: value });
          if (!exists) {
            return helpers.error("exists.notFound");
          }
        }
        return value;
      },
    },
  },
}));
