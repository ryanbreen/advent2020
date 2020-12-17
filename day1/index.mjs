
import { assert } from 'console';
import { promises } from 'fs';

import _ from 'lodash';

export const part1 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'

    const input = await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8'))

    let answer;

    // Sort, then walk outside in lopping off the end of the array where sum at idx + end is
    // greater than 2020.
    let workingSet = _.map(_.split(input, '\n'), i => { return parseInt(i)} )
    workingSet.sort((a, b) => { return a-b })

    for (let i = 0; i < workingSet.length; i += 1) {
        let backOfArray = workingSet.length - 1

        while (workingSet[i] + workingSet[backOfArray] > 2020) {
            workingSet.pop()
            backOfArray -= 1
        }

        if (workingSet[i] + workingSet[backOfArray] == 2020) {
            answer = workingSet[i] * workingSet[backOfArray]
            break
        } else {
            // Once we're below 2020, move to the next candidate
            continue
        }
    }

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.1.key`, import.meta.url), 'utf-8')))
    assert(key === answer)

    console.log("day 1, part 1 ✅")
}

export const part2 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'

    const input = await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8'))

    let workingSet = _.map(_.split(input, '\n'), i => { return parseInt(i)} )
    workingSet.sort((a, b) => { return a-b })

    const calculator = () => {

        for (let i = 0; i < workingSet.length; i += 1) {
            for (let j = i + 1; j < workingSet.length; j += 1) {
                for (let k = workingSet.length - 1; k > j; k -= 1) {
                    if (workingSet[i] + workingSet[j] + workingSet[k] === 2020) {
                        console.log(`${i}==${workingSet[i]} ${j}==${workingSet[j]} ${k}==${workingSet[k]}`)
                        return workingSet[i] * workingSet[j] * workingSet[k]
                    }
                }
            }
        }
    }

    const answer = calculator()

    process.stdout.write(`day 1, part 2: ${answer} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.2.key`, import.meta.url), 'utf-8')))
    if (key === answer) {
        console.log("✅")
    } else {
        console.log("❌")
    } 
}