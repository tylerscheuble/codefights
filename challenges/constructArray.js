function constructArray(size) {
  return [ ...Array(size).keys() ]
    .map(i => {
      const n = i + 1
      return n % 2 === 0 ?
        (size + 1) - Math.floor(n / 2) :
        Math.ceil(n / 2)
    })
}
