
$(document).ready(function(){

  // show form sign in or sign out

  if(localStorage.getItem("authentication") === "pass"){
    $('#signInForm').css("display", "none");
    $('.continueLogIn').text(`Continue as ${localStorage.getItem("adminName")}`)
    $('.adminloginAgain').css("display", "block");
    $('.right').css("display", "none");
}else{
    $('.adminloginAgain').css("display", "none");
    $('#signInForm').css("display", "");
}

// continue login click action
$('.continueLogIn').click(() => {
    window.location.replace("pages/admin.html");
});

// sign out click action
$('#signout').click(() => {
    localStorage.setItem("adminName", "" );
    localStorage.setItem("authentication", "");
    window.location.replace("index.html");
});


// ALL TIMER CODE

// Set the date we're counting down to format: "Jan 5, 2021 15:37:25"
var countDownDate = new Date("apr 22, 2020 22:05:59").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h " +
        minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        let highestVote = 0;
        $.ajax({
            url: 'http://localhost:3000/candidates',
            method: 'get',
        }).done((e) => {
            var winner = [];
            for (var d = 0; d < e.length; d++) {
                if (parseInt(e[d].vote_count) > highestVote) {
                    highestVote = parseInt(e[d].vote_count);
                }
            }

            for (var f = 0; f < e.length; f++) {
                if (highestVote === parseInt(e[f].vote_count)) {
                    winner.push(e[f].name)
                    //
                }
            }
            if (winner.length > 1) {
                document.getElementById("demo").innerHTML = `It's a Tie`;
                alert("It is a Tie Between:")
                for (var g = 0; g < winner.length; g++) {
                    alert(winner[g]);
                }

            } else if (winner.length = 1) {
                $('.deadline').css("display", "none");
                document.getElementById("demo").innerHTML = `The Winner is ${winner[0]}`;
            }
        })
    }
}, 1000);


