
import {part1 as day1part1, part2 as day1part2} from './day1/index.mjs'
import {part1 as day2part1, part2 as day2part2} from './day2/index.mjs'
import {part1 as day3part1, part2 as day3part2} from './day3/index.mjs'
import {part1 as day4part1, part2 as day4part2} from './day4/index.mjs'
import day5 from './day5/index.mjs'
import day6 from './day6/index.mjs'
import day7 from './day7/index.mjs'

import { promises } from 'fs';

const run = async(day) => {
    for (const part of day) {
        console.log(part.name)
        for (const workload of part.workloads) {
            const input = await (await promises.readFile(new URL(workload.path, import.meta.url), 'utf-8'))

            const result = await part.run(input)
    
            process.stdout.write(`${workload.path} ${result} vs ${workload.output} `)
    
            if (workload.output === result) {
                console.log("✅")
            } else {
                console.log("❌")
            }
        }
    }
}

const runAll = async () => {
    /*
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
    */
    await run(day5)
    await run(day6)
    await run(day7)
}

runAll();