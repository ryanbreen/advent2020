
const parts = [{
    name: 'day 6, part 1',

    workloads: [{
        path: 'day6/sample.csv',
        output: 11
    }, {
        path: 'day6/full.csv',
        output: 6587
    }],

    run: async (input) => {
        const groups = input.split('\n\n')

        return groups.reduce((sum, group) => {
            // Count unique characters
            const groupEntries = [...group.replace(/\n/g, '')]
            return sum + [ ...new Set(groupEntries)].length
        }, 0)
    }
},{

    name: 'day 6, part 2',

    workloads: [{
        path: 'day6/sample.csv',
        output: 6
    }, {
        path: 'day6/full.csv',
        output: 3235
    }],
    
    run: async (input) => {
        const groups = input.split('\n\n')

        return groups.reduce((sum, group) => {
            const members = group.split('\n')
            const answers = members.map(member => {
                return [...member]
            })

            let intersections = answers[0]
            const candidates = answers.slice(1)
            candidates.forEach(candidate => {
                intersections = intersections.filter(x => candidate.includes(x))
            })
            return sum + intersections.length
        }, 0)
    }
}]

export default parts