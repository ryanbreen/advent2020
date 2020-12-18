
import { promises } from 'fs';

export const part1 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'
    const myBag = 'shiny gold'

    let uniqParents = new Set()

    const rules = (await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8'))).split(/\n/g)

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
    //const sourcePath = './sample'
    //const sourcePath = './sample_2'
    const sourcePath = './full'
    const myBag = 'shiny gold'

    const rules = (await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8'))).split(/\n/g)

    const findChildren = ourBag => {
        return rules.filter(rule => {
            return rule.indexOf(ourBag) != -1 && rule.startsWith(ourBag)
        }).map(ourBagRule => {
            const children = ourBagRule.match(/(?:([0-9][^,^\.]*) bags?)/g)

            // If we have no children, only count this bag
            if (!children) return 0

            const map = children.map(child => {
                const parts = child.match(/([0-9]*) ([^#]*) bags?$/)
                const num = parseInt(parts[1])
                const nestedBag = parts[2]
                const childCount = findChildren(nestedBag)
                const res = num + (num * childCount)
                return res
            })

            const res = map.reduce((acc, cur) => { return acc + cur }, 0)
            return res
        }).reduce((acc, cur) => { return acc + cur })
    }

    const counter = findChildren(myBag)

    process.stdout.write(`day 7, part 2: ${counter} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.2.key`, import.meta.url), 'utf-8')))
    if (key === counter) {
        console.log("✅")
    } else {
        console.log("❌")
    }
}