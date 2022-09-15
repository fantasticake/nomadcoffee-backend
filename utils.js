export const privateResolver = resolver => {
  return (parent, args, context, info) => {
    if (!context.loggedInUser) {
      return { ok: false, error: "Cannot access" };
    }
    return resolver(parent, args, context, info);
  };
};
