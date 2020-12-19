
const parts = [{
    name: 'day 10, part 1',

    workloads: [{
        path: 'day10/sample.csv',
        output: 35
    },{
        path: 'day10/sample_2.csv',
        output: 220
    },{
        path: 'day10/full.csv',
        output: 2030
    }],

    run: async (input) => {
        const numbers = input.split('\n').map(num => { return parseInt(num)}).sort((a, b) => a - b)
        
        numbers.unshift(0)
        let diff1 = 0
        let diff3 = 1 // The last gap is always 3
        for (let i = 1; i<numbers.length; ++i) {
            const diff = numbers[i] - numbers[i-1]
            if (diff === 3) {
                diff3 += 1
            } else if (diff === 1) {
                diff1 += 1
            }
        }

        return diff1 * diff3
    }
},{
    name: 'day 10, part 2',

    workloads: [/*{
        path: 'day9/sample.csv',
        output: 62
    },{
        path: 'day9/full.csv',
        output: 8249240
    }*/],
    
    run: async (input) => {
        const numbers = input.split('\n').map(num => { return parseInt(num)})
    }
}]

export default parts
