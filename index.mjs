
import {part1 as day1part1, part2 as day1part2} from './day1/index.mjs'
import {part1 as day2part1, part2 as day2part2} from './day2/index.mjs'
import {part1 as day3part1, part2 as day3part2} from './day3/index.mjs'

const run = async () => {
    await day1part1()
    await day1part2()
    await day2part1()
    await day2part2()
    await day3part1()
    await day3part2()
}

run();