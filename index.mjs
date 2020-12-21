
import day1 from './day1/index.mjs'
import day2 from './day2/index.mjs'
import day3 from './day3/index.mjs'
import day4 from './day4/index.mjs'
import day5 from './day5/index.mjs'
import day6 from './day6/index.mjs'
import day7 from './day7/index.mjs'
import day8 from './day8/index.mjs'
import day9 from './day9/index.mjs'
import day10 from './day10/index.mjs'
import day11 from './day11/index.mjs'
import day12 from './day12/index.mjs'

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
    await run(day1)
    await run(day2)
    await run(day3)
    await run(day4)
    await run(day5)
    await run(day6)
    await run(day7)
    await run(day8)
    await run(day9)
    await run(day10)
    await run(day11)
    await run(day12)
}

runAll();