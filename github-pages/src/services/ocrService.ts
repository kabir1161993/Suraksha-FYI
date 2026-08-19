/**
 * Client-Side OCR Simulation for 14-Digit FSSAI License Detection
 * In a full production environment, this runs in a Web Worker via Tesseract.js.
 */
export async function scanImageForFSSAI(imageFile: File | string): Promise<string | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate license detection: 70% chance of detecting a 14-digit license if image is provided
      if (typeof imageFile === 'string') {
        const match = imageFile.match(/\b\d{14}\b/);
        if (match) return resolve(match[0]);
      }
      
      // Seeded OCR mock detection
      const mockLicenses = [
        '11223344556677',
        '21518001000456',
        '10012011000111',
        '11229988776655'
      ];
      
      // Randomly select one or return null (simulate realistic OCR success rate)
      const detected = Math.random() > 0.3 ? mockLicenses[Math.floor(Math.random() * mockLicenses.length)] : null;
      resolve(detected);
    }, 1200);
  });
}
