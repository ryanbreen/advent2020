
import { promises } from 'fs';

import _ from 'lodash';

export const part1 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'

    const input = await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8'))

    // Sort, then walk outside in lopping off the end of the array where sum at idx + end is
    // greater than 2020.
    let workingSet = _.map(_.split(input, '\n'), i => { return parseInt(i)} )
    workingSet.sort((a, b) => { return a-b })

    const calculator = () => {

        for (let i = 0; i < workingSet.length; i += 1) {
            for (let j = workingSet.length - 1; j > i; j -= 1) {
                if (workingSet[i] + workingSet[j] === 2020) {
                    return workingSet[i] * workingSet[j]
                }
            }
        }
    }

    const answer = calculator()

    process.stdout.write(`day 1, part 1: ${answer} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.1.key`, import.meta.url), 'utf-8')))
    if (key === answer) {
        console.log("✅")
    } else {
        console.log("❌")
    } 
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