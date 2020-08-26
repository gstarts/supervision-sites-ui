import store from '@/store/index'

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

//获取用户所在部门及下属部门
export function getUserDepts(deptType){
    let depts = []
    let dept = store.getters.dept
    console.log(dept)

    // 0 监管场所，1保税库，2堆场，3企业
    //如果所属部门是堆场，加入列表
    if(dept.deptType == deptType){
        depts.add(dept)
    }

    if(dept.children && dept.children.length>0){
        for(let item of dept.children){
            if(item.deptType == deptType){
                depts.push(item)
            }
        }
    }
    return depts;
}

export function cloneObject(obj){ // 对象复制
    return JSON.parse(JSON.stringify(obj))
}

