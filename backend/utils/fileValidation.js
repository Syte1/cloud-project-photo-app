const allowedExtensions = new Set(["jpg", "jpeg", "png", "gif", "bmp", "webp"]);

const validateFileExtension = (filename) => {
  const extension = filename.split(".").pop().toLowerCase();
  return allowedExtensions.has(extension);
};

module.exports = {
  validateFileExtension,
};