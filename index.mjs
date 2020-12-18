
import {part1 as day1part1, part2 as day1part2} from './day1/index.mjs'
import {part1 as day2part1, part2 as day2part2} from './day2/index.mjs'
import {part1 as day3part1, part2 as day3part2} from './day3/index.mjs'
import {part1 as day4part1, part2 as day4part2} from './day4/index.mjs'
import {part1 as day5part1, part2 as day5part2} from './day5/index.mjs'
import {part1 as day6part1, part2 as day6part2} from './day6/index.mjs'
import {part1 as day7part1, part2 as day7part2} from './day7/index.mjs'

const run = async () => {
    await day1part1()
    await day1part2()
    await day2part1()
    await day2part2()
    await day3part1()
    await day3part2()
    await day4part1()
    await day4part2()
    await day5part1()
    await day5part2()
    await day6part1()
    await day6part2()
    await day7part1()
    await day7part2()
}

run();