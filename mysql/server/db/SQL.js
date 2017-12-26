const commonConfig = {
  enumerable: false,
  configurable: true,
  writable: true,
}

function Select(table, selections = '*') {
  if (!table) throw Error('no table choose!')
  this.selections = selections
  this.table = table
}

Object.defineProperties(Select.prototype, {
  'toString': {
    value: function() {
      const baseSql = `select ${this.selections} from ${this.table}`
      let _sql = baseSql

      if (this._where) {
        _sql = `${_sql} where ${this._where}`
      }
      if (this._limit) {
        _sql = `${_sql} limit ${this._limit.offset}, ${this._limit.steps}`
      }

      return _sql
    },
    ...commonConfig
  },
  'where': {
    value: function(condition='') {
      if (condition) {
        this._where = condition
        return this
      }else {
        return this + ''
      }
    },
      ...commonConfig
  },
  'limit': {
    value: function(offset = 0, steps = 30) {
      this._limit = {
        offset,
        steps,
      }

      return this
    },
    ...commonConfig
  },
})

function Insert(table, dic = {}) {
  if (!table) throw Error('no table choose!')
  this.table = table
  this.dic = dic
}

Object.defineProperties(Insert.prototype, {
  'toString': {
    value: function() {
      const keys = Object.keys(this.dic).join(',')
      const vals = Object.keys(this.dic).map(key => (`'${this.dic[key]}'`)).join(',')

      return `insert into ${this.table} (${keys}) values (${vals})`
    },
    ...commonConfig
  }
})

function Delete(table, where) {
  if (!table) throw Error('no table choose!')
  if (!where) throw Error('must need a condition!')
  this.table = table
  this.where = where
}

Object.defineProperties(Delete.prototype, {
  'toString': {
    value: function() {
      return `delete from ${this.table} where ${this.where}`
    },
    ...commonConfig
  }
})

module.exports = {
  Select: Select,
  Insert: Insert,
  Delete: Delete,
}
