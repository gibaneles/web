class BD {
  constructor() {
      this.dados = localStorage
  }
  insert(tableName, obj) {
    let id = parseInt(localStorage.getItem(tableName))
    if((id === undefined)||(id === null)||(isNaN(id) === true)) {
        id = 0
    }
    localStorage.setItem(tableName+"_"+id.toString(), JSON.stringify(obj))
    id++
    localStorage.setItem(tableName, id.toString())
  }
  selectId(tableName, id) {
    return JSON.parse(localStorage.getItem(tableName+"_"+id.toString()))
  }
  select(tableName) {
    tableName = tableName.toString()
    let id = parseInt(localStorage.getItem(tableName))
    if((id === undefined)||(id === null)||(id === 'NaN')) {
        localStorage.setItem(tableName, "0")
        return undefined
    } else {
        let retorno = []
        for (let index = 0; index < id; index++) {
            retorno.push(JSON.parse(localStorage.getItem(tableName+"_"+index)))
        }
        return retorno
    }
  }
  numRows(tableName) {
    let id = parseInt(localStorage.getItem(tableName))
    if((id === undefined)||(id === null)||(isNaN(id) === true)) {
        return 0
    } else {
        return id
    }
  }
}
let bd = new BD()