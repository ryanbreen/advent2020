
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

    // Omit all lines with invalid passwords
    const answer = _.filter(_.split(input, '\n'), line => {
        const match = line.match(/([0-9]*)-([0-9]*) ([a-z]*): ([^$]*)$/)
        match.shift()
        
        let [first, second, char, passwd] = match
        first -= 1
        second -= 1

        return passwd[first] === char ^ passwd[second] === char
    }).length

    process.stdout.write(`day 2, part 2: ${answer} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.2.key`, import.meta.url), 'utf-8')))
    if (key === answer) {
        console.log("✅")
    } else {
        console.log("❌")
    } 
}