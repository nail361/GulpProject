class Main{

    constructor(){
        const BOARD_SIZE = 20;
        const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        this.memory_array = new Array(BOARD_SIZE-1);

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
        this.card = this.board.querySelector('[data-item]');
        this.card.remove();

        this.memory_array.forEach( (symbol, index)=> {
                this.card.setAttribute("data-item", index);
                this.card.querySelector('.card-back').innerHTML = symbol;
                this.board.insertAdjacentHTML("beforeEnd", this.card.outerHTML);
        });
    }

}
new Main();
