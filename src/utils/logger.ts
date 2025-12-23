export const logger = {
  animation: (name: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎬 Animation: ${name}`, data);
    }
  },
  
  interaction: (name: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`👆 Interaction: ${name}`, data);
    }
  },
  
  error: (name: string, error: any) => {
    console.error(`❌ Error in ${name}:`, error);
  },
  
  performance: (name: string, duration: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ Performance ${name}: ${duration.toFixed(2)}ms`);
    }
  }
};
