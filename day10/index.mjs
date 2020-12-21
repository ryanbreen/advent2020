
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

    workloads: [{
        path: 'day10/sample.csv',
        output: 8
    },{
        path: 'day10/sample_2.csv',
        output: 19208
    },{
        path: 'day10/full.csv',
        output: 42313823813632,
    }],
    
    run: async (input) => {
        const numbers = input.split('\n').map(num => { return parseInt(num)}).sort((a, b) => a - b)

        let counter = 0
        numbers.unshift(0)

        const memos = new Array(numbers.length)
        memos[numbers.length - 1] = 1 // There is one path from the last node to our device

        // Starting from the end of the array, create a memo of the number of valid hops
        // from that level.
        for (let i = numbers.length - 2; i >= 0; --i) {

            memos[i] = 0
            const cur = numbers[i]

            const checkDepth = depth => {
                if (i + depth < numbers.length && numbers[i + depth] - cur <= 3) {
                    memos[i] += memos[i + depth]
                }
            }

            checkDepth(1)
            checkDepth(2)
            checkDepth(3)
        }

        return memos[0]
    }
}]

export default parts
