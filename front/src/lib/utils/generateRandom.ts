export function generateRandomFileName() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomFileName = "";
  const fileNameLength = 10; // ファイル名の長さを設定
  for (let i = 0; i < fileNameLength; i++) {
    randomFileName += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomFileName;
}
