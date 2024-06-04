song="";

function preload()
{
    song=loadSound("music.mp3");
}

scoreRightWrist=0;
scoreLeftWrist=0;

rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;

function setup()
{
    canvas=createCanvas(550,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("Model is loaded.")
}

function gotPoses(results)
{
    if(results.length>0)
        {
            console.log(results);
            scoreRightWrist=results[0].pose.keypoints[10].score;
            scorLefttWrist=results[0].pose.keypoints[9].score;
            console.log("scoreRightWrist= "+scoreRightWrist+" scoreLeftWrist= "+scorLefttWrist);

            rightWristX=results[0].pose.rightWrist.x;
            rightWristY=results[0].pose.rightWrist.y;
            console.log("rightWristX= "+rightWristX+" rightWristY= "+rightWristY);
            leftWristX=results[0].pose.leftWrist.x;
            leftWristy=results[0].pose.leftWrist.y;
            console.log("leftWristX= "+leftWristX+" leftWristY= "+leftWristY);
        }
}

function draw()
{
    image(video,0,0,550,500);
    fill("#36ffa1");
    stroke("#36eeff");
    if(scoreRightWrist>0.2)
        {
            circle(rightWristX,rightWristY,20);
            if(rightWristY>0 && rightWristY<=100);
            {
                document.getElementById("speed").innerHTML="Speed= 0.5x";
                song.rate(0.5);
            }
            elseif(rightWristY>100 && rightWristY<=200)
            {
                document.getElementById("speed").innerHTML="Speed= 1x";
                song.rate(1);
            }
            elseif(rightWristY>200 && rightWristY<=300)
            {
                document.getElementById("speed").innerHTML="Speed= 1.5x";
                song.rate(1.5);
            }
            elseif(rightWristY>300 && rightWristY<400)
            {
                document.getElementById("speed").innerHTML="Speed= 2x";
                song.rate(2);
            }
            elseif(rightWristY>400)
            {
                document.getElementById("speed").innerHTML="Speed= 2.5x";
                song.rate(2.5);
            }
        }
        if(scoreLeftWrist>0.2)
        {
            circle(leftWristX,leftWristY,20);
            InNumberLeftWristY=Number(leftWristY);
            remove_decimals=floor(InNumberLeftWristY);
            volume=remove_decimals/500;
            document.getElementById("volume").innerHTML="Volume= "+volume;
            song.setVolume(volume);
        }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

