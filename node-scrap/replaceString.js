function testString(str) {
  if (!str) {
    return
  }
  const regsReplaceToSpace = [
    /\[当当自营]/g,
    /\【当当自营】/g,
    /\当当自营】/g,
    /\【当当/g,
    /\当当自营/g,
    /\百草味/g,

    /\【京东超市】/g,
    /\【京东正品】/g,
    /\【京东直赔】/g,
    /\【京东自营】/g,
    /\【京东配送】/g,
    /\（京东专供）/g,
    /\（京东发货）/g,
    /\（京东仓发货）/g,

    /\京东自营/g,
    /\京东正品/g,
    /\京东超市/g,
    /\京东配送/g,
    /\京东发货/g,
    /\京东/g
  ]


  regsReplaceToSpace.forEach(item => {
    str = str.replace(item, '')
  })

  return str.trim()
}

module.exports = {
  testString
}