import { expect } from "chai";
import { calculateParking } from "../src/parkingCalculator.js";

describe("calculate parking", () => {
  it("returns empty object if no car info is passed", () => {
    expect(calculateParking([])).to.eql([]);
    expect(calculateParking()).to.eql([]);
  });

  it("returns price as 25$ for small car that does not need refueling", () => {
    const smallCar = {
      licencePlate: "I",
      size: "small",
      fuel: {
        capacity: 60,
        level: 0.65,
      },
    };
    expect(calculateParking([smallCar])).to.eql([
      {
        licencePlate: "I",
        employee: "Employee A",
        fuelAdded: 0,
        price: 25,
      },
    ]);
  });

  it("returns price as 25$ and fuel charge for small car that needs refueling", () => {
    const smallCar = {
      licencePlate: "G",
      size: "small",
      fuel: {
        capacity: 56,
        level: 0.05,
      },
    };
    expect(calculateParking([smallCar])).to.eql([
      {
        licencePlate: "G",
        employee: "Employee A",
        fuelAdded: 53.2,
        price: 118.1,
      },
    ]);
  });

  it("returns price as 35$ for large car that does not need refueling", () => {
    const largeCar = {
      licencePlate: "I",
      size: "small",
      fuel: {
        capacity: 60,
        level: 0.65,
      },
    };
    expect(calculateParking([largeCar])).to.eql([
      {
        licencePlate: "I",
        employee: "Employee A",
        fuelAdded: 0,
        price: 25,
      },
    ]);
  });

  it("returns price as 35$ and fuel charge for large car that needs refueling", () => {
    const largeCar = {
      licencePlate: "A",
      size: "large",
      fuel: {
        capacity: 57,
        level: 0.07,
      },
    };
    expect(calculateParking([largeCar])).to.eql([
      {
        licencePlate: "A",
        employee: "Employee A",
        fuelAdded: 53.01,
        price: 127.77,
      },
    ]);
  });

  it("assigns multiple jobs equally among the 2 employees", () => {
    const firstSmallCar = {
      licencePlate: "A",
      size: "small",
      fuel: {
        capacity: 57,
        level: 0.07,
      },
    };
    const secondSmallCar = {
      licencePlate: "B",
      size: "small",
      fuel: {
        capacity: 57,
        level: 0.07,
      },
    };
    expect(calculateParking([firstSmallCar, secondSmallCar])).to.eql([
      {
        licencePlate: "A",
        employee: "Employee A",
        fuelAdded: 53.01,
        price: 117.77,
      },
      {
        licencePlate: "B",
        employee: "Employee B",
        fuelAdded: 53.01,
        price: 117.77,
      },
    ]);
  });

  it("assigns multiple jobs equally among the 2 employees based on price and employee commissions", () => {
    const firstSmallCar = {
      licencePlate: "A",
      size: "small",
      fuel: {
        capacity: 57,
        level: 0.07,
      },
    };
    const firstLargeCar = {
      licencePlate: "B",
      size: "large",
      fuel: {
        capacity: 57,
        level: 0.27,
      },
    };
    const secondSmallCar = {
      licencePlate: "C",
      size: "small",
      fuel: {
        capacity: 57,
        level: 0.87,
      },
    };
    const secondLargeCar = {
      licencePlate: "D",
      size: "large",
      fuel: {
        capacity: 57,
        level: 0.07,
      },
    };
    expect(calculateParking([firstSmallCar, firstLargeCar, secondSmallCar, secondLargeCar])).to.eql([
      {
        licencePlate: "A",
        employee: "Employee A",
        fuelAdded: 53.01,
        price: 117.77,
      },
      {
        licencePlate: "B",
        employee: "Employee B",
        fuelAdded: 0,
        price: 35,
      },
      {
        licencePlate: "C",
        employee: "Employee B",
        fuelAdded: 0,
        price: 25,
      },
      {
        licencePlate: "D",
        employee: "Employee A",
        fuelAdded: 53.01,
        price: 127.77,
      },
    ]);
  });

  it("returns a computed set of parking info if multiple cars info is passed", () => {
    const inputData = [
      {
        licencePlate: "A",
        size: "large",
        fuel: {
          capacity: 57,
          level: 0.07,
        },
      },
      {
        licencePlate: "B",
        size: "large",
        fuel: {
          capacity: 66,
          level: 0.59,
        },
      },
      {
        licencePlate: "C",
        size: "large",
        fuel: {
          capacity: 54,
          level: 0.49,
        },
      },
      {
        licencePlate: "D",
        size: "large",
        fuel: {
          capacity: 79,
          level: 0.93,
        },
      },
      {
        licencePlate: "E",
        size: "large",
        fuel: {
          capacity: 94,
          level: 0.2,
        },
      },
      {
        licencePlate: "F",
        size: "large",
        fuel: {
          capacity: 57,
          level: 0.1,
        },
      },
      {
        licencePlate: "G",
        size: "small",
        fuel: {
          capacity: 56,
          level: 0.05,
        },
      },
      {
        licencePlate: "H",
        size: "small",
        fuel: {
          capacity: 61,
          level: 0.78,
        },
      },
      {
        licencePlate: "I",
        size: "small",
        fuel: {
          capacity: 60,
          level: 0.65,
        },
      },
      {
        licencePlate: "J",
        size: "large",
        fuel: {
          capacity: 63,
          level: 0.01,
        },
      },
    ];
    expect(calculateParking(inputData)).to.eql([
      {
        employee: "Employee A",
        fuelAdded: 53.01,
        licencePlate: "A",
        price: 127.77,
      },
      {
        employee: "Employee A",
        fuelAdded: 0,
        licencePlate: "B",
        price: 35,
      },
      {
        employee: "Employee B",
        fuelAdded: 0,
        licencePlate: "C",
        price: 35,
      },
      {
        employee: "Employee B",
        fuelAdded: 0,
        licencePlate: "D",
        price: 35,
      },
      {
        employee: "Employee B",
        fuelAdded: 0,
        licencePlate: "E",
        price: 35,
      },
      {
        employee: "Employee A",
        fuelAdded: 51.3,
        licencePlate: "F",
        price: 124.78,
      },
      {
        employee: "Employee A",
        fuelAdded: 53.2,
        licencePlate: "G",
        price: 118.1,
      },
      {
        employee: "Employee B",
        fuelAdded: 0,
        licencePlate: "H",
        price: 25,
      },
      {
        employee: "Employee B",
        fuelAdded: 0,
        licencePlate: "I",
        price: 25,
      },
      {
        employee: "Employee A",
        fuelAdded: 62.37,
        licencePlate: "J",
        price: 144.15,
      },
    ]);
  });
});
