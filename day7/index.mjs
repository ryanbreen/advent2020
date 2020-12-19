
const parts = [{
    name: 'day 7, part 1',

    workloads: [{
        path: 'day7/sample.csv',
        output: 4
    }, {
        path: 'day7/full.csv',
        output: 278
    }],
    
    run: async (input) => {

        const myBag = 'shiny gold'

        let uniqParents = new Set()

        const rules = input.split(/\n/g)

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

        return uniqParents.size
    }
},{
    name: 'day 7, part 2',

    workloads: [{
        path: 'day7/sample.csv',
        output: 32
    },{
        path: 'day7/sample_2.csv',
        output: 126
    },{
        path: 'day7/full.csv',
        output: 45157
    }],

    run: async (input) => {
        const myBag = 'shiny gold'

        const rules = input.split(/\n/g)

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

        return findChildren(myBag)
    }
}]

export default parts