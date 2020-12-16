function logger(type){
    const types = {
        time : loggerTime,
        name : loggerName
    }

    types[type]();
}

function loggerName(){
    
    const now = Date.now().toString(16);
    const unic = (~~(Math.random() * 10000000000000)).toString(16);

    const name = localStorage.getItem('name') ?? `${now}-${unic}`;

    localStorage.setItem('name', name)
}

function loggerTime(){
    const now = Date.now();
    const times = JSON.parse(localStorage.getItem('times') ?? '[]');
    times.push(now);
    localStorage.setItem('times', JSON.stringify(times));
    // if()
    console.log(now, times);
}

logger('time');
logger('name');