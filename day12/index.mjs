
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

    workloads: [{
        path: 'day12/sample_2.csv',
        output: 286
    },{
        path: 'day12/full.csv',
        output: 42495,
    }],
    
    run: async (input) => {
        const rows = input.split('\n').map(row => {
            return [row.substring(0, 1), parseInt(row.substring(1))]
        })
        
        let waypointX = 10
        let waypointY = 1

        let shipX = 0
        let shipY = 0

        let currentHeading = 0

        let headings = ['NE','SE','SW','NW']

        const moveWaypointByNInDirection = (heading, n) => {
            switch(heading) {
                case 'N':
                    waypointY += n
                    break
                case 'S':
                    waypointY -= n
                    break
                case 'E':
                    waypointX += n
                    break
                case 'W':
                    waypointX -= n
                    break
            }
        }

        const rotateByNTurns = (sign, turns) => {
            //console.log(`Rotate waypoint by ${sign} * ${turns}`)

            for (let i=0; i<turns; ++i) {
                let newHeading = currentHeading + (1 * sign)
                
                if (newHeading == 4) {
                    newHeading = 0
                } else if (newHeading == -1) {
                    newHeading = 3
                }

                // 8 permutations splatted out, ugh
                if (sign == 1 && currentHeading === 0 && newHeading === 1) {
                    // NE to SE
                    const tempX = waypointY
                    const tempY = waypointX
                    waypointX = tempX
                    waypointY = -tempY
                } else if (sign == 1 && currentHeading === 1 && newHeading === 2) {
                    // SE to SW
                    const tempX = waypointY
                    const tempY = -waypointX
                    waypointX = tempX
                    waypointY = tempY
                } else if (sign == 1 && currentHeading === 2 && newHeading === 3) {
                    // SW to NW
                    const tempX = waypointY
                    const tempY = waypointX
                    waypointX = tempX
                    waypointY = -tempY
                } else if (currentHeading === 3 && newHeading === 0) {
                    // NW to NE
                    const tempX = waypointY
                    const tempY = -waypointX
                    waypointX = tempX
                    waypointY = tempY
                } else if (sign == -1) {// && currentHeading === 1 && newHeading === 0) {
                    // All left turns are just X getting -Y
                    const tempX = -waypointY
                    const tempY = waypointX
                    waypointX = tempX
                    waypointY = tempY
                }

                //console.log(`After rotating from ${headings[currentHeading]} to ${headings[newHeading]} waypoint is ${waypointX},${waypointY}`)

                // After each turn, update heading
                currentHeading = newHeading
            }
            
        }

        rows.forEach(row => {
            let newHeading = 0
            switch(row[0]) {
                case 'F':
                    shipX += (waypointX * row[1])
                    shipY += (waypointY * row[1])
                    break
                case 'N': // Otherwise, move waypoint in the given heading
                case 'E':
                case 'W':
                case 'S':
                    moveWaypointByNInDirection(row[0], row[1])
                    break
                case 'L':
                    rotateByNTurns(-1, row[1] / 90)
                    break
                case 'R':
                    rotateByNTurns(1, row[1] / 90)
            }
            //console.log(`After ${row} waypoint is ${waypointX},${waypointY} and ship is ${shipX},${shipY}`)
        })

        return Math.abs(shipX) + Math.abs(shipY)
    }
}]

export default parts
