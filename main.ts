type InternetHub = {
  id: string;
  serial_number: string;
};

export type HubsData = {
  comment: string;
  Internet_hubs: InternetHub[];
};

export function assignSerialNumbers(jsonData: HubsData): {
  original: HubsData;
  updated: HubsData;
} {
  const originalData = JSON.parse(JSON.stringify(jsonData));

  //Question states 8 but 9 internet hubs where show as example
  const serialNumbers = [
    "C25CTW00000000001478",
    "C25CTW00000000001477",
    "C25CTW00000000001476",
    "C25CTW00000000001475",
    "C25CTW00000000001474",
    "C25CTW00000000001473",
    "C25CTW00000000001472",
    "C25CTW00000000001471",
  ];

  // Create a map for quick lookup of serial numbers based on the last digit
  const serialNumberMap: { [key: number]: string } = {};
  for (let i = 1; i <= 8; i++) {
    serialNumberMap[i] = serialNumbers[8 - i];
  }

  // Validate and assign serial numbers
  jsonData.Internet_hubs.forEach((hub) => {
    if (hub.id === "men1") {
      hub.serial_number = "C25CTW00000000001470"; // Retain the serial number for men1
    } else {
      const lastDigit = parseInt(hub.id.slice(-1), 10);
      if (!isNaN(lastDigit) && lastDigit >= 1 && lastDigit <= 8) {
        hub.serial_number = serialNumberMap[lastDigit]; // Assign serial number in reverse order
      } else {
        throw new Error(`Invalid ID detected: ${hub.id}`);
      }
    }
  });

  return {
    original: originalData,
    updated: jsonData,
  };
}

// scenerio
const jsonData: HubsData = {
  comment: "Do NOT commit local changes to this file to source control",
  Internet_hubs: [
    { id: "men1", serial_number: "C25CTW00000000001470" },
    { id: "mn1", serial_number: "<serial number here>" },
    { id: "mn2", serial_number: "<serial number here>" },
    { id: "mn3", serial_number: "<serial number here>" },
    { id: "mn4", serial_number: "<serial number here>" },
    { id: "mn5", serial_number: "<serial number here>" },
    { id: "mn6", serial_number: "<serial number here>" },
    { id: "mn7", serial_number: "<serial number here>" },
    { id: "mn8", serial_number: "<serial number here>" },
  ],
};

const result = assignSerialNumbers(jsonData);
console.log(JSON.stringify(result, null, 2));
