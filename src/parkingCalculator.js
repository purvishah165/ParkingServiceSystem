export const calculateParking = (cars) => {
  if (!cars || !cars.length) {
    return [];
  }
  const firstEmployee = { name: "Employee A", commissionPercentage: 0.11, commission: 0 };
  const secondEmployee =  { name: "Employee B", commissionPercentage: 0.15, commission: 0 };

  // allocate slots to employees
  if (cars.length === 1) {
    firstEmployee.slots = 1;
  } else {
    const splitSlots = cars.length / 2;
    firstEmployee.slots = Math.ceil(splitSlots);
    secondEmployee.slots = Math.floor(splitSlots);
  }

  const carsNeedingFuel = [];
  const largeCars = [];
  const smallCars = [];
  const output = {};
  let totalMoneyCollected = 0;
  let commissionPaid = 0;
  cars.forEach((car) => {
    let parkingCharge;
    let fuelAdded = 0;
    if (car.size === "small") {
      parkingCharge = 25;
    } else {
      parkingCharge = 35;
    }
    if (car.fuel.level <= 0.1) {
      fuelAdded = car.fuel.capacity * (1 - car.fuel.level);
      parkingCharge += fuelAdded * 1.75;
      carsNeedingFuel.push({ licencePlate: car.licencePlate, parkingCharge });
    }
    if (car.size === "small") {
      smallCars.push({ licencePlate: car.licencePlate, parkingCharge });
    } else {
      largeCars.push({ licencePlate: car.licencePlate, parkingCharge });
    }
    totalMoneyCollected += parkingCharge;
    output[car.licencePlate] = {
      licencePlate: car.licencePlate,
      fuelAdded: Math.round((fuelAdded + Number.EPSILON) * 100) / 100,
      price: Math.round((parkingCharge + Number.EPSILON) * 100) / 100,
    };
  });
  carsNeedingFuel.sort((a, b) =>
    a.parkingCharge < b.parkingCharge
      ? 1
      : b.parkingCharge < a.parkingCharge
      ? -1
      : 0
  );
  carsNeedingFuel.forEach((car) => {
    assignCarToEmployee(output[car.licencePlate], firstEmployee, secondEmployee);
  });
  largeCars.forEach((car) => {
    assignCarToEmployee(output[car.licencePlate], firstEmployee, secondEmployee);
  });
  smallCars.forEach((car) => {
    assignCarToEmployee(output[car.licencePlate], firstEmployee, secondEmployee);
  });
  console.log(`Total money collected ${totalMoneyCollected}`);
  commissionPaid += firstEmployee.commission;
  console.log(`${firstEmployee.name} earned ${firstEmployee.commission} commission`);
  commissionPaid += secondEmployee.commission;
  console.log(`${secondEmployee.name} earned ${secondEmployee.commission} commission`);
  console.log(`Money after paying commissions ${totalMoneyCollected - commissionPaid}`);
  return Object.values(output);
};

const assignEmployee = (car, employee) => {
  car.employee = employee.name;
  employee.commission += car.price * employee.commissionPercentage;
  employee.slots--;
};

const assignCarToEmployee = (car, employeeWithLessCommission, employeeWithHighCommission) => {
  if (!car.employee) {
    if (employeeWithLessCommission.slots) {
      assignEmployee(car, employeeWithLessCommission);
    } else {
      assignEmployee(car, employeeWithHighCommission);
    }
  }
};
