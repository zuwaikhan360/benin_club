declare module 'flutterwave-node-v3' {
  export class Flutterwave {
    constructor(publicKey: string, secretKey: string);
    verifyPayment(txRef: string): Promise<any>;
  }
}
