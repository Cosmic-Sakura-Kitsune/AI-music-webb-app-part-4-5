song="";
song2= "";
leftWristX= "";
leftWristY= "";
rightWristX= "";
rightWristY= "";
scoreleftWrist = 0;
scorerightWrist = 0;
status_song1= "";
status_song2= "";

function setup(){
    canvas= createCanvas(600, 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide()

    poseNet= ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function modelLoaded(){
    console.log("Model is Loaded!")
}

function stop(){
    song.stop()
    song2.stop()
    document.getElementById("status").innerHTML = "Song is Stopped!"
}
function draw(){
    image(video, 0, 0 , 600, 500);

    fill("purple")
    stroke("purple")

    status_song1 = song.isPlaying()
    status_song2= song2.isPlaying()

    if(scoreleftWrist > 0.2){
        circle(leftWristX, leftWristY, 20)
        song2.stop()

        if(status_song1 == false){
            song.play()
document.getElementById("status").innerHTML= "Playing: Peter Pan Song"
        }

        
    }

    if(scorerightWrist > 0.2){
        fill("#FF69B4")
        stroke("#FF69B4")
        circle(rightWristX, rightWristY, 20)
        song.stop()

        if(status_song2 == false){
            song2.play()
            document.getElementById("status").innerHTML = "Playing: Harry Potter Theme Song"
        }

        
    }
}

function preload(){
    song2= loadSound("music.mp3");
    song=loadSound("music2.mp3");
}

function gotPoses(results){
    
    if(results.length>0){
        console.log(results)
        scorerightWrist= results[0].pose.keypoints[10].score
        scoreleftWrist= results[0].pose.keypoints[9].score
        console.log("scoreleftWrist = " + scoreleftWrist + "scorerightWrist = " + scorerightWrist)
        
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWrsitX =" + leftWristX + "leftWristY" + leftWristY)

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX + "rightWristY =" + rightWristY)
    }
}

