onmessage = function(job){
    console.log('worker: start');
    
    const arrA = job.data[0].split("\n"),
        arrB = job.data[1].split("\n"),
        br = "\n",
        regPhone = /^\d{12}$/,
        regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        arrBad = [],
        reg = job.data[2] == 'email' ? regEmail : regPhone,
        arrGood = arrA.filter(function(elA){
            if(reg.test(elA)){
                return arrB.every(function(elB){
                    return elB != elA;
                });
            }else{
                arrBad.push(elA);
                return false;
            }
        });
    
    postMessage({
       textGood : arrGood.join(br),
        textBad : arrBad.join(br),
        lenGood : arrGood.length,
        lenBad  : arrBad.length
    });
    
    
    console.log('worker: end');   
}