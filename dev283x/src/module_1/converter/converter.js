const csvToJson = data => {
  return new Promise((resolve, reject) => {
    try {
      const rows = data.split('\r\n');
      const keys = rows[0].split(',');

      resolve(rows.slice(1).reduce((acc, row, index) => {
        if (row) {
          const values = row.split(',');
          acc[index] = {};
          values.forEach((value, valueIndex) => acc[index][keys[valueIndex]] = value);
        }

        return acc;
      }, []));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  csvToJson
};