
const parseProgram = tape => {
    return tape.map(instruction => {
        const split = instruction.split(' ')
        return [split[0], parseInt(split[1])]
    })
}

const runProgram = program => {
    let accumulator = 0
    let pc = 0
    const visited = new Set()

    while (true) {
        if (visited.has(pc)) {
            return [false, accumulator]
        }

        if (pc >= program.length) {
            return [true, accumulator]
        }

        visited.add(pc)

        const instruction = program[pc]
        switch (instruction[0]) {
            case 'jmp': 
                pc += instruction[1]
                break
            case 'acc':
                accumulator += instruction[1]
            case 'nop':
            default:
                pc += 1
        }
    }
}

const parts = [{
    name: 'day 8, part 1',

    workloads: [{
        path: 'day8/sample.csv',
        output: 5
    },{
        path: 'day8/full.csv',
        output: 1941
    }],

    run: async (input) => {
        return runProgram(parseProgram(input.split('\n')))[1]
    }
},{
    name: 'day 8, part 2',

    workloads: [{
        path: 'day8/sample.csv',
        output: 8
    },{
        path: 'day8/full.csv',
        output: 2096
    }],
    
    run: async (input) => {
        const program = parseProgram(input.split('\n'))

        let test

        const flipper = (pc, from, to) => {
            program[pc][0] = to
            test = runProgram(program)
            if (test[0]) return test[1]
            program[pc][0] = from
        }

        for (let pc = 0; pc<program.length; ++pc) {
            switch (program[pc][0]) {
                case 'jmp':
                    test = flipper(pc, 'jmp', 'nop')
                    if (test !== undefined) return test
                    break
                case 'nop':
                    test = flipper(pc, 'nop', 'jmp')
                    if (test !== undefined) return test
                    break
            }
        }
    }
}]

export default parts
