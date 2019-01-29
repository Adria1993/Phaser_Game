import 'phaser';



export class MainScene extends Phaser.Scene {
  public platforms: any;
  public player: any;
  public cursor: any;
  public enter: boolean = true;
  constructor() {
    super({ key: 'MainScene' });
  }

  public preload() {
    this.load.image('sky', '../src/assets/sky.png');
    this.load.image('ground', '../src/assets/platform.png');
    this.load.image('star', '../src/assets/star.png');
    this.load.image('bomb', '../src/assets/bomb.png');
    this.load.spritesheet('dude',
      '../src/assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  public create() {
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'star');
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.physics.add.collider(this.player, this.platforms);
  }

  public update() {
    this.cursor = this.input.keyboard.createCursorKeys();
    if(this.cursor.left.isDown){
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if(this.cursor.right.isDown){
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    }
    else{
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }
    if(this.cursor.up.isDown && this.player.body.touching.down){
      this.player.setVelocityY(-330);
    }
  }

}
