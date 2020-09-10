let mv = new Vue({
    el : "#v-root",
    data : {
        lenA : 0,
        lenB : 0,
        textA : "",
        textB : "",
        lenGood : 0,
        lenBad : 0,
        textBad : "",
        textGood : "",
        copyIco : "far fa-copy",
        startIco : "fas fa-flag-checkered",
        startIcoDefault : "fas fa-flag-checkered",
        startIcoLoading : "fas fa-circle-notch fa-spin",
        checkType : 'tel'

    },
    methods : {
        calcA : function(){
            if(this.textA == ""){
                this.lenA = 0; 
            }else{
                this.lenA = this.textA.split("\n").length;
            }
        },
        calcB : function(){
            if(this.textB == ""){
            this.lenB = 0; 
            }else{
            this.lenB = this.textB.split("\n").length;
            }
        },
        cleanAll : function(){
            this.lenA = 0;
            this.textA = "";
            
        },
        copyGood : function(e){
            let cssName = '',
                copiedIco = 'fas fa-copy';
            
            switch(e){
                case 'good':{
                    cssName = '#goodText';
                    break;
                }
                case 'bad':{
                    cssName = '#badText';
                    break;
                }
                default:{
                    cssName = 'body';
                }
            }
            
            let myCopy = new CopyDOM(cssName);
            myCopy.copy();
            
            this.copyIco = copiedIco;
            
        },
        misterProper : function(){
            this.copyIco = 'far fa-copy';
        },
        checkArrs : function(){
            
            this.startIco = this.startIcoLoading;
            
            let myMiner = new Worker('./js/miner.js');

            myMiner.postMessage([this.textA, this.textB, this.checkType]);
            
            console.log("main: send 2 worker");
            
            myMiner.onmessage = function(msg){
                console.log("main: receiver from worker");
                
                mv.lenGood = msg.data.lenGood;
                mv.lenBad = msg.data.lenBad;

                mv.textBad = msg.data.textBad;
                mv.textGood = msg.data.textGood;
                
                mv.startIco = mv.startIcoDefault;

            }
        },
        changeType : function(type = 'tel'){
            this.checkType = type;
        }
    }
});

