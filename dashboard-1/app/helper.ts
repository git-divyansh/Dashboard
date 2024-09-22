// export function parseDate(dateString: string): Date {
//     // Split the date and time parts
//     const [datePart, timePart] = dateString.split(' ');
    
//     // Extract day, month, and year from the date part
//     const [month, day, year] = datePart.split('/').map(Number);
    
//     // Extract hours and minutes from the time part
//     const [hours, minutes] = timePart.split(':').map(Number);
    
//     // Create and return the new Date object
//     return new Date(year, month - 1, day, hours, minutes);
// }

export function getYear(dateString : string) : number {
    return Number(dateString.split('/')[2].split(' ')[0]);
}

// Helper function to calculate the precision factor for decimals
function getPrecisionFactor(...numbers: number[]): number {
    return numbers.reduce((prev, next) => {
        const currentFactor = Math.pow(10, next.toString().split('.')[1]?.length || 0);
        return Math.max(prev, currentFactor);
    }, 1);
}

// Add function
export function add(...args: number[]): number {
    const factor = getPrecisionFactor(...args);
    return Number((args.reduce((sum, num) => sum + num * factor, 0) / factor).toFixed(2));
}

// Subtract function
export function subtract(a: number, b: number): number {
    const factor = getPrecisionFactor(a, b);
    return Number(((a * factor - b * factor) / factor).toFixed(2));
}

// // Multiply function
// export function multiply(...args: number[]): number {
//     const factor = getPrecisionFactor(...args);
//     return Number((args.reduce((product, num) => (product * (num * factor)) / (factor * factor), 1)).toFixed(2));
// }

// Divide function
export function divide(a: number, b: number): number {
    const factor = getPrecisionFactor(a, b);
    return Number(((a * factor) / (b * factor)).toFixed(2));
}
  
