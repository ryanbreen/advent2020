
const parts = [{
    name: 'day 5, part 1',

    workloads: [{
        path: 'day5/sample.csv',
        output: 820
    }, {
        path: 'day5/full.csv',
        output: 861
    }],

    run: async (input) => {
        const patterns = input.split('\n')

        const seats = patterns.map(pattern => {
            const row = parseInt(pattern.substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2)
            const column = parseInt(pattern.substring(7, 10).replace(/R/g, '1').replace(/L/g, '0'), 2)
            return row * 8 + column
        }).sort((a, b) => { return b-a })

        return seats[0]
    }
},{
    name: 'day 5, part 2',

    workloads: [{
        path: 'day5/full.csv',
        output: 633
    }],

    run: async (input) => {
        const patterns = input.split('\n')

        let seats = patterns.map(pattern => {
            const row = parseInt(pattern.substring(0, 7).replace(/F/g, '0').replace(/B/g, '1'), 2)
            const column = parseInt(pattern.substring(7, 10).replace(/R/g, '1').replace(/L/g, '0'), 2)
            return row * 8 + column
        }).sort((a, b) => { return a-b })

        seats = seats.filter(s => {
            // Filter first and last row
            return 8 < s && s < 1016
        })

        let i = 0;
        for (; i < seats.length - 1; i += 1) {
            if (seats[i+1] - seats[i] != 1) {
                break
            }
        }
        
        return seats[i] + 1
    }
}]

export default parts