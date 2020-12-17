
import { assert } from 'console';
import { promises } from 'fs';

import _ from 'lodash';

export const part1 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'

    const input = await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8'))

    // Omit all lines with invalid passwords
    const answer = _.filter(_.split(input, '\n'), line => {
        const match = line.match(/([0-9]*)-([0-9]*) ([a-z]*): ([^$]*)$/)
        match.shift()
        
        const [min, max, char, passwd] = match
        let count = 0
        for (let i=0 ; i<passwd.length; ++i) {
            if (passwd[i] === char) {
                count += 1
            }
        }

        return min <= count && count <= max
    }).length

    process.stdout.write(`day 2, part 1: ${answer} `)

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

    process.stdout.write(`day 2, part 2: ${answer} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.2.key`, import.meta.url), 'utf-8')))
    if (key === answer) {
        console.log("✅")
    } else {
        console.log("❌")
    } 
}