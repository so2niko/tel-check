class CopyDOM{
    constructor(cssName){
        this.cssName = cssName;
    }
    copy(){
         // создать объект - область выделения
            let aos = document.createRange();
            
            // убрать ранее выделенные вещи
            window.getSelection().removeAllRanges();
            
            //добавить в выделение наш див с номерами
            aos.selectNode(document.querySelector(this.cssName));
            
            // указываем окну нашу созданную область выделения
            window.getSelection().addRange(aos);
            
            //выполнить команду - копировать
            document.execCommand('copy');
            
            // убрать ранее выделенные элементы
            window.getSelection().removeAllRanges();
        
        return true;
    }
}