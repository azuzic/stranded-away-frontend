let Service = axios.create({
  baseURL: "https://freeimage.host.com/",
  timeout: 30000,
});
let key = process.env.IMAGE_HOST_KEY;
let Image = {
  upload(base64_string) {
    let imageData = {
      action: "upload",
      key: key,
      source: base64_string,
    };
    return Service.post("api/1/upload", imageData);
  },
};
export { Image };
