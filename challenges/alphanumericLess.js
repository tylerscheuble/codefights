/*
 * https://codefights.com/challenge/cg2EGXh8NWczxCS5L
 */

// flatten :: [String] -> String
const flatten = strings =>
  strings.reduce((acc, str) => acc + str, '')

// zip :: ([a], [b]) -> [(a, b)]
const zip = (xs, ys) => {
  const result = []

  for (let i = 0; i < Math.min(xs.length, ys.length); i++)  {
    result.push([ xs[i], ys[i] ])
  }

  return result
}

// leadingZeros :: String -> Number
const leadingZeros = str => {
  let zeros = 0
  while (str.charAt(zeros) === '0') {
    zeros++
  }
  return zeros
}

// stripLeadingZeros :: String -> String
const stripLeadingZeros = str => str.slice(leadingZeros(str))

// tokens :: String -> [String]
const tokens = str => {
  const result = []

  let numberAcc = []
  const flushNumberAcc = () => {
    if (numberAcc.length !== 0) {
      result.push(flatten(numberAcc))
      numberAcc = []
    }
  }

  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i)
    const num = parseInt(c)

    if (!isNaN(num)) {
      // token is or is part of a number
      numberAcc.push(c)
    } else {
      // token is a character
      flushNumberAcc()
      result.push(c)
    }
  }
  flushNumberAcc()

  return result
}

// tokensLess :: ([String] -> [String]) -> Boolean
const tokensLess = (t1, t2) => {
  const zipped = zip(t1, t2)
  let leadingZeroPair

  // case 1: compare first unique token pair
  const uniquePair = zipped.find(pair => {
    const fst = pair[0]
    const snd = pair[1]

    if (fst === snd) {
      return false
    }

    const fstIsNum = !isNaN(parseInt(fst.charAt(0)))
    const sndIsNum = !isNaN(parseInt(fst.charAt(0)))

    if (fstIsNum && sndIsNum &&
      stripLeadingZeros(fst) === stripLeadingZeros(snd)) {
      // keep track of the first pair that only differs by leading
      // zeros for case 3
      if (leadingZeroPair === undefined) {
        leadingZeroPair = [ fst, snd ]
      }
      return false
    }

    return true
  })

  if (uniquePair !== undefined) {
    return uniquePair[0] < uniquePair[1]
  }

  // case 2: compare number of tokens
  if (t1.length !== t2.length) {
    return t1.length < t2.length
  }

  // compare by number of leading zeros in first number pair that
  // only differs by leading zeros
  if (leadingZeroPair !== undefined) {
    const fst = leadingZeroPair[0]
    const snd = leadingZeroPair[1]
    return leadingZeros(fst) > leadingZeros(snd)
  }

  // both token lists are the same
  return false
}

// alphanumericLess :: (String -> String) -> Boolean
const alphanumericLess = (s1, s2) => tokensLess(tokens(s1), tokens(s2))
