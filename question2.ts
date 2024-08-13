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
  const response = await axios.get(`${BASE_URL}/customer_numbers`, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  return response.data;
}

export async function fetchCustomerAddress(
  customerNumber: number
): Promise<Address> {
  const response = await axios.get(
    `${BASE_URL}/address_inventory/${customerNumber}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );
  return response.data;
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
  const customerCount = await fetchCustomerNumbers();
  const addresses: Address[] = [];

  for (let i = 1; i <= customerCount; i++) {
    const address = await fetchCustomerAddress(i);
    if (validateAddress(address)) {
      addresses.push(address);
    }
  }

  return addresses;
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
