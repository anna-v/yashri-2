/**
 * Реализация API, не изменяйте ее
 * @param {string} url
 * @param {function} callback
 */
function getData(url, callback) {
    var RESPONSES = {
        '/countries': [
            {name: 'Cameroon', continent: 'Africa'},
            {name :'Fiji Islands', continent: 'Oceania'},
            {name: 'Guatemala', continent: 'North America'},
            {name: 'Japan', continent: 'Asia'},
            {name: 'Yugoslavia', continent: 'Europe'},
            {name: 'Tanzania', continent: 'Africa'}
        ],
        '/cities': [
            {name: 'Bamenda', country: 'Cameroon'},
            {name: 'Suva', country: 'Fiji Islands'},
            {name: 'Quetzaltenango', country: 'Guatemala'},
            {name: 'Osaka', country: 'Japan'},
            {name: 'Subotica', country: 'Yugoslavia'},
            {name: 'Zanzibar', country: 'Tanzania'},
        ],
        '/populations': [
            {count: 138000, name: 'Bamenda'},
            {count: 77366, name: 'Suva'},
            {count: 90801, name: 'Quetzaltenango'},
            {count: 2595674, name: 'Osaka'},
            {count: 100386, name: 'Subotica'},
            {count: 157634, name: 'Zanzibar'}
        ]
    };

    setTimeout(function () {
        var result = RESPONSES[url];
        if (!result) {
            return callback('Unknown url');
        }

        callback(null, result);
    }, Math.round(Math.random * 1000));
}

/**
 * Ваши изменения ниже
 */
(function(){
    'use strict';
    var input = prompt("Введите название интересующего континента/страны/города", "Africa"),
        requests = ['/countries', '/cities', '/populations'],
        responses = {}, i;

    // "Отловим" значение каждого request-а с помощью вынесния функции callback
    function callback(request) {
        return function (error, result) {
            responses[request] = result;
            var l = [], countries = [], cities = [], population = 0, K, i, j;

            for (K in responses) {
                if (responses.hasOwnProperty(K)) {
                    l.push(K);
                }
            }

            if (l.length === 3) {
                for (i = 0; i < responses['/countries'].length; i++) {
                    if (responses['/countries'][i].continent === input) {
                        countries.push(responses['/countries'][i].name);
                    }
                }

                // Проверим, была ли введена страна: если введенное название есть
                // среди массива, то countries.length не будет равен 0
                if (countries.length === 0) countries.push(input);

                for (i = 0; i < responses['/cities'].length; i++) {
                    for (j = 0; j < countries.length; j++) {
                        if (responses['/cities'][i].country === countries[j]) {
                            cities.push(responses['/cities'][i].name);
                        }
                    }
                }

                // Аналогично проверим, был ли введен город:
                if (cities.length === 0) cities.push(input);

                for (i = 0; i < responses['/populations'].length; i++) {
                    for (j = 0; j < cities.length; j++) {
                        if (responses['/populations'][i].name === cities[j]) {
                            population += responses['/populations'][i].count;
                        }
                    }
                }

                // Вывод ответа через alert
                alert(population?'Население '+ input +' составляет '+ population +' человек.':'В "'+input+'" никого нет!');
            }
        };
    }

    // Вызов функции - три итерации с отдельным request-ом в каждой
    for (i = 0; i < 3; i++) {
        getData(requests[i], callback(requests[i]));
    }
})();
