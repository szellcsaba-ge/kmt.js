export class HttpMetric {
    private timeVal : any; 
    constructor(private request : any){
    }

    datum(){

        var date = new Date();
        return date.getTime();
    }
    
    async pelda() {
    const baseUrl = 'https://www.index.hu';
    //const queryString = '?num=100&min=1&max=100&col=5&base=10&format=html&rnd=new';
    var options = {
        uri: baseUrl //+ queryString,
    };
    const result = await this.request.get(options);
    return result;
    }
    
    getCurrentValue() {        
        this.timeVal = this.datum();
        this.pelda();             
        return this.datum() - this.timeVal;
      }
  }
  