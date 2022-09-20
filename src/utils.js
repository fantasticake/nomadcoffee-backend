import { createWriteStream } from "fs";
import { finished } from "stream/promises";

export const privateResolver = resolver => {
  return (parent, args, context, info) => {
    if (!context.loggedInUser) {
      return { ok: false, error: "Cannot access" };
    }
    return resolver(parent, args, context, info);
  };
};

export const saveFile = async (file, filename) => {
  const { createReadStream } = await file;
  const readStream = createReadStream();
  const writeStream = createWriteStream(process.cwd() + "/uploads/" + filename);
  readStream.pipe(writeStream);
  await finished(writeStream);
};
