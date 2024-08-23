const express = require('express');
const Pusher = require('pusher');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const pusher = new Pusher({
    appId: '1854282',
    key: '036bae6a0be2a39c4d84',
    secret: '99a7d6288780c39bf338',
    cluster: 'ap3',
    useTLS: true
});

app.post('/start', (req, res) => {
    const { setHours, setMinutes, setSeconds } = req.body;
    const startTime = new Date();
    startTime.setHours(setHours, setMinutes, setSeconds, 0);

    pusher.trigger('clock-channel', 'start', {
        startTime: startTime.getTime(),
        simulatedTime: 0
    });

    res.send('Clock started');
});

app.post('/reset', (req, res) => {
    pusher.trigger('clock-channel', 'reset', {});

    res.send('Clock reset');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