// check weather api arena

    $('#checkWeather').click(() => {
    localStorage.setItem("location", $('#locationInput').val())
    let apiId = "4319800c409bb79b8c24b903e67d58c3";
axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem("location")}&appid=${apiId}`)
.then(res => {
    $('.weatherReport').text(`The weather in ${localStorage.getItem("location")} is ${res.data.weather[0].main}`)
    $('#locationInput').val("")
}).catch(err => {
    if (err.response.status === 404) {
        $('.weatherReport').text("Location not Found" )
    }
})

});

  

// show and hide password button
$('#showhide').click(() => {
    if ($('#vpassword1').attr("type") === "password") {
        $('#vpassword1').attr("type", "text");
        $('#vpassword2').attr("type", "text");
        $('#img').attr("src", "./images/hide.png");
    } else {
        $('#vpassword1').attr("type", "password");
        $('#vpassword2').attr("type", "password");
        $('#img').attr("src", "./images/show.png");
    }
})

//confirm password border change and unlock sign up button

$('#vpassword2').on('input', () => {
    if ($('#vpassword1').val() && $('#vpassword1').val() === $('#vpassword2').val()) {
        $('#vpassword1').removeClass("is-invalid");
        $('#vpassword2').removeClass("is-invalid");
        $('#vpassword1').addClass("is-valid");
        $('#vpassword2').addClass("is-valid");
        $('.passerror').removeAttr("style");
        $('.passerror').css("display", "none");
        // $('#vregBtn').removeAttr("disabled");
    } else {
        $('#vpassword1').removeClass("is-valid");
        $('#vpassword2').removeClass("is-valid");
        $('#vpassword1').addClass("is-invalid");
        $('#vpassword2').addClass("is-invalid");
        $('.passerror').text("Both password fields must match");
        $('.passerror').css("display", "block");
        // $('#vregBtn').attr("disabled", "true");
    }
})

$('#vpassword1').focus(() => {
    $('.passerror').css("display", "block");
})
$('#vpassword1').blur(() => {
    $('.passerror').removeAttr("style");
    $('.passerror').css("display", "none");
})

$('#vpassword1').change(() => {

    if ($('#vpassword1').val().length > 3 && $('#vpassword1').val().length < 9) {
        // $('#vregBtn').removeAttr("disabled");


    } else {
        // $('#vregBtn').attr("disabled", "true");
    }
})
// alert("votState")
$('#vregBtn').click((e) => {
    e.preventDefault()
    let votName = $('#votName').val();
    let votAge = $('#votAge').val();
    let votState = $('#votState').val();
    let vemail = $('#vemail').val();
    let vpassword1 = $('#vpassword1').val();
    let vpassword2 = $('#vpassword2').val();
    
    $.ajax({
        url: 'http://localhost:3000/voters',
        method: 'get',
    }).done((e) => {
        //alert(JSON.stringify(e))
        let flag = false;
        for (let i = 0; i < e.length; i++) {
            if (e[i].email === vemail) {
                flag = true;
            }
        }

        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!votName || !votAge || !votState || !vemail) {
            $('#votForm').addClass("was-validated");
            alert("complete filling your information")
        } else if (!vpassword1 || !vpassword2) {
            $('#vpassword1').removeClass("is-valid");
            $('#vpassword2').removeClass("is-valid");
            $('#vpassword1').addClass("is-invalid");
            $('#vpassword2').addClass("is-invalid");
            alert("You must enter a Password")
        } else if (!(vemail.match(mailformat))) {
            alert("Enter a valid Email address")
        } else if (votAge < 17) {
            alert("Sorry you are not eligible to Vote")
        } else if (votAge > 120) {
            alert("Sorry we dont register Ghosts")
        } else if (flag === true) {
            alert("Email already used. try another")
        } else if (vpassword1 !== vpassword2) {
            alert("Password mismatch")
        } else {
            $.ajax({
                url: 'http://localhost:3000/voters',
                method: 'post',
                data: {
                    name: votName,
                    age: votAge,
                    home_state: votState,
                    email: vemail,
                    password: vpassword1,
                    vote_count: 0
                }
            });
            alert("Sign UP successful")
            $('#votName').val('');
            $('#votAge').val('');
            $('#votState').val('');
            $('#vemail').val('');
            $('#vpassword1').val('');
            $('#vpassword2').val('');
            $('#vpassword1').removeClass("is-valid");
            $('#vpassword2').removeClass("is-valid"); 
        }
    })
})
// alert('try it')
$('#signIn').click((e) => {
    e.preventDefault()
    let email = $('#email').val();
    let password = $('#password').val();
    // alert('click happened')
    $.ajax({
        url: 'http://localhost:3000/voters',
        method: 'get',
    }).done((e) => {
        let vindex;
        var vid;
        let vEmailflag = false;
        let vPasswordflag = false;
        for (let a = 0; a < e.length; a++) {
            if (e[a].email === email) {
                vEmailflag = true;
                if (e[a].password === password) {
                    vPasswordflag = true;
                    vindex = a;
                    vid = e[a].id;
                }
            }
        }
        // alert('got voters data')
        $.ajax({
            url: 'http://localhost:3000/admins',
            method: 'get',
        }).done((j) => {
            let aindex;
            var aid;
            let aEmailflag = false;
            let aPasswordflag = false;
            for (let b = 0; b < j.length; b++) {
                if (j[b].email === email) {
                    aEmailflag = true;
                    if (j[b].password === password) {
                        aPasswordflag = true;
                        aindex = b;
                        aid = j[b].id;
                    }
                }
            }
            if (!email || !password) {
                alert("complete filling your information")
            } else if (!email.includes('.') || !email.includes('@')) {
                alert("Enter a valid Email address")
            } else if (!aPasswordflag && !vPasswordflag) {
                alert("Email & Password Mismatch")
            } else if (aPasswordflag && vPasswordflag) {
                var r = confirm("Welcome Administrator\nclick ok to sign in\nor cancel to vote");
                if (r == true) {
                    localStorage.setItem("adminName", `${j[aindex].name}` );
                    localStorage.setItem("authentication", "pass");
                    window.location.replace("pages/admin.html");
                } else {
                    if (e[vindex].vote_count === "1") {
                        alert("You have already voted")
                        window.location.replace("index.html");
                    } else if (e[vindex].vote_count === "0") {
                        $('#email').val('');
                        $('#password').val('');
                        $.ajax({
                            url: `http://localhost:3000/voters/${vid}`,
                            method: 'patch',
                            data: {
                                vote_count: "1"
                            }
                        });
                        alert('get ready to vote')
                        window.location.replace("pages/vote.html");
                    }
                }
            } else if (!aPasswordflag && vPasswordflag) {
                if (e[vindex].vote_count === "1") {
                    alert("You have already voted")
                    window.location.replace("index.html");
                } else if (e[vindex].vote_count === "0") {
                    $('#email').val('');
                    $('#password').val('');
                    $.ajax({
                        url: `http://localhost:3000/voters/${vid}`,
                        method: 'patch',
                        data: {
                            vote_count: "1"
                        }
                    });
                    alert('get ready to vote')
                    window.location.replace("pages/vote.html");
                }
            } else if (aPasswordflag && !vPasswordflag) {
                $('#email').val('');
                $('#password').val('');
                window.location.replace("pages/admin.html");
            }
        })
    })
})



});