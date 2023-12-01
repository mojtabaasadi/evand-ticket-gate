const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

const path = process.argv[2];
const outputPath = 'out.json';
const attendees = [];
readXlsxFile(path).then(rows => {
  rows.forEach(attendee => {
    attendees.push({
      code: attendee[2],
      first_name: attendee[5],
      last_name: attendee[6],
      name: attendee[5] + ' ' + attendee[6],
    });
  });
  fs.writeFile(outputPath, JSON.stringify(attendees), 'utf8', function (err) {
    console.error(err);
  });
});
