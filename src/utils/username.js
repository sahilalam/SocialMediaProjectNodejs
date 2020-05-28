const adjective=[
    'glorious',
    'special',
    'futuristic',
    'decent',
    'southern',
    'loose',
    'understood'
];
const obeject=[
    'Wallas',
    'Halight',
    'Jazog',
    'Nichonstein',
    'Werot',
    'Werot',
    'Halight'
]
const randomnamegenerator=()=>
{
    const first=adjective[Math.floor(Math.random()*7)];
    const second=obeject[Math.floor(Math.random()*7)];
    return `${first} ${second}`;
}
module.exports={randomnamegenerator}
