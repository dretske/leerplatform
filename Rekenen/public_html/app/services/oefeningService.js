'use strict';

/* Services */

var rekenenServices = angular.module('rekenenServices');

rekenenServices.factory('OefeningService', [
    function () {
        
        var oefeningenMap = [
            {
                categorie: 'rekenen', 
                oefeningen: [
                    {
                        titel: 'Optellen', 
                        subtitel: '1 tot 3',
                        niveau: 1, 
                        path: 'rekenen?max=3&graphical=true&style=apple&subtraction=false'
                    }, 
                    {
                        titel: 'Optellen en aftrekken', 
                        subtitel: '1 tot 3',
                        niveau: 1,
                        path: 'rekenen?max=3&graphical=true&style=ijsjes'
                    }, 
                    {
                        titel: 'Optellen en aftrekken', 
                        subtitel: '1 tot 3',
                        niveau: 2,
                        path: 'rekenen?withoutZero=true&max=3'
                    }, 
                    {
                        titel: 'Optellen en aftrekken', 
                        subtitel: '0 tot 5',
                        niveau: 3,
                        path: 'rekenen?max=5'
                    }, 
                    {
                        titel: 'Optellen en aftrekken', 
                        subtitel: '0 tot 8',
                        niveau: 4, 
                        path: 'rekenen?max=8'
                    }
                ]
            }
        ];
        
        function getOefeningenVoorCategorie(categorie) {
            for(var i=0; i<oefeningenMap.length; i++) {
                if (oefeningenMap[i].categorie === categorie) {
                    return oefeningenMap[i].oefeningen;
                }
            }
            return null;
        }
        
        return {
            getOefeningenVoorCategorie: getOefeningenVoorCategorie
        };
    }
]);
