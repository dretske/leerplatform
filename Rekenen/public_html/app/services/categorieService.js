'use strict';

/* Services */

var rekenenServices = angular.module('rekenenServices');

rekenenServices.factory('CategorieService', [
    function () {
        
        var categorieen = [
           {id: 'rekenen', titel: 'Rekenen', path: 'images/rekenenMenuItem.png'}, 
           {id: 'lezen', titel: 'Lezen', path: 'images/lezenMenuItem.png'}, 
           {id: 'schrijven', titel: 'Schrijven', path: 'images/schrijvenMenuItem.png'}
        ];
        
        function getCategorie(id) {
            for (var i=0; i<categorieen.length; i++) {
                if (categorieen[i].id === id) {
                    return categorieen[i];
                }
            }
            return null;
        }
        
        function getCategorieen() {
            return categorieen;
        }
        
        return {
            getCategorie: getCategorie,
            getCategorieen: getCategorieen
        };
    }
]);
