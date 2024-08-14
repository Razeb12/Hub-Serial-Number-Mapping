import axios from "axios";
import { writeFileSync } from "fs";
import { parse } from "json2csv";

const API_KEY = "ssfdsjfksjdhfgjfgvjdshgvshgkjsdlgvkjsdgjkl";
const BASE_URL = "https://clemant_demo.com";

type Address = {
  id: number;
  first_name: string;
  last_name: string;
  street: string;
  postcode: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
};

export async function fetchCustomerNumbers(): Promise<number> {
  try {
    const response = await axios.get(`${BASE_URL}/customer_numbers`, {
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === "ENOTFOUND") {
      console.error("Domain is unrecognized", error);
    } else {
      console.error("Error fetching customer numbers:", error);
    }
    throw new Error("Failed to fetch customer numbers");
  }
}

export async function fetchCustomerAddress(
  customerNumber: number
): Promise<Address> {
  try {
    const response = await axios.get(
      `${BASE_URL}/address_inventory/${customerNumber}`,
      {
        headers: {
          "X-API-KEY": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === "ENOTFOUND") {
      console.error("Domain is unrecognized", error);
    } else {
      console.error(
        `Error fetching address for customer ${customerNumber}:`,
        error
      );
    }
    throw new Error(`Failed to fetch address for customer ${customerNumber}`);
  }
}

export function validateAddress(address: Address): boolean {
  return (
    typeof address.id === "number" &&
    typeof address.first_name === "string" &&
    typeof address.last_name === "string" &&
    typeof address.street === "string" &&
    typeof address.postcode === "string" &&
    typeof address.state === "string" &&
    typeof address.country === "string" &&
    typeof address.lat === "number" &&
    typeof address.lon === "number"
  );
}

export async function retrieveAllAddresses(): Promise<Address[]> {
  try {
    const customerCount = await fetchCustomerNumbers();
    const addresses: Address[] = [];

    for (let i = 1; i <= customerCount; i++) {
      try {
        const address = await fetchCustomerAddress(i);
        if (validateAddress(address)) {
          addresses.push(address);
        }
      } catch (error) {
        console.error(`Skipping customer ${i} due to error:`, error);
      }
    }

    return addresses;
  } catch (error) {
    console.error("Error retrieving all addresses:", error);
    throw new Error("Failed to retrieve all addresses");
  }
}

export function saveAddressesToCSV(addresses: Address[]): string {
  const csv = parse(addresses);
  const fileName = "customer_addresses.csv";
  writeFileSync(fileName, csv);
  return fileName;
}

async function main() {
  try {
    const addresses = await retrieveAllAddresses();
    const csvFileName = saveAddressesToCSV(addresses);
    console.log(`CSV File saved as: ${csvFileName}`);
    console.table(addresses);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

main();
