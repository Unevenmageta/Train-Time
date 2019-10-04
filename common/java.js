$(document).ready(function () {

    var firebaseConfig = {
        apiKey: "AIzaSyAClc0rk8P-BEJd9mFzPGq09s0fogEUUrs",
        authDomain: "train-7e51a.firebaseapp.com",
        databaseURL: "https://train-7e51a.firebaseio.com",
        projectId: "train-7e51a",
        storageBucket: "",
        messagingSenderId: "753385247112",
        appId: "1:753385247112:web:28d6b46ffdd4542b786a3d"
    };
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();


    var trainName;
    var destination;
    var trainTime;
    var frequency;

    function creation() {


        database.ref("/trains/passenger").on("child_added", function (snapshot) {
            console.log(snapshot.val());
            let tableRow = $("<tr>");
            let tableCellOne = $("<td>");
            let tableCellTwo = $("<td>");
            let tableCellThree = $("<td>");
            let tableCellFour = $("<td>");
            let tableCellFive = $("<td>");
            tableCellOne.attr("id", "train-name");
            tableCellTwo.attr("id", "destination");
            tableCellThree.attr("id", "frequency");
            tableCellFour.attr("id", "next-arrival");
            tableCellFive.attr("id", "minutes-away");
            tableRow.append(tableCellOne);
            tableRow.append(tableCellTwo);
            tableRow.append(tableCellThree);
            tableRow.append(tableCellFour);
            tableRow.append(tableCellFive);
            $("#tbody").append(tableRow);

            var freq = parseInt(snapshot.val().frequency);
            var firstTime = (snapshot.val().trainTime);
            var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            var remain = diffTime % freq;
            var minTilTrain = freq - remain;
            var futureTrain = moment().add(minTilTrain, "minutes");

            tableCellOne.text(snapshot.val().trainName);
            tableCellTwo.text(snapshot.val().destination);
            tableCellThree.text(freq+ " min(s)");
            tableCellFour.text(moment(futureTrain).format("hh:mm"));
            tableCellFive.text(minTilTrain);

        });
    }


    $("#submit").on("click", function () {
        trainName = $("#name").val().trim();
        destination = $("#des").val().trim();
        trainTime = $("#time").val();
        frequency = $("#freq").val();


        database.ref('/trains/passenger')
            .push({
                trainName: trainName,
                destination: destination,
                trainTime: trainTime,
                frequency: frequency,
            })
    });


    creation();

});