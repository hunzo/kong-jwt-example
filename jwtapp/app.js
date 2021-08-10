const ex = require('express')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')

const app = ex()
app.use(morgan('combined'))

app.get('/', (req, res) => {
    res.json({
        info: 'craft jwt /craftjwt?kid=generat_from_kong?email=email@domain.com&secret=xxxx',
        kid: 'generate from kong',
        email: 'payload',
        secret: 'jwt secret'
    })
})

app.get('/craftjwt', (req, res) => {
    res.json({
        jwt_token: jwt.sign({ email: req.query.email }, req.query.secret, {
            expiresIn: 60 * 1,
            header: { kid: req.query.kid },
        }),
    })
})

app.listen(process.env.PORT || 3000)
