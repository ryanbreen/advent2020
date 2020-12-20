
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
        output: 1020301023010,
    }],
    
    run: async (input) => {
        const numbers = input.split('\n').map(num => { return parseInt(num)}).sort((a, b) => a - b)

        let counter = 0
        numbers.unshift(0)
        numbers.push(numbers[numbers.length-1] + 3)

        const validateSublist = (startIdx) => {
            let distance = -1
            let diff = 0

            while (true) {

                if (startIdx + distance < 0) {
                    return
                }

                diff = numbers[startIdx] - numbers[startIdx + distance]
                //console.log(`${startIdx} ${distance} ${diff}`)
                if (diff > 3) return

                if (startIdx + distance === 0) {
                    counter += 1

                    if (counter % 100000000 === 0) {
                        console.log(counter)
                    }

                    return
                }
    
                // Traverse into the sublist
                validateSublist(startIdx + distance)

                distance -= 1
                
            }
        }

        validateSublist(numbers.length - 1, numbers[numbers.length-1])

        return counter
    }
}]

export default parts
