export default function splitAddress(address: string): {
  county: string;
  region: string;
  postalCode: string;
} {
  const parts = address.split(' ');
  const county = parts[0];
  const region = parts[1] + ' ' + parts[2];
  const postalCode = parts[3];

  return { county, region, postalCode };
}
