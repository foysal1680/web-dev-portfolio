class logger{
    constructor(){
        this._logger=console.log;
    }

    info(message){
        this._logger(chalk.green(message));

    }
    error(message){
        this._logger(chalk.red(message));
    }
     warn(message){
        this._logger(message);
     }
    
    
    
}

const logger=new Logger();
module.exports=logger;

