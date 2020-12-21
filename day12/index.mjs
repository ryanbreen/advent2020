
const parts = [{
    name: 'day 12, part 1',

    workloads: [{
        path: 'day12/sample.csv',
        output: 0
    },{
        path: 'day12/full.csv',
        output: 445
    }],

    run: async (input) => {
        const rows = input.split('\n').map(row => {
            return [row.substring(0, 1), parseInt(row.substring(1))]
        })
        
        let x = 0
        let y = 0

        let currentHeading = 0

        let headings = ['E','S','W','N']

        const moveByNInDirection = (heading, n) => {

            switch(heading) {
                case 'N':
                    y += n
                    break
                case 'S':
                    y -= n
                    break
                case 'E':
                    x += n
                    break
                case 'W':
                    x -= n
                    break
            }
        }

        rows.forEach(row => {
            let targetHeading = row[0]
            switch(row[0]) {
                case 'F':
                    // If we are going forward, move in the current heading
                    targetHeading = headings[currentHeading]
                case 'N': // Otherwise, move in the given heading
                case 'E':
                case 'W':
                case 'S':
                    moveByNInDirection(targetHeading, row[1])
                    break
                case 'L':
                    // Find new heading by dividing row[1] by 90, subtracting
                    // result from current heading, and modding by headings array
                    // to get the correct heading
                    currentHeading -= row[1] / 90
                    if (currentHeading < 0) {
                        currentHeading = (4 + currentHeading) % 4
                    }
                    break
                case 'R':
                    // Find new heading by dividing row[1] by 90, adding
                    // result to current heading, and modding by headings array
                    // to get the correct heading
                    currentHeading += row[1] / 90
                    if (currentHeading > 3) {
                        currentHeading %= 4
                    }
            }
        })

        return Math.abs(x) + Math.abs(y)
    }
},{
    name: 'day 12, part 2',

    workloads: [/*{
        path: 'day12/sample.csv',
        output: 8
    },{
        path: 'day12/full.csv',
        output: 42313823813632,
    }*/],
    
    run: async (input) => {
        const rows = input.split('\n')
    }
}]

export default parts
