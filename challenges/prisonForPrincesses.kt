/**
 * https://codefights.com/challenge/HFJYuXWgb2ZENrPPq
 */
fun prisonForPrincesses(prisons: MutableList<Int>, princesses: MutableList<Int>, entrance: Int): MutableList<Int> =
    princesses.fold(listOf<Int>()) { acc, kidnappedPrincesses ->
        val options = prisons.indices.map { it + 1 } - acc

        acc + (options.find { prisons[it - 1] == kidnappedPrincesses }
                ?: options.filter { prisons[it - 1] > kidnappedPrincesses }
                    .sortedBy { Math.abs(it - (entrance + 0.5)) }
                    .firstOrNull() ?: -1)
    }.toMutableList()
