
import { promises } from 'fs';

export const part1 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'
    const myBag = 'shiny gold'

    let uniqParents = new Set()

    const rules = (await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8'))).split(/\n/g)

    rules.forEach(rule => {
        if (rule.indexOf('dim fuchsia') != -1) {
            //console.log(rule)
        }
    })

    const findParents = ourBag => {
        rules.filter(rule => {
            return rule.indexOf(ourBag) != -1 && !rule.startsWith(ourBag)
        }).forEach(ourBagRule => {
            const ruleset = ourBagRule.match(/^([^\.]*) bags? contains? ([^\.]*)\.$/)
            const parentBag = ruleset[1]
            uniqParents.add(parentBag)
            findParents(parentBag)
        })
    }

    findParents(myBag)

    process.stdout.write(`day 7, part 1: ${uniqParents.size} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.1.key`, import.meta.url), 'utf-8')))
    if (key === uniqParents.size) {
        console.log("✅")
    } else {
        console.log("❌")
    }
}

export const part2 = async () => {

    // Source
    const sourcePath = './sample'
    //const sourcePath = './full'
    const myBag = 'shiny gold'

    let uniqParents = new Set()

    const rules = (await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8'))).split(/\n/g)

    rules.forEach(rule => {
        if (rule.indexOf('dim fuchsia') != -1) {
            //console.log(rule)
        }
    })

    const findParents = ourBag => {
        rules.filter(rule => {
            return rule.indexOf(ourBag) != -1 && !rule.startsWith(ourBag)
        }).forEach(ourBagRule => {
            const ruleset = ourBagRule.match(/^([^\.]*) bags? contains? ([^\.]*)\.$/)
            const parentBag = ruleset[1]
            uniqParents.add(parentBag)
            findParents(parentBag)
        })
    }

    findParents(myBag)

    process.stdout.write(`day 7, part 1: ${uniqParents.size} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.1.key`, import.meta.url), 'utf-8')))
    if (key === uniqParents.size) {
        console.log("✅")
    } else {
        console.log("❌")
    }
}