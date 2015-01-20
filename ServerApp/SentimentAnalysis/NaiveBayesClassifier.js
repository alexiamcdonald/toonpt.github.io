﻿//[Naive Bayes Classifier System]
var fs = require('fs');

(function () {
    
    "use strict";
    //[Define your library strictly]
    
    function NaiveBayesClassifier() {
        
        //[Private data]
        var POSITIVE = 'positive';
        var NEUTRAL = 'neutral';
        var NEGATIVE = 'negative';

        var trainingDataPercentage = 70;

        //select data from the [beginning], from the [middle] or from the [end] of the array
        var selectDataFrom = 'beginning';
        
        var trainData = {};
        trainData[POSITIVE] = [];
        trainData[NEUTRAL] = [];
        trainData[NEGATIVE] = [];

        var testData = {};
        testData[POSITIVE] = [];
        testData[NEUTRAL] = [];
        testData[NEGATIVE] = [];

        var unigramsData = {};
        unigramsData[POSITIVE] = {}
        unigramsData[NEUTRAL] = {}
        unigramsData[NEGATIVE] = {}


        //[Private Methods]
        function takeElements(data, classe) {
            //Math.ceil() = round up result (0.7 = 1)
            var countTraining = Math.ceil((data[classe].length * trainingDataPercentage) / 100);
            var countValidation = data[classe].length - countTraining;
            if (selectDataFrom === 'beginning') {
                trainData[classe] = data[classe].slice(0, countTraining);
                testData[classe] = data[classe].slice(countTraining, data[classe].length);
            }else if (selectDataFrom === 'middle') {
                var divisionInTwo = Math.ceil(countValidation / 2);
                trainData[classe] = data[classe].slice(divisionInTwo, countTraining);
                testData[classe].push(data[classe].slice(0, divisionInTwo));
                testData[classe].push(data[classe].slice((divisionInTwo + countTraining), data[classe].length));
            }else if (selectDataFrom === 'end') {
                trainData[classe] = data[classe].slice(0, countValidation);
                testData[classe] = data[classe].slice(countValidation, data[classe].length);
            }
            console.log("    -For training " + classe + "[" + data[classe].length + "] are: " + countTraining + ", and for Validation = " + countValidation);
        }

        function separateTrainingAndValidationData(data, from) {
            console.log("   -Percentage data for Training = " + trainingDataPercentage);
            console.log("    -Slip data from the " + selectDataFrom);
            takeElements(data, POSITIVE, from);
            takeElements(data, NEUTRAL, from);
            takeElements(data, NEGATIVE, from);
        }
        
        function countWords(data, arrayWords) {
            data.forEach(function (text) {
                var words = text.split(' ');
                words.forEach(function (word) {
                    if (word.length > 0) {
                        if (arrayWords[word] != null) {
                            arrayWords[word] = arrayWords[word] + 1;
                        } else {
                            arrayWords[word] = 1;
                        }
                    }
                });
            });
            return arrayWords;
        }

        function countTotalWordsAppear(data) {
            var totalWords = {};
            totalWords = countWords(data.positive, totalWords);
            totalWords = countWords(data.neutral, totalWords);
            totalWords = countWords(data.negative, totalWords);
            return totalWords;
        }
        
        //Use JSON... leave the TXT files...
        //function saveWordsDataToFile(totalWords) {
        //    var wordsFilePath = "./SentimentData/wordsTXT.txt";
        //    console.log("   -Save Words Data to TXT file.");
        //    for (var key in totalWords) {
        //        if (totalWords.hasOwnProperty(key)) {
        //            var str = key + " > " + totalWords[key] + "\n";
        //            fs.appendFileSync(wordsFilePath, str);
        //        }
        //    }
        //    console.log('    -It\'s saved!');
        //}
        
        function saveJsonDataToFile(totalWords) {
            var wordsFilePath = "./SentimentData/wordsJSON.txt";
            console.log("   -Save Words Data to JSON file.");
            var jsonString = JSON.stringify(totalWords);
            fs.writeFile(wordsFilePath, jsonString);
        }

        function trainSystem() {
            //Classes Counts
            var countPositive = trainData[POSITIVE].length;
            var countNeutral = trainData[NEUTRAL].length;
            var countNegative = trainData[NEGATIVE].length;
            var countAll = countPositive + countNeutral + countNegative;
            
            //Classes Probabilities
            var positiveProbabilty = countPositive / countAll;
            console.log("   -Positive Prior Probability = " + positiveProbabilty);
            var neutralProbability = countNeutral / countAll;
            console.log("   -Neutral Prior Probability = " + neutralProbability);
            var negativeProbabilty = countNegative / countAll;
            console.log("   -Negative Prior Probability = " + negativeProbabilty);

            //Words Probabilities
            //setupUnigramsData();
        }
        
        //[Public Methods]
        this.Start = function (data) {
            console.log("  -Start Naive Bayes Classifier...");

            //Train...
            console.log("   -System not trained... Train it:");

            var totalWords = countTotalWordsAppear(data);
            //saveWordsDataToFile(totalWords);
            saveJsonDataToFile(totalWords);

            separateTrainingAndValidationData(data, selectDataFrom);
            trainSystem();
            //Or read trained system...

        }
    }
    
    //[Export the Naive Bayes System Object]
    module.exports = NaiveBayesClassifier;
}());