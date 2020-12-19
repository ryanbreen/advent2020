
const parts = [{
    name: 'day 1, part 1',

    workloads: [{
        path: 'day1/sample.csv',
        output: 514579
    },{
        path: 'day1/full.csv',
        output: 145875
    }],

    run: async (input) => {
        // Sort, then walk outside in lopping off the end of the array where sum at idx + end is
        // greater than 2020.
        let workingSet = input.split('\n').map(i => { return parseInt(i)} )
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

        return calculator()
    }
},{
    name: 'day 1, part 2',

    workloads: [{
        path: 'day1/sample.csv',
        output: 241861950
    },{
        path: 'day1/full.csv',
        output: 69596112
    }],
    
    run: async (input) => {
        let workingSet = input.split('\n').map(i => { return parseInt(i)} )
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
    
        return calculator()
    }
}]

export default parts
