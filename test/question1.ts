import { assignSerialNumbers, HubsData } from "../main";

describe("assignSerialNumbers", () => {
  it("should assign serial numbers correctly to the Internet_hubs", () => {
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

    const expectedUpdatedData: HubsData = {
      comment: "Do NOT commit local changes to this file to source control",
      Internet_hubs: [
        { id: "men1", serial_number: "C25CTW00000000001470" },
        { id: "mn1", serial_number: "C25CTW00000000001471" },
        { id: "mn2", serial_number: "C25CTW00000000001472" },
        { id: "mn3", serial_number: "C25CTW00000000001473" },
        { id: "mn4", serial_number: "C25CTW00000000001474" },
        { id: "mn5", serial_number: "C25CTW00000000001475" },
        { id: "mn6", serial_number: "C25CTW00000000001476" },
        { id: "mn7", serial_number: "C25CTW00000000001477" },
        { id: "mn8", serial_number: "C25CTW00000000001478" },
      ],
    };

    const result = assignSerialNumbers(jsonData);

    // Validate that the original data remains unchanged
    expect(result.original).toEqual({
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
    });

    // Validate that the updated data matches the expected result
    expect(result.updated).toEqual(expectedUpdatedData);
  });

  it("should throw an error for invalid ID", () => {
    const jsonDataWithInvalidId: HubsData = {
      comment: "Do NOT commit local changes to this file to source control",
      Internet_hubs: [
        { id: "invalid_id", serial_number: "<serial number here>" },
      ],
    };

    expect(() => assignSerialNumbers(jsonDataWithInvalidId)).toThrowError(
      new Error(`Invalid ID detected: invalid_id`)
    );
  });
});