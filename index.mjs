
import {part1 as day1part1, part2 as day1part2} from './day1/index.mjs'
import day2 from './day2/index.mjs'
import day3 from './day3/index.mjs'
import day4 from './day4/index.mjs'
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
    //await day1part1()
    await run(day2)
    await run(day3)
    await run(day4)
    await run(day5)
    await run(day6)
    await run(day7)
}

runAll();