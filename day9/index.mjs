
const findInvalid = numbers => {
    const preambleSize = numbers.length > 25 ? 25 : 5

    let preamble = numbers.slice(0, preambleSize)
    let tape = numbers.slice(preambleSize)

    const validateAgainstPreamble = num => {
        for (let i=0; i<preamble.length; ++i) {
            for (let j=i+1; j<preamble.length; ++j) {
                if (preamble[i] + preamble[j] === num) {
                    return true
                }
            }
        }

        return false
    }

    while (tape.length > 0) {
        if (!validateAgainstPreamble(tape[0])) return tape[0]

        preamble.shift()
        preamble.push(tape.shift())
    }
}

const parts = [{
    name: 'day 9, part 1',

    workloads: [{
        path: 'day9/sample.csv',
        output: 65
    },{
        path: 'day9/sample_2.csv',
        output: 127
    },{
        path: 'day9/full.csv',
        output: 70639851
    }],

    run: async (input) => {
        const numbers = input.split('\n').map(num => { return parseInt(num)})
        
        return findInvalid(numbers)
    }
},{
    name: 'day 9, part 2',

    workloads: [{
        path: 'day9/sample_2.csv',
        output: 62
    },{
        path: 'day9/full.csv',
        output: 8249240
    }],
    
    run: async (input) => {
        const numbers = input.split('\n').map(num => { return parseInt(num)})

        const invalidNumber = findInvalid(numbers)
        
        for (let i=0; i<numbers.length-1; ++i) {
            for (let j=i+1; j<numbers.length; ++j) {
                // Sum the array from i to j, breaking when the sum is greater than
                // the invalid number
                const range = numbers.slice(i, j)
                const val = range.reduce((cur, num) => {
                    return cur + num
                }, 0)
                
                if (val === invalidNumber) {
                    // Sort and return bounds
                    const sorted = range.sort((a, b) => a-b)
                    return sorted[0] + sorted.pop()
                }

                if (val > invalidNumber) break
            }
        }
    }
}]

export default parts
