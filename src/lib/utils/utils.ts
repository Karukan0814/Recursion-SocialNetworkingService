export const getMediaType = (imgFileType?: string | undefined) => {
  if (imgFileType) {
    if (["video/mp4", "video/webm"].includes(imgFileType)) {
      return "video";
    } else if (["image/jpeg", "image/png", "image/gif"].includes(imgFileType)) {
      return "image";
    }
  }
  return "unknown";
};
