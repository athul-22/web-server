import { randomBytes } from 'crypto';

// Generate a random secret key
const secretKey = randomBytes(32).toString('hex');

console.log(`Random Secret Key: ${secretKey}`);
