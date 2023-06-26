/**
 * Represents a player.
 * @class Player
 */
class Player {
    /**
     * Create a player.
     * @constructor
     * @property {number} x - The player's x position.
     * @property {number} y - The player's y position.
     * @property {number} width - The player's width.
     * @property {number} height - The player's height.
     * @property {string} color - The player's color.
     * @property {number} speed - The player's speed.
     * @property {number} playerJumpStrength - The player's jump strength.
     * @returns {void} 
     */
    constructor(x, y, width, height, color, speed, playerJumpStrength) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
      this.speed = speed;
      this.direction = null;
      this.velocityY = 0;
      this.isJumping = false;
      this.playerJumpStrength = playerJumpStrength;

      document.addEventListener("keydown", this.handleKeyDown.bind(this));
      document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    /**
     * Draw the player.
     * @param {CanvasRenderingContext2D} context - The context for drawing the player.
     * @returns {void}
     */
    draw(context) {
      context.fillStyle = this.color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }

    /**
     * Check if the player is colliding with something.
     * @returns {boolean} - Whether the player is colliding with something.
     */
    checkCollision(rect) {
      return (
        this.x < rect.x + rect.width &&
        this.x + this.width > rect.x &&
        this.y < rect.y + rect.height &&
        this.y + this.height > rect.y
      );
    }

    /**
     * Move the player to the right.
     * @returns {void}
     */
    moveRight() {
      this.direction = "right";
    }

    /**
     * Move the player to the left.
     * @returns {void}
     */
    moveLeft() {
      this.direction = "left";
    }

    /**
     * Move the player.
     * @returns {void}
     */
    move(){
        if (this.direction === "right") {
            this.x += this.speed;
        } else if (this.direction === "left") {
            if (this.x > 0) {
                this.x -= this.speed;
            }
        }
    }
    /**
     * Make the player jump.
     * @returns {void}
     */
    jump() {
      if (!this.isJumping) {
        this.velocityY = -this.playerJumpStrength;
        this.isJumping = true;
      }
    }

    /**
     * Stop the player from moving.
     * @returns {void}
     */
    stopMoving() {
      this.direction = null;
    }

    /**
     * Apply gravity to the player.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {number} gravity - The gravity to apply.
     * @returns {void}
     */
    applyGravity(canvas, gravity) {
      if (this.y < canvas.height - this.height || this.velocityY < 0) {
        this.velocityY += gravity;
        this.y += this.velocityY;
      } else {
        this.y = canvas.height - this.height;
        this.velocityY = 0;
        this.isJumping = false;
      }
    }
    /**
     * Handle key down events.
     * @param {KeyboardEvent} event - The event.
     * @returns {void}
     */
    handleKeyDown(event) {
      if (event.key === "ArrowRight") {
        this.moveRight();
      } else if (event.key === "ArrowLeft") {
        this.moveLeft();
      } else if (event.key === "ArrowUp") {
        this.jump();
      }
    }

    /**
     * Handle key up events.
     * @param {KeyboardEvent} event - The event.
     * @returns {void}
     */
    handleKeyUp(event) {
      if (
        (event.key === "ArrowRight" && this.direction === "right") ||
        (event.key === "ArrowLeft" && this.direction === "left")
      ) {
        this.stopMoving();
      }
    }

}
