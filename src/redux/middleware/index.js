export const customMiddleware = (store) => (next) => (action) => {
  console.log("Middleware triggered:", action);

  try {
    return next(action);
  } catch (error) {
    console.error("Middleware error:", error);
  }
};
