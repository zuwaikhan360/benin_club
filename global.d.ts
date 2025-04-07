declare global {
  namespace NodejS {
    interface ProcessENV {
      NODE_DEV: 'deveempolyment' | 'production';
    }
  }
}

export {};
