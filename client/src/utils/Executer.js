import API from "./API";
import nlp  from 'compromise';
import moment from 'moment';
import chrono from 'chrono-node';

const buyCmd = ['buy','shop'];
const expensesCmd = ['paid','spent'];
const scheduleCmd = ['appointment','schedule','class','visit','swim','go'];

export default {
  parse: function(command, user_id) {
    var plugin = {
      tags:{
        Character:{
          isA: 'Noun'
        }
      },
      words:{
        itchy: 'Character',
        scratchy: 'Character'
      }
    }
    nlp.plugin(plugin)
    nlp(command.toLowerCase()).debug()
    /*
       couldn't   - #Modal, #Verb
       itchy      - #Character, #Noun
       share      - #Infinitive, #Verb
       ...
    */


    let section = 'NA';
    let doc = nlp(command);
    
    let verb = doc.verbs().out('text').trim().toLowerCase();
    let nouns = doc.nouns().out('text').trim();
    let values = doc.values().out('text').trim();
    let intValues = doc.values().toNumber().out().trim();
    let dateValue = doc.dates().out('text').trim();
    let chronoDate = chrono.parseDate(command);
    let momentDt = chronoDate?moment(chronoDate):new Date(Date.now());

    console.log('Chrono Date : ' + chronoDate); 
    console.log('Moment Date : ' + momentDt);

    console.log('Verb :' + verb);
    console.log('Nouns :' + nouns);
    console.log('Values :' + values);
    console.log('intValues :' + intValues);
    console.log('dateValues :' + dateValue);
    
    let cmdObj = {};

    if(buyCmd.includes(verb)){
      section = 'buy';
      cmdObj = { buy: nouns}
    }else if(expensesCmd.includes(verb)){
      section = 'expenses';
      cmdObj = {expenses :[{
                    category : nouns,
                     cost : values}]}                     
    }
    else if(scheduleCmd.includes(verb.trim()) || dateValue){
      section = 'schedule';
      cmdObj = {schedule :[{
          note : nouns,
          time : momentDt
      }]}
    } 
        
    console.log(cmdObj);

    API.update({cmdObj, user_id:user_id})
    .then(console.log('Updated User with Data'))
    .catch(err => console.log(err)); 

    return section;
  }
};