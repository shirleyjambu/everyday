const db = require("./../models");

module.exports = {
  findAll : function(req, res){
    console.log('Schedule Controller');
    db.Activity.find()
      .then((dbArticle) => {
        res.json(dbArticle);
      })
      .catch(err => {
        console.log("Error retrieving Articles." + err)
        res.json(err);
      });
  }
}