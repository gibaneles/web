class BD {
  constructor() {
    this.dados = localStorage
  }
  insert(tableName, obj) {
    let id = parseInt(localStorage.getItem(tableName))
    if((id === undefined)||(id === null)||(isNaN(id) === true)) {
      id = 0
    }
    localStorage.setItem(tableName+'_'+id.toString(), JSON.stringify(obj))
    id++
    localStorage.setItem(tableName, id.toString())
  }
  selectId(tableName, id) {
    let acc = parseInt(localStorage.getItem(tableName))
    if((acc === undefined)||(acc === null)||(isNaN(acc) === true)) {
      acc = 0
    } else {
      if (id < acc) {
        if(localStorage.getItem(tableName+'_'+id.toString()) !== '') {
          return JSON.parse(localStorage.getItem(tableName+'_'+id.toString()))
        }
      }
    }
  }
  select(tableName) {
    tableName = tableName.toString()
    let id = parseInt(localStorage.getItem(tableName))
    if((id === undefined)||(id === null)||(id === 'NaN')) {
      localStorage.setItem(tableName, '0')
      return undefined
    } else {
      let retorno = []
      for (let index = 0; index < id; index++) {
        if(localStorage.getItem(tableName+'_'+index) !== '')
        {
          retorno.push(JSON.parse(localStorage.getItem(tableName+'_'+index)))
        }
      }
      return retorno
    }
  }
  numRows(tableName) {
    return this.select(tableName).length
  }
  delete(tableName, id) {
    let acc = parseInt(localStorage.getItem(tableName))
    if((acc === undefined)||(acc === null)||(isNaN(acc) === true)) {
      acc = 0
    } else {
      if (id < acc) {
        localStorage.setItem(tableName+'_'+id.toString(), '')
      }
    }
  }
  update(tableName, id, obj) {
    let acc = parseInt(localStorage.getItem(tableName))
    if((acc === undefined)||(acc === null)||(isNaN(acc) === true)) {
      acc = 0
    }
    if (id < acc) {
      localStorage.setItem(tableName+'_'+id.toString(), JSON.stringify(obj))
    }	
  }
}
let bd = new BD()