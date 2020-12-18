
import { promises } from 'fs';

import _ from 'lodash';

export const part1 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'

    const groups = _.split(await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8')), '\n\n')

    const answer = _.reduce(groups, (sum, group) => {
        // Count unique characters
        const groupEntries = [...group.replace(/\n/g, '')]
        return sum += _.uniq(groupEntries).length
    }, 0)

    process.stdout.write(`day 6, part 1: ${answer} `)

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

    const groups = _.split(await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8')), '\n\n')

    const answer = _.reduce(groups, (sum, group) => {
        // Count unique characters
        const members = _.split(group, '\n')
        const answers = _.map(members, member => {
            return [...member]
        })
        return sum += _.intersection(...answers).length
    }, 0)

    process.stdout.write(`day 6, part 2: ${answer} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.2.key`, import.meta.url), 'utf-8')))
    if (key === answer) {
        console.log("✅")
    } else {
        console.log("❌")
    }
}