import API from "./API";
import nlp  from 'compromise';

const buyCmd = ['buy','shop'];
const expensesCmd = ['paid','spent'];
const scheduleCmd = ['appointment','schedule','class','visit','swim','go'];

export default {
  parse: function(command, user_id) {
    let section = 'NA';
    let doc = nlp(command.toLowerCase());
    console.log(doc.nouns().out('text'));
    console.log(doc.verbs().out('text'));
    console.log(doc.values().out('text'));

    let verb = doc.verbs().out('text').trim();
    let nouns = doc.nouns().out('text').trim();
    let values = doc.values().out('text').trim();
    let cmdObj = {};

    console.log('Verb :' + verb);

    if(buyCmd.includes(verb)){
      section = 'buy';
      cmdObj = { buy: nouns}
    }else if(expensesCmd.includes(verb)){
      section = 'expenses';
      cmdObj = {expenses :[{
                    category : nouns,
                     cost : values}]}                     
    }
    else if(scheduleCmd.includes(verb.trim())){
      section = 'schedule';
      cmdObj = {schedule :[{
          note : nouns,
          time : values  
      }]}
    } 
        
    console.log(cmdObj);

    API.update({cmdObj, user_id:user_id})
    .then(console.log('Updated User with Data'))
    .catch(err => console.log(err)); 

    return section;
  }
};