//生成26个英文字母
export function genEnglishChar(){
    let wordArr = []
    for (var i = 65; i < 90; i++) {
        wordArr.push({String.fromCharCode(i):String.fromCharCode(i)})
     }
     return wordArr
}
