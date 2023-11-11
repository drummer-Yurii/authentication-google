const express = require('express');
const stytch = require('stytch');
const app = express();
require('dotenv').config();

const client = new stytch.Client({
  project_id: process.env.STYTCH_PID,
  secret: process.env.STYTCH_SECRET,
  env: process.env.STYTCH_ENV === 'test' ? stytch.envs.test : stytch.envs.live,
});

app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/auth', async (req, res) => {
    const { token } = req.query
    try {
        const response = await client.oauth.authenticate(token, {
            session_management_type: 'stytch',
            session_duration_minutes: 5
        })

        const session_token = response.session.stytch_session.session_token

        res.redirect(`http://localhost:3000?session_token=${session_token}`);
    } catch (err) {
        rea.status(400).json({
            success: false,
            message: "Error authenticating",
            error: err
        })
    }
})

app.post('/verify', async (req, res) => {
    const { token } = req.body
    try {
        await client.sessions.authenticate({session_token: token})
        res.status(200).json({
            success: true,
            message: "Session Verified"
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Error Authenticating",
            error: err
        })
    }
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server listening on port ${port}`))