import React from "react";
import Card from "./Card.js";
import images from "./image.js";
import "./board.css"
import Reset from "./reset"
import Victoire from "./victoire.js"



export default class Board extends React.Component{
    constructor(props){
        super(props)
        const imageName =[
            "clubs_2",
            "clubs_3",
            "clubs_4",
            "clubs_5",
            "clubs_6",
            "clubs_8",
            "clubs_9",
            "clubs_10",
            "clubs_A",
            "clubs_J",
            "clubs_Q",
            "clubs_K"
        ]
        const imgtemp = imageName.slice(0,this.props.boardDifficulty*4)
        const imgRandom = imgtemp
            .concat(imageName.slice(0,this.props.boardDifficulty*4))
            .sort(() => Math.random() - 0.5)
            .map(f => {
                return{
                    content:f,
                    faceUp:false,
                    fixed:false
                }
            })
        this.state= {
            deck:imgRandom,
            history:[imgRandom],
            historyScore:[{"player1":0,"player2":0}],
            firstCard:null,
            same:false,
            dispo:true,
            win:false,
            time:0,
            tabScore:[],
            player1:{
                score:0,
                name:this.props.boardName1
            },
            player2:{
                score:0,
                name:this.props.boardName2
            },
            joueur:false,
            timerOn: false,
            timerStart: 0,
            timerTime: 0,
        }
    }
    startTimer = () => {
        this.setState({
          timerOn: true,
          timerTime: this.state.timerTime,
          timerStart: Date.now() - this.state.timerTime
        });
        this.timer = setInterval(() => {
          this.setState({
            timerTime: Date.now() - this.state.timerStart
          });
        }, 10);
      };
    
      stopTimer = () => {
        this.setState({ timerOn: false });
        clearInterval(this.timer);
      };
    
      resetTimer = () => {
        this.setState({
          timerStart: 0,
          timerTime: 0
        });
      };
    rejouer(){
        this.setState({
            win:false
        })
        this.shuffle()
        const player = {score:0,name:this.state.player1.name}
        const player4 = {score:0,name:this.state.player2.name}
        this.setState({
            player1:player
        })
        this.setState({
            player2:player4
        })
    }
    retourneDeux(index){
        this.setState({dispo:false})
        setTimeout(() =>{
            this.setState({
                deck: this.state.deck.map((f,i) => {
                    if(i === index){
                        return{
                            content: f.content,
                            faceUp: !f.faceUp,
                            fixed: f.fixed,
                        }
                    }else{
                        return f;
                    }
                })
            })
        },1)
        this.setState({dispo:true})
    }

    shuffle(){
        const imageName =[
            "clubs_2",
            "clubs_3",
            "clubs_4",
            "clubs_5",
            "clubs_6",
            "clubs_8",
            "clubs_9",
            "clubs_10",
            "clubs_A",
            "clubs_J",
            "clubs_Q",
            "clubs_K"
        ]
        const imgtemp = imageName.slice(0,this.props.boardDifficulty*4)
        const imgRandom = imgtemp
            .concat(imageName.slice(0,this.props.boardDifficulty*4))
            .sort(() => Math.random() - 0.5)
            .map(f => {
                return{
                    content:f,
                    faceUp:false,
                    fixed:false
                }
            })
        this.setState({deck:imgRandom})
        const tab = [].concat(imgRandom)
        this.setState({history:tab})
    }
    backToPrevious(){
        if(this.state.history.length>0){
            const len = this.state.history[this.state.history.length-2]
            this.setState({
                deck:len
            })
        }
        if(this.state.historyScore.len>0){
            const score1 = this.state.historyScore[this.state.historyScore.length-2].joueur1
            const score2 = this.state.historyScore[this.state.historyScore.length-2].joueur2
            const name1 = this.state.player1.name
            const name2 = this.state.player2.name
            this.setState({
                player1:{score:score1,name:name1}
            })
            this.setState({
                player2:{score:score2,name:name2}
            })
            const newHistory = this.state.history.slice(this.state.history.length-2)
            this.setState({
                history:newHistory
            })
        }
        console.log(this.state.history)
    }

    flipCardTo(index,faceUp,fixed){
        this.setState({
            deck: this.state.deck.map((f,i) => {
                if(i === index){
                    return{
                        content: f.content,
                        faceUp: faceUp,
                        fixed: fixed,
                    }
                }else{
                    return f;
                }
            })
        })
    }

    testWin(){
        const machin = (currentValue) => currentValue.faceUp === true;
        if(this.state.deck.every(machin)){
            this.setState({win:true})
            setTimeout( () => {
                this.calcTotal()
            },10)
        }
    }
    calcTotal(){
        const truc = this.state.tabScore.concat({"player1":this.state.player1.score,"player2":this.state.player2.score})
        this.setState({tabScore:truc})
    }

    addPoint(player){
        if(player === "player1"){
            const dict1 = this.state.player1
            this.setState({player1:{score:dict1.score+3,name:dict1.name}})
        }else{
            const dict2 = this.state.player2
            this.setState({player2:{score:dict2.score+3,name:dict2.name}})
        }
    }
    takeOfPoint(player){
        if(player === "player1"){
            const dict1 = this.state.player1
            this.setState({player1:{score:dict1.score-1,name:dict1.name}})
        }else{
            const dict2 = this.state.player2
            this.setState({player2:{score:dict2.score-1,name:dict2.name}})
        }
    }

