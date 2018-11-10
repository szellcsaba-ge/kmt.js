export class HttpMetric {
    private timeVal : any; 
    constructor(private request : any, private baseUrl : any){
    }

    datum(){

        var date = new Date();
        return date.getTime();
    }
    
    async pelda() {    
    var options = {
        uri: this.baseUrl
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
  