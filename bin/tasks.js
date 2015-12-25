var TaskRunner = require('task-runner').TaskRunner;
var Task = require('task-runner').Task;
var exec = require('child_process').exec;
// var runner1 = new TaskRunner()
//   .async('stepOne', function (next) { next(null, "Returned value" )})
//   .async('second', function (next) { next(null, "second task" )})
//   .start(function (taskRunner) {
//     console.log(arguments);
//      var result = taskRunner.result();
//      console.log(result.stepOne);
//      console.log(result.second);
//   });

var synchronousTask = new Task(function() { console.log('sync'); }, 'sync task', false);
var asyn1 = new Task(function(next) {  console.log('async task1'); next(); }, 'async task1', true);
var asyn2 = new Task(function(next) {  console.log('async task2'); next(); }, 'async task2', true);
var asyn3 = new Task(function(next) {  console.log('async task3'); next(); }, 'async task3', true);

var taskRunner = new TaskRunner();
taskRunner.push(synchronousTask);
taskRunner.push(asyn1);
taskRunner.push(asyn2);
taskRunner.push(asyn3);
taskRunner.start();
