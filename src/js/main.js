class Main{

    constructor(){
        const BOARD_SIZE = 30;
        const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        this.savedCard = null;
        this.memory_array = new Array(BOARD_SIZE-1);
        this.busy = false;

        let freeSlotsIndex = new Array(BOARD_SIZE-1);

        for(let i = 0; i < BOARD_SIZE; i++) freeSlotsIndex[i] = i;

        for(let i = 0; i < BOARD_SIZE; i++){

            if (this.memory_array[i] != undefined) continue;

            this.memory_array[i] = SYMBOLS.charAt(
                Math.round( (Math.random()*(SYMBOLS.length-1)) )
            );

            freeSlotsIndex.splice(i,1);

            let pairIndex = Math.round( (Math.random()*(freeSlotsIndex.length-1)) );
            this.memory_array[freeSlotsIndex[pairIndex]] = this.memory_array[i];

            freeSlotsIndex.splice(pairIndex,1);
        }

        document.addEventListener("DOMContentLoaded", this.Init.bind(this));
    }

    Init(){
        this.board = document.querySelector('[data-board]');
        this.card = this.board.querySelector('[data-card]');
        this.card.remove();

        this.board.addEventListener('click', this.CardOpen);

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

                // if (this.savedCard.getAttribute('[data-card]') == curCard.getAttribute('[data-card]')) return;

                curCard.classList.add('flip');
                let firstChair = curCard.querySelector('[data-card-back]').innerHTML;
                let secondChair = this.savedCard.querySelector('[data-card-back]').innerHTML;

                this.busy = true;
                setTimeout( ()=> {
                    if (firstChair == secondChair){
                        curCard.querySelector('[data-card-back]').classList.add('completed');
                        this.savedCard.querySelector('[data-card-back]').classList.add('completed');
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
