import store from '@/store/index'

//生成26个英文字母
export function genEnglishChar() {
  let wordArr = []
  for (let i = 65; i < 90; i++) {
    wordArr.push({'char': String.fromCharCode(i), 'value': String.fromCharCode(i)})
  }
  return wordArr
}

//生成数字
export function genNumChar(start, end, prefix) {
  //如果有前缀，就用前缀顶，如果没有就用0
  let numArr = []
  for (let i = start; i <= end; i++) {
    if (prefix) {
      numArr.push({'key': i, 'value': i < 10 ? prefix + i : i})
    } else {
      numArr.push({'key': i, 'value': i < 10 ? +'0' + i : i})
    }
  }
  return numArr
}

//获取用户所在部门及下属部门
export function getUserDepts(deptType) {
  //debugger
  let depts = []
  let dept = store.getters.dept
  //debugger
  // 0 监管场所，1保税库，2堆场，3企业
  //如果所属部门是堆场，加入列表
  if (dept.deptType == deptType) {
    depts.push(dept)
  }

  if (dept.children && dept.children.length > 0) {
    for (let item of dept.children) {
      if (item.deptType == deptType) {
        depts.push(item)
      }
    }
  }
  //如果传进来是空串，则把所有类型的场所都加进去
  if (deptType === '') {
    if (dept.deptType === '0' || dept.deptType === '1' || dept.deptType === '2') {
      depts.push(dept)
    }

    for (let item of dept.children) {
      if (item.deptType == '0' || item.deptType == '1' || item.deptType == '2') {
        depts.push(item)
      }
    }
  }

  return depts;
}

export function cloneObject(obj) { // 对象复制
  return JSON.parse(JSON.stringify(obj))
}

//判断是否包含中文字符
export function isChina(s) {
  let pattern = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
  return pattern.exec(s);
}

