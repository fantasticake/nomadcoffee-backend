import AWS from "aws-sdk";

export const privateResolver = resolver => {
  return (parent, args, context, info) => {
    if (!context.loggedInUser) {
      return { ok: false, error: "Cannot access" };
    }
    return resolver(parent, args, context, info);
  };
};

export const uploadAWS = async (file, filename) => {
  const { createReadStream } = await file;
  const readStream = createReadStream();
  const s3 = new AWS.S3({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.AWS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });
  const { Location } = await s3
    .upload({
      Bucket: "cake-nomadcoffee-uploads",
      Key: "uploads/" + filename,
      Body: readStream,
      ACL: "public-read",
    })
    .promise();
  return Location;
};
