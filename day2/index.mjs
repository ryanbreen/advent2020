
const parts = [{
    name: 'day 2, part 1',

    workloads: [{
        path: 'day2/sample.csv',
        output: 2
    },{
        path: 'day2/full.csv',
        output: 645
    }],

    run: async (input) => {
        // Omit all lines with invalid passwords
        return input.split('\n').filter(line => {
            const match = line.match(/([0-9]*)-([0-9]*) ([a-z]*): ([^$]*)$/)
            match.shift()
            
            const [min, max, char, passwd] = match
            let count = 0
            for (let i=0 ; i<passwd.length; ++i) {
                if (passwd[i] === char) {
                    count += 1
                }
            }

            return min <= count && count <= max
        }).length
    }
},{
    name: 'day 2, part 2',

    workloads: [{
        path: 'day2/sample.csv',
        output: 1
    },{
        path: 'day2/full.csv',
        output: 737
    }],
    
    run: async (input) => {
        // Omit all lines with invalid passwords
        return input.split('\n').filter(line => {
            const match = line.match(/([0-9]*)-([0-9]*) ([a-z]*): ([^$]*)$/)
            match.shift()
            
            let [first, second, char, passwd] = match
            first -= 1
            second -= 1

            return passwd[first] === char ^ passwd[second] === char
        }).length
    }
}]

export default parts