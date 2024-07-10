class Car {
  #brand;
  #model;
  speed = 0;
  topSpeed = 200;
  exeleration = 5;
  isTrunkOpened = false;

  constructor(carsInfo) {
    this.brand = carsInfo.brand;
    this.model = carsInfo.model;
    // this.go(this.exeleration)
  }
  // speedExeleration
  go() {
    if (this.speed < this.topSpeed && this.isTrunkOpened === false) {
      this.speed += this.exeleration;
    } else {
      console.log("Can't go while the trunk is opend");
    }
    this.displayInfo();
  }

  break() {
    if (this.speed > 0) {
      this.speed -= 5;
    }
    this.displayInfo();
  }

  trunkState() {
    if (this.isTrunkOpened === false && this.speed === 0) {
      this.isTrunkOpened = true;
      console.log('The trunk has been opend');
    } else if (this.speed > 0) {
      console.log("The trunk can't be open now. Parck!");
    } else if (this.isTrunkOpened === true) {
      this.isTrunkOpened = false;
      console.log('The trunk has been closed');
    }
    this.displayInfo();
  }

  displayInfo() {
    console.log(
      ` On track now ${this.brand} ${this.model}, speed ${this.speed}-km/h.`
    );
  }
}

const carsObj = [
  { brand: 'Tesla', model: 'X' },
  { brand: 'BMV', model: 'X5' },
  { brand: 'Porshe', model: '911' },
];

export let cars = carsObj.map((carInfo) => {
  return new Car(carInfo);
  // return carInfo
});

const raceCarsObj = [
  { brand: 'Bugatti', model: 'Divo' },
  { brand: 'Lamborghini', model: 'Huracan' },
];

class RaceCars extends Car {
  topSpeed = 350;
  exeleration = 20;

  constructor(carInfo) {
    super(carInfo);
  }

  go() {
    if (this.speed < this.topSpeed && this.isTrunkOpened === false) {
      this.speed = this.exeleration;
    } else {
      console.log("Can't go while the trunk is opend");
    }
    this.displayInfo();
  }
}

const receCars = raceCarsObj.map((carInfo) => {
  return new RaceCars(carInfo);
});

window.raceCars = receCars;

