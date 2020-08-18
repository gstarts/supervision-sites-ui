//生成26个英文字母
export function genEnglishChar(){
    let wordArr = []
    for (let i = 65; i < 90; i++) {
        wordArr.push({'char':String.fromCharCode(i),'value':String.fromCharCode(i)})
     }
     return wordArr
}

//生成数字
export function genNumChar(start,end){
    let numArr = []
    for(let i=start;i<=end;i++){
        numArr.push({'key':i,'value': i<10?'0'+i:i})
    }
    return numArr
}
