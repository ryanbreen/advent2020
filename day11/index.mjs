
const printMatrix = matrix => {
    matrix.forEach(line => {
        console.log(line.join(' '))
    })
}

const cloneMatrix = matrix => {
    return matrix.map(row => {
        return row.slice()
    })
}

const parts = [{
    name: 'day 11, part 1',

    workloads: [{
        path: 'day11/sample.csv',
        output: 37
    },{
        path: 'day11/full.csv',
        output: 2263
    }],

    run: async (input) => {
        let matrix = input.split('\n').map(line => { return line.split('') })

        let stepCount = 0
        let lastOccupiedCount = 0

        const adjacentsAreOccupied = (row, cell, hurdleRate) => {

            let occupiedCount = 0
            for (let y = row - 1; y <= row + 1; y += 1) {

                // if out of bounds, ignore
                if (y < 0 || y >= matrix.length) {
                    continue
                }

                for (let x = cell - 1; x <= cell + 1; x += 1) {

                    // if out of bounds, ignore
                    if (x < 0 || x >= matrix[y].length) {
                        continue
                    }

                    // Skip self
                    if (x == cell && y == row) {
                        continue
                    }
                    
                    if (matrix[y][x] === '#') {
                        occupiedCount += 1

                        if (occupiedCount >= hurdleRate) return true
                    }
                }
            }
            return false
        }

        const runStep = () => {
            let newMatrix = cloneMatrix(matrix)
            let newOccupiedCount = 0
            for (let row = 0; row < matrix.length; row += 1) {
                for (let cell = 0; cell < matrix[row].length; cell += 1) {
                    const seat = matrix[row][cell]

                    switch(seat) {
                        case 'L': {
                            if (!adjacentsAreOccupied(row, cell, 1)) {
                                newMatrix[row][cell] = '#'
                                newOccupiedCount += 1
                            }
                            break
                        }
                        case '#': {
                            if (adjacentsAreOccupied(row, cell, 4)) {
                                newMatrix[row][cell] = 'L'
                            } else {
                                // Still occupied
                                newOccupiedCount += 1
                            }
                            break
                        }
                    }
                }
            }

            return [newMatrix, newOccupiedCount]
        }

        while (true) {
            stepCount += 1
            const [newMatrix, newOccupiedCount] = runStep()
            if (newOccupiedCount === lastOccupiedCount) {
                return newOccupiedCount
            }

            lastOccupiedCount = newOccupiedCount
            matrix = newMatrix
        }
    }
},{
    name: 'day 11, part 2',

    workloads: [{
        path: 'day11/sample.csv',
        output: 26
    },{
        path: 'day11/full.csv',
        output: 2002,
    }],
    
    run: async (input) => {
        let matrix = input.split('\n').map(line => { return line.split('') })

        let stepCount = 0
        let lastOccupiedCount = 0

        const rays = [
            ['-', '-'],
            ['-', '0'],
            ['-', '+'],
            ['0', '-'],
            ['0', '+'],
            ['+', '-'],
            ['+', '0'],
            ['+', '+'],
        ]

        const rayCast = (y, x, operationY, operationX) => {
            //console.log(`Looking from ${y},${x} in direction ${operationY},${operationX}`)

            while (true) {
                // Perform the operations
                switch(operationY) {
                    case '-':
                        y -= 1
                        break
                    case '+':
                        y += 1
                        break
                }

                switch(operationX) {
                    case '-':
                        x -= 1
                        break
                    case '+':
                        x += 1
                        break
                }

                // Once we reach an edge in any direction, we know we've seen nothing
                if (y < 0 || y >= matrix.length) return false
                if (x < 0 || x >= matrix[0].length) return false

                // If resulting cell is inbounds and is L, return false
                if (matrix[y][x] === 'L') return false

                // If resulting cell is inbounds and is #, return true
                if (matrix[y][x] === '#') return true
            }
        }

        // New approach is to look in each direction until we find a seat
        const adjacentsAreOccupied = (row, cell, hurdleRate) => {

            let occupiedCount = 0
            
            for (const ray in rays) {
                if (rayCast(row, cell, ...rays[ray])) {
                    occupiedCount += 1
                    if (occupiedCount >= hurdleRate) {
                        return true
                    }
                }
            }

            return false
        }

        const runStep = () => {
            let newMatrix = cloneMatrix(matrix)
            let newOccupiedCount = 0
            for (let row = 0; row < matrix.length; row += 1) {
                for (let cell = 0; cell < matrix[row].length; cell += 1) {
                    const seat = matrix[row][cell]

                    switch(seat) {
                        case 'L': {
                            if (!adjacentsAreOccupied(row, cell, 1)) {
                                newMatrix[row][cell] = '#'
                                newOccupiedCount += 1
                            }
                            break
                        }
                        case '#': {
                            if (adjacentsAreOccupied(row, cell, 5)) {
                                newMatrix[row][cell] = 'L'
                            } else {
                                // Still occupied
                                newOccupiedCount += 1
                            }
                            break
                        }
                    }
                }
            }

            return [newMatrix, newOccupiedCount]
        }

        while (true) {
            stepCount += 1
            const [newMatrix, newOccupiedCount] = runStep()
            if (newOccupiedCount === lastOccupiedCount) {
                return newOccupiedCount
            }

            lastOccupiedCount = newOccupiedCount
            matrix = newMatrix
        }
    }
}]

export default parts
