onmessage = function(job){
    console.log('worker: start');
    
    let arrA = job.data[0].split("\n"),
        arrB = job.data[1].split("\n"),
//        br = "<br>",
        br = "\n",
        arrBad = [],
        arrGood = arrA.filter(function(elA){
            if(/^\d{12}$/.test(elA)){
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