    reset(){
        const player = {score:0,name:this.state.player1.name}
        const player4 = {score:0,name:this.state.player2.name}
        this.setState({
            player1:player
        })
        this.setState({
            player2:player4
        })
        this.setState({
            deck: this.state.deck.map((f) => {
                if(f.faceUp === true){
                    return{
                        content: f.content,
                        faceUp: false,
                        fixed: f.fixed,
                    }
                }else{
                    return f;
                }
            })
        })
    }
    add(){
        const historique = this.state.history;
        const actu = [this.state.deck];
        const historiqueScore = this.state.historyScore;
        const actuScore = [{"joueur1":this.state.player1.score,"joueur2":this.state.player2.score}];
        this.setState({history:historique.concat(actu)})
        this.setState({historyScore:historiqueScore.concat(actuScore)})
        
    }
    handleClick(index){
        if(this.state.joueur){
            if(this.state.dispo){
                if(this.state.firstCard === null){
                    this.setState({firstCard:index})
                    this.flipCardTo(index, true,false)
                }else{
                    if(index !== this.state.firstCard){
                        this.flipCardTo(index, true,false)
                        const firstCardContent = this.state.deck[this.state.firstCard].content
                        const secondCardContent = this.state.deck[index].content
                        if(firstCardContent === secondCardContent){
                            setTimeout(() => {
                                this.flipCardTo(index, true,true)
                                this.flipCardTo(this.state.firstCard, true,true)
                                this.setState({firstCard:null});
                                this.testWin();
                                this.addPoint("player1")
                            },10)
                        }else{
                            this.setState({dispo:false})
                            this.takeOfPoint("player1")
                            setTimeout(() => {
                                this.retourneDeux(this.state.firstCard);
                                this.retourneDeux(index);
                                this.setState({firstCard:null});
                                this.setState({joueur:!this.state.joueur})
                            },1000)
                            setTimeout(() => {
                                this.setState({dispo:true})
                            },1005)
                        }
                    }
                }
            }
        }else{
            if(this.state.dispo){
                if(this.state.firstCard === null){
                    this.setState({firstCard:index})
                    this.flipCardTo(index, true,false)
                }else{
                    if(index !== this.state.firstCard){
                        this.flipCardTo(index, true,false)
                        const firstCardContent = this.state.deck[this.state.firstCard].content
                        const secondCardContent = this.state.deck[index].content
                        if(firstCardContent === secondCardContent){
                            setTimeout(() => {
                                this.flipCardTo(index, true,true)
                                this.flipCardTo(this.state.firstCard, true,true)
                                this.setState({firstCard:null});
                                this.testWin();
                                this.addPoint("player2")
                            },10)
                        }else{
                            this.setState({dispo:false})
                            this.takeOfPoint("player2")
                            setTimeout(() => {
                                this.retourneDeux(this.state.firstCard);
                                this.retourneDeux(index);
                                this.setState({firstCard:null});
                                this.setState({joueur:!this.state.joueur})
                            },1000)
                            setTimeout(() => {
                                this.setState({dispo:true})
                                this.add()
                            },1005)
                        }
                    }
                }
            }

        }
        setTimeout(() => {
            this.add()
        },10)
    };
    randomImages(){
        const { timerTime } = this.state;
        let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
        let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
        let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
        if(this.state.win){
            return(
                <Victoire 
                    score1={this.state.player1.score} 
                    score2={this.state.player2.score}
                    name1={this.state.player1.name}
                    name2={this.state.player2.name}
                    rejouer={() => this.rejouer()}
                    scoreTotal={this.state.tabScore}
                />
            )
        }
        return (<>
                <div className="chrono">
                    <div className="Stopwatch">
                        <div className="Stopwatch-header">Stopwatch</div>
                        <div className="Stopwatch-display">
                        {hours} : {minutes} : {seconds} : {centiseconds}
                        {this.state.timerOn === false && this.state.timerTime === 0 && (
                            <button onClick={this.startTimer}>Start</button>
                        )}
                        {this.state.timerOn === true && (
                            <button onClick={this.stopTimer}>Stop</button>
                        )}
                        {this.state.timerOn === false && this.state.timerTime > 0 && (
                            <button onClick={this.startTimer}>Resume</button>
                        )}
                        {this.state.timerOn === false && this.state.timerTime > 0 && (
                            <button onClick={this.resetTimer}>Reset</button>
                        )}
                        </div>
                    </div>
                </div>        
                <div className="turn">
                    It's {this.state.joueur ? this.state.player1.name : this.state.player2.name}'s turn to play
                </div>
                <div className="separator"></div>
                <div className="CardGrid">{
                this.state.deck.map((f,index) => {
                return (
                    <div className="Cards">
                        <Card 
                            content={images(f.content)} 
                            cardOnClick={() => this.handleClick(index)}
                            state={f.faceUp}
                            id={index}
                        />
                    </div>
                    )
                })
            }</div>
            <div className="outer-div">
                <div className="score">{this.state.player1.name}'s score : {this.state.player1.score}</div>
                <div className="separator"></div>
                <div className="score">{this.state.player2.name}'s score : {this.state.player2.score}</div>
                <div className="separator"></div>
                <Reset ResetOnClick={() => this.reset()}/>
            </div>
            <div className="outer-div">
                <button onClick={() => this.backToPrevious()}> Back to previous</button>
            </div>
        </>
        )
    }
    render(){
        return(
            this.randomImages(this.state.name)
        )
    }
}