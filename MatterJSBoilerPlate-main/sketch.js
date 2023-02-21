var PLAY = 1
var End = 0
var gameState = 1

var car, car_driving, car_crashed
var ground, invisibleGround, groundImage

var cloudsGroup, cloudImage

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4

var score

var gameOverS
var gameOverImg
var restartS
var restartImg

function preload() {
	car_driving = loadAnimation("carDriving.webp")
	car_crashed = loadAnimation("carCrashed.jpg")

	groundImage = loadImage("ground.png")

	cloudImage = loadImage("cloud.png")

	gameOverImg = loadImage("restart.png")
	restartImg = loadImage("gameOver.png")

	obstacle1 = loadImage("obstacle1.png")
	obstacle2 = loadImage("obstacle2.png")
	obstacle3 = loadImage("obstacle3.png")
	obstacle4 = loadImage("obstacle4.png")

}

function setUp() {
	createCanvas(600, 200)
	car = createSprite(50, 50)
	car.addAnimation("driving", car_driving)
	car.addAnimation("crashed", car_crashed)
	car.scale = 0.5

	ground = createSprite(10, 20, 200, 200)
	ground.addImage("ground", groundImage)
	ground.x = ground.width / 2

	gameOverS.scale = 0.5
	restartS.scale = 0.5
	invisibleGround = createSprite()
	invisibleGround.visible = false

	obstaclesGroup = createGroup()
	cloudsGroup = createGroup()

	score = 0

	car.setColider("circle", 0, 0, 50)
}

function draw() {

	background(180)

	text("Score:"+ score, 500, 60)

	if(gameState === PLAY){
		ground.velocityX = -4

		score = score+Math.round(frameCount/60)
		gameOverS.visible = false
		restartS.visible = false

		if (ground.x < 0) {
			ground.x = ground.width/2
		}

		if (keyDown("space") && car.y >= 100) {
			car.velocityY = -13
		}
		car.velocityY = car.velocityY + 0.8


		spawnClouds()

		spawnObstacles()

		if(obstaclesGroup.isTouching(car)) {
			gameState = END
		}
	}
	else if (gameState === END) {
		ground.velocityX = 0

		cloudsGroup.group.setLifetimeEach(-1)

		obstaclesGroup.setLifetimeEach(-1)

		gameOverS.visible = true
		restartS.visible = true

		car.velocityY = 0

		car.changeAnimation("crashed", car_crashed)

		obstaclesGroup.setVelocityEach(0)
		cloudsGroup.setVelocityEach(0)
	}

	car.ccollide(invisibleGround)

    drawSprites()
}

function spawnObstacles() {
	if (frameCount % 60 === 0) {
		var obstacle = createSprite()
		obstacle.velocityX = -6

		var rand = Math.round(random(1,6))
		switch(rand) {
			case 1: obstacle.addImage(obstacle1)
			break
			case 2: obstacle.addImage(obstacle2)
			break
			case 3: obstacle.addImage(obstacle3)
			break
			case 4: obstacle.addImage(obstacle4)
			break
			default: break
		}

		obstacles.scale = 0.5
		obstacle.lifetime = 300

		obstaclesGroup.add(obstacle)
	}
}

function spawnClouds() {
	if (framerate % 60 === 0) {
		cloud = createSprite(600, 100, 40, 10)
		cloud.y = Math.round(random(10, 60))
		cloud.addImage(cloudImage)
		cloud.scale = 0.5
		cloud.velocityX = -3

		cloud.lifetime = 134

		cloud.depth = car.depth
		car.depth = car.depth + 1

		cloudsGroup.add(cloud)
	}
}