function GameInicio(gameDiv) {
    var frames = [];
    var framesNames = [];

    for (var i = 0; i < gameDiv.childNodes.length; i++) {
        var id = gameDiv.childNodes[i].id;
        if (id != undefined) {
            var child = gameDiv.childNodes[i];

            if (child.classList.contains("frame")) {
                frames[id] = child;
                framesNames.push(id);
            }
        }
    }

    function setFrameVisible(name) {
        frames[name].classList.remove("hidden");
        frames[name].classList.add("visible");
    }

    function setFrameHidden(name) {
        frames[name].classList.remove("visible");
        frames[name].classList.add("hidden");
    }

    return {
        "setFrameVisible": setFrameVisible,
        "setFrameHidden": setFrameHidden
    };


}

window.addEventListener("load", function () {
    gameInicio = new GameInicio(document.getElementById("gameInicio"));
    
});

var gameIncio;

function scores() {
    
    var totalBestScoresToShow = 5
    showBestScores();
    /******************************* MEJORES PUNTUACIONES (LOCALSTORAGE) *******************************/


    function saveFinalScore() {
        localStorage.setItem(getFinalScoreDate(), getTotalScore());
        showBestScores();
        removeNoBestScores();
    }

    function getFinalScoreDate() {
        var date = new Date();
        return fillZero(date.getDay() + 1) + '/' +
            fillZero(date.getMonth() + 1) + '/' +
            date.getFullYear() + ' ' +
            fillZero(date.getHours()) + ':' +
            fillZero(date.getMinutes()) + ':' +
            fillZero(date.getSeconds());
    }

    function fillZero(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    function getBestScoreKeys() {
        var bestScores = getAllScores();
        bestScores.sort(function (a, b) { return b - a; });
        bestScores = bestScores.slice(0, totalBestScoresToShow);
        var bestScoreKeys = [];
        for (var j = 0; j < bestScores.length; j++) {
            var score = bestScores[j];
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (parseInt(localStorage.getItem(key)) == score) {
                    bestScoreKeys.push(key);
                }
            }
        }
        return bestScoreKeys.slice(0, totalBestScoresToShow);
    }

    function getAllScores() {
        var all = [];
        for (var i = 0; i < localStorage.length; i++) {
            all[i] = (localStorage.getItem(localStorage.key(i)));
        }
        return all;
    }

    function showBestScores() {
        
        var bestScores = getBestScoreKeys();
        var bestScoresList = document.getElementById('puntuaciones');
        if (bestScoresList) {
            clearList(bestScoresList);
            for (var i = 0; i < bestScores.length; i++) {
                addListElement(bestScoresList, bestScores[i], i == 0 ? 'negrita' : null);
                addListElement(bestScoresList, localStorage.getItem(bestScores[i]), i == 0 ? 'negrita' : null);
            }
        }
    }

    function clearList(list) {
        list.innerHTML = '';
        addListElement(list, "Fecha");
        addListElement(list, "Puntos");
    }

    function addListElement(list, content, className) {
        var element = document.createElement('li');
        if (className) {
            element.setAttribute("class", className);
        }
        element.innerHTML = content;
        list.appendChild(element);
    }

    // extendemos el objeto array con un metodo "containsElement"
    Array.prototype.containsElement = function (element) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == element) {
                return true;
            }
        }
        return false;
    };

    function removeNoBestScores() {
        var scoresToRemove = [];
        var bestScoreKeys = getBestScoreKeys();
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (!bestScoreKeys.containsElement(key)) {
                scoresToRemove.push(key);
            }
        }
        for (var j = 0; j < scoresToRemove.length; j++) {
            var scoreToRemoveKey = scoresToRemove[j];
            localStorage.removeItem(scoreToRemoveKey);
        }
    }
    /******************************* FIN MEJORES PUNTUACIONES *******************************/

}