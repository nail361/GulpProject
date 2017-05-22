class Main{

    constructor(){
        const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        this.BOARD_SIZE = 0;

        this.savedCard = null;
        this.memory_array = new Array(this.BOARD_SIZE);
        this.busy = false;
        this.compared = 0;

        while(this.BOARD_SIZE == 0){
            var answer = prompt("Введите размер поля (целое число, кратное двум)");

            if (answer != null) {
                if(answer%2 != 0 || answer.toString().split('.').length>1)
                    alert("Число должно быть чётным и целым!");
                else
                    this.BOARD_SIZE = answer;
            }
        }

        for(let i = 0; i < this.BOARD_SIZE/2; i++){
            this.memory_array[i] = SYMBOLS.charAt(
                Math.round( (Math.random()*(SYMBOLS.length-1)) )
            );
            this.memory_array[this.BOARD_SIZE-1-i] = this.memory_array[i];
        }

        this.ArrayShuffle(this.memory_array);

        document.addEventListener("DOMContentLoaded", this.Init.bind(this));
    }

    ArrayShuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    };

    Init(){
        this.board = document.querySelector('[data-board]');
        this.card = this.board.querySelector('[data-card]');
        this.card.remove();

        this.board.addEventListener('click', this.CardOpen.bind(this));

        this.memory_array.forEach( (symbol, index)=> {
                this.card.setAttribute("data-card", index);
                this.card.querySelector('.card-back').innerHTML = symbol;
                this.board.insertAdjacentHTML("beforeEnd", this.card.outerHTML);
        });
    }

    CardOpen(event){
        if (this.busy) return;
        if(event.target.hasAttribute('data-card-front')){

            if (this.savedCard){

                let curCard = event.target.closest('[data-card]');

                if (this.savedCard.getAttribute('data-card') == curCard.getAttribute('data-card')) return;

                curCard.classList.add('flip');
                let firstChair = curCard.querySelector('[data-card-back]').innerHTML;
                let secondChair = this.savedCard.querySelector('[data-card-back]').innerHTML;

                this.busy = true;
                setTimeout( () => {
                    if (firstChair == secondChair){
                        curCard.querySelector('[data-card-back]').classList.add('completed');
                        this.savedCard.querySelector('[data-card-back]').classList.add('completed');

                        this.compared += 2;

                        if (this.compared == this.BOARD_SIZE){
                            alert('Поздравляем, вы нашли все соответствия!');
                        }
                    }
                    else{
                        this.savedCard.classList.remove('flip');
                        curCard.classList.remove('flip');
                    }

                    this.savedCard = null;
                    this.busy = false;
                }, 1000);

                return;
            }

            this.savedCard = event.target.closest('[data-card]');
            this.savedCard.classList.toggle('flip');
        }
    }

}
new Main();
