function getSrcUrl(fileName) {
  return `https://firebasestorage.googleapis.com/v0/b/toloba-ujjain.appspot.com/o/public%2F${fileName}?alt=media`;
}

export default {
  getSrcUrl,
};
