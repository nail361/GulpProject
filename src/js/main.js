class Main{

    constructor(){
        let self = this;

        this.mainNode;

        window.onload = function(){
            self.Init();
        };
    }

    Init(){
        let onSwitchThemeListener = this.SwitchColorTheme;
        this.mainNode = document.getElementsByClassName('main_div')[0];
        this.mainNode.addEventListener("click", onSwitchThemeListener.bind(this));
    }

    SwitchColorTheme(event){
        console.log(event.target);
        if (event.target.hasAttribute('data-target')){
            //event.stopProp
        }
        this.mainNode.classList.toggle('red_theme');
    }

}
new Main();
