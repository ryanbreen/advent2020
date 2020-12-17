
import { promises } from 'fs';

import _ from 'lodash';

const calculateTreesHit = (slope, mx, my) => {
    let x = mx
    let treesHit = 0
    for (let y = my; y<slope.length; y += my) {

        if (slope[y].charAt(x) === '#') {
            treesHit += 1
        }

        x += mx

        if (x >= slope[y].length) {
            x -= slope[y].length
        }
    }

    return treesHit
}

export const part1 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'

    const slope = _.split(await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8')), '\n')

    const treesHit = calculateTreesHit(slope, 3, 1)

    process.stdout.write(`day 3, part 1: ${treesHit} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.1.key`, import.meta.url), 'utf-8')))
    if (key === treesHit) {
        console.log("✅")
    } else {
        console.log("❌")
    } 
}

export const part2 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'

    const slope = _.split(await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8')), '\n')

    const paces = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ]

    const treesHit = _.map(paces, (pace) => {
        return calculateTreesHit(slope, pace[0], pace[1])
    })

    const product = _.reduce(treesHit, (product, treesHitOnSlope) => {
        return product * treesHitOnSlope
    })

    process.stdout.write(`day 3, part 1: ${product} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.2.key`, import.meta.url), 'utf-8')))
    if (key === product) {
        console.log("✅")
    } else {
        console.log("❌")
    } 
}