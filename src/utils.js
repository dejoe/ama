export default class Utils {
  static getImageSrc(imgtag) {
    let imgsrc = "";
    let srcRegex = /src[\s]*=[\s\\]*"([^"]*)"/g;
    let imgSrcAr = srcRegex.exec(imgtag);
    if (imgSrcAr && imgSrcAr[1]) {
      imgsrc = imgSrcAr[1];
    }
    return decodeURIComponent(imgsrc);
  }
}