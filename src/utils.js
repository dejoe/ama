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
  
    static getImageSrcFromStr(str){

    let regex = /<img.*?src='(.*?)'/;
    let src = regex.exec(str)[1];
    return src;
  }
  
   static getAnchorFromStr(str){

    let regex = /<a.*?href='(.*?)'/;
    let anchor= regex.exec(str)[1];
    return anchor;
  }
}