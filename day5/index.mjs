
import { promises } from 'fs';

import _ from 'lodash';

export const part1 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'

    const patterns = _.split(await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8')), '\n')

    const seats = _.map(patterns, pattern => {
        const row = parseInt(pattern.substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2)
        const column = parseInt(pattern.substring(7, 10).replace(/R/g, '1').replace(/L/g, '0'), 2)
        return row * 8 + column
    }).sort((a, b) => { return b-a })

    process.stdout.write(`day 5, part 1: ${seats[0]} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.1.key`, import.meta.url), 'utf-8')))
    if (key === seats[0]) {
        console.log("✅")
    } else {
        console.log("❌")
    } 
}

export const part2 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'

    const patterns = _.split(await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8')), '\n')

    let seats = _.map(patterns, pattern => {
        const row = parseInt(pattern.substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2)
        const column = parseInt(pattern.substring(7, 10).replace(/R/g, '1').replace(/L/g, '0'), 2)
        return row * 8 + column
    }).sort((a, b) => { return a-b })

    seats = _.filter(seats, s => {
        // Filter first and last row
        return 8 < s && s < 1016
    })

    let i = 0;
    for (; i < seats.length - 1; i += 1) {
        if (seats[i+1] - seats[i] != 1) {
            break
        }
    }
    
    const answer = seats[i] + 1
    process.stdout.write(`day 5, part 2: ${answer} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.2.key`, import.meta.url), 'utf-8')))
    if (key === answer) {
        console.log("✅")
    } else {
        console.log("❌")
    } 
}