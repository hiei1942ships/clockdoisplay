const socket = new WebSocket('wss://echo.websocket.events/v1/');

let setHours = 0, setMinutes = 0, setSeconds = 0;
let simulatedTime = 0;

socket.onopen = () => {
    console.log('WebSocket connection established.');
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'start') {
        const startTime = new Date(data.startTime);
        simulatedTime = data.simulatedTime;
        setInterval(() => {
            simulatedTime += 1000 * 15;
            const currentTime = new Date(startTime.getTime() + simulatedTime);
            document.getElementById("clock").innerText = currentTime.toTimeString().split(" ")[0];
        }, 1000);
    } else if (data.type === 'reset') {
        document.getElementById("clock").innerText = "00:00:00";
    }
};

function setTime() {
    const timeInput = document.getElementById("timeInput").value;
    if (timeInput) {
        [setHours, setMinutes, setSeconds] = timeInput.split(':').map(Number);
    } else {
        const now = new Date();
        setHours = now.getHours();
        setMinutes = now.getMinutes();
        setSeconds = now.getSeconds();
    }
    document.getElementById("clock").innerText = `${String(setHours).padStart(2, '0')}:${String(setMinutes).padStart(2, '0')}:${String(setSeconds).padStart(2, '0')}`;
}

function startClock() {
    const now = new Date();
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), setHours, setMinutes, setSeconds, 0);
    simulatedTime = 0;

    const message = {
        type: 'start',
        startTime: startTime.getTime(),
        simulatedTime: simulatedTime
    };
    socket.send(JSON.stringify(message));
}

function resetClock() {
    const message = { type: 'reset' };
    socket.send(JSON.stringify(message));
}
