var db = require('../db/playout.db');
var _ = require('underscore');

/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
var filterDao = {}

/**
 * find filter by id
 * @return {Array<FilterModel>} 
 */
filterDao.listAll = function(callback)
{
    var filterList = [];
    var filterArgsList = [];

	db.query(  "SELECT f.id AS f_id, f.name, f.description, fa.id AS fa_id, fa.filterId, fa.key, fa.description AS fa_description " +
                "FROM Filter f " +
                "LEFT JOIN FilterArgs fa ON fa.filterId = f.id ",
            function(err, rows) {
                console.log(err);
                //keep only unique filter object
                filterList= _.unique(rows,"f_id").map(function(item){
                    return {
                        id : item.f_id,
                        name : item.name,
                        description : item.description,
                        filterArgsList : []
                    }
                });
    
                 //keep only unique filterArgs object
                filterArgsList= _.unique(rows,"fa_id").map(function(item){
                    return {
                        id : item.fa_id,
                        filterId : item.filterId,
                        key : item.key,
                        description : item.fa_description                        
                    }
                });
                
                //get filterArgs list for each media
                filterList.forEach(filter => 
                    filterArgsList.forEach(function(filterArgs){
                        if(filter.id == filterArgs.filterId)
                            filter.filterArgsList.push(filterArgs);                       
                    })
                );
 
                callback(err, filterList);
    });

    db.end();
}

module.exports = filterDao;