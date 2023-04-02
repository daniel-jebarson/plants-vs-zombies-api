// const areas = require("../../data/areas_name.json");
// export default function handler(
//   req: any,
//   res: {
//     status: (arg0: number) => {
//       (): any;
//       new (): any;
//       json: { (arg0: any): void; new (): any };
//     };
//   }
// ) {
//   // Get data from your database
//   res.status(200).json(areas.names);
// }
const fs = require('fs');
const path = require('path');
const areasFilePath = path.join(__dirname, '../../data/areas_name.json');

export default function handler(req: any, res: any) {
  try {
    // Check if areas file exists
    if (!fs.existsSync(areasFilePath)) {
      return res.status(404).json({ error: 'Data file not found' });
    }

    // Read from areas file
    const areasData = fs.readFileSync(areasFilePath, { encoding: 'utf8' });
    const areasNames = JSON.parse(areasData).names;

    // Return response
    res.status(200).json({ data: areasNames });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
