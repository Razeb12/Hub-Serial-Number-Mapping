import axios from "axios";
import { writeFileSync } from "fs";
import { parse } from "json2csv";
import {
  fetchCustomerNumbers,
  fetchCustomerAddress,
  validateAddress,
  retrieveAllAddresses,
  saveAddressesToCSV,
} from "../question2";

jest.mock("axios");
jest.mock("fs");
jest.mock("json2csv");

describe("Address Functions", () => {
  const mockAddresses = [
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      street: "123 Main St",
      postcode: "12345",
      state: "CA",
      country: "USA",
      lat: 34.0522,
      lon: -118.2437,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetchCustomerNumbers should return customer count", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: 5 });
    const customerCount = await fetchCustomerNumbers();
    expect(customerCount).toBe(5);
    expect(axios.get).toHaveBeenCalledWith(
      "https://clemant_demo.com/customer_numbers",
      {
        headers: { "X-API-KEY": "ssfdsjfksjdhfgjfgvjdshgvshgkjsdlgvkjsdgjkl" },
      }
    );
  });

  test("fetchCustomerAddress should return address", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockAddresses[0] });
    const address = await fetchCustomerAddress(1);
    expect(address).toEqual(mockAddresses[0]);
    expect(axios.get).toHaveBeenCalledWith(
      "https://clemant_demo.com/address_inventory/1",
      {
        headers: { "X-API-KEY": "ssfdsjfksjdhfgjfgvjdshgvshgkjsdlgvkjsdgjkl" },
      }
    );
  });

  test("validateAddress should validate address correctly", () => {
    const isValid = validateAddress(mockAddresses[0]);
    expect(isValid).toBe(true);
  });

  test("retrieveAllAddresses should return all valid addresses", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: 1 });
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockAddresses[0] });

    const addresses = await retrieveAllAddresses();
    expect(addresses).toEqual(mockAddresses);
  });

  test("saveAddressesToCSV should save addresses to CSV", () => {
    (parse as jest.Mock).mockReturnValue("csv_content");
    const fileName = saveAddressesToCSV(mockAddresses);
    expect(fileName).toBe("customer_addresses.csv");
    expect(writeFileSync).toHaveBeenCalledWith(
      "customer_addresses.csv",
      "csv_content"
    );
  });
});
