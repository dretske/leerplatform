'use strict';

/* Services */

var mainServices = angular.module('mainServices');

mainServices.factory('OefeningService', [
    function () {
        
        var oefeningenMap = [
            {
                categorie: 'rekenen', 
                oefeningen: [
                    {
                        id: 1,
                        titel: 'Optellen', 
                        subtitel: '1 tot 3',
                        niveau: 1, 
                        path: 'rekenen',
                        pathParams: {max: 3, graphical: 'true', style: 'apple', subtraction: 'false'}
                    }, 
                    {
                        id: 2,
                        titel: 'Optellen en aftrekken', 
                        subtitel: '1 tot 3',
                        niveau: 1,
                        path: 'rekenen',
                        pathParams: {max: 3, graphical: 'true', style: 'ijsjes', subtraction: 'true'}
                    }, 
                    {
                        id: 3,
                        titel: 'Optellen en aftrekken', 
                        subtitel: '1 tot 3',
                        niveau: 2,
                        path: 'rekenen',
                        pathParams: {max: 3, withoutZero: 'true'}
                    }, 
                    {
                        id: 4,
                        titel: 'Optellen en aftrekken', 
                        subtitel: '0 tot 5',
                        niveau: 3,
                        path: 'rekenen',
                        pathParams: {max: 5, withoutZero: 'false'}
                    }, 
                    {
                        id: 5,
                        titel: 'Optellen en aftrekken', 
                        subtitel: '0 tot 8',
                        niveau: 4, 
                        path: 'rekenen',
                        pathParams: {max: 8, withoutZero: 'false'}
                    }
                ]
            },
            {
                categorie: 'lezen', 
                oefeningen: [
                    {
                        id: 1,
                        titel: 'Juist of Fout', 
                        subtitel: 'Makkelijk',
                        niveau: 1, 
                        path: 'lezen',
                        pathParams: {}
                    }
                ]
            },
            {
                categorie: 'schrijven', 
                oefeningen: [
                    {
                        id: 1,
                        titel: 'Schrijven', 
                        subtitel: 'Woordjes',
                        niveau: 1, 
                        path: 'schrijven',
                        pathParams: {aantalLettersGekend: 'true'}
                    },
                    {
                        id: 2,
                        titel: 'Schrijven', 
                        subtitel: 'Woordjes',
                        niveau: 2, 
                        path: 'schrijven',
                        pathParams: {aantalLettersGekend: 'false'}
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
