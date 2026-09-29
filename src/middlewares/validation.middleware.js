export const validate = (schemas) => {
  return (req, res, next) => {
    //[key, schema] is something like [body, linkSchema]
    //if key is body then parse req.body if its params, parse req.params
    //schema is the zod schema to use
    for (const [key, schema] of Object.entries(schemas)) {
      //safeParse returns succesfully parsed data or zod error
      const result = schema.safeParse(req[key]);
      if (!result.success) {
        const error = new Error("validation failed");
        error.statusCode = 400;
        error.details = result.error.issues.map((error) => ({
          field: error.path.join("."),
          message: error.message,
        }));
        return next(error);
      }
      req[key] = result.data;
      next();
    }
  };
};
