const _             = require('lodash');
const assert        = require('assert');

const colDelimiters = [',', '|', '\t', '","'],
      rowDelimiters = ['\r\n', '\n', '\r'];

export function Parser({data, columns = []}, opts) {
  var cols = [],
      rows = [], rowDelimiter, colDelimiter;

  if (!data) { return Promise.reject(new Error('No data!')); }

  const findRows = () => {
    if (data.length < 1) { return null; }
    rowDelimiters.forEach(delim => {
      let testSplit   = data.split(delim);
      if (rows.length < testSplit.length) {
        rowDelimiter  = delim;
        rows          = testSplit;
      }
    });
    return rows;
  }
  const findColumns = () => {
    if (rows.length < 1) { return null; }
    let row = rows[0];
    colDelimiters.forEach(delim => {
      let testSplit   = row.split(delim);
      if (cols.length < testSplit.length) {
        colDelimiter  = delim;
        cols          = testSplit;
      }
    });
    rows = rows.slice(1);
    return cols;
  }

  findRows();
  findColumns();

  return {rows, cols, colDelimiter, rowDelimiter}
}

/**
 *
 * Splits csv row string, then zips it into an object with column keys
 *
 * @export
 * @param {any} {rows, cols}
 */
export function _rowParser({rows, cols, colDelimiter = ','}) {
  const rowSize = cols.length;
  // const between = (n, a, b) => n >= a && n <= b;

  // if row.len is < whole row, then append fields to last until it's upto rowSize
  // if row.len ===  whole row, then skip indeterminite last row appending new row.
  // if row.len is > whole row, then break apart into x chunks
  return rows.reduce((results = [], row) => {
    row = row.split(colDelimiter);
    // normalize larger than expected rows
    _.chunk(row, rowSize)
    .forEach(row => {
      let last = results.length > 0 ? results[results.length-1] : null;
      if (row.length === 1) {
        if (last && last.length < rowSize) {
          last.push(row[0]);
          return results.splice(results.length - 1, 1, last);
        } else if (!last) {
          // WARN: Uncertain row ending, needs possible 2nd pass
          return results.push(row);
        }
        throw new Error(`Warning!!! Unhandled "joiner" field`);
      }
      if (row.length === rowSize) {
        // WARN: Potential row underflow
        return results.push(row);
      } else if (row.length < rowSize) {
        // we have a partial row
        // did prev row underflow?
        if (last && last.length < rowSize) {
          // var a = []
          let prevFields = row.splice(0, rowSize - last.length);
          if (row.length === 1) { // we must just have an extra delimiter assumed between rows - try join
            let trailingFieldStr = prevFields.shift();
            prevFields.push(row.shift());
            // append string value for final `last` field
            last[last.length - 1] = [last[last.length - 1], trailingFieldStr].join('\n');
            // now last.length should === rowSize
            last = last.concat(prevFields);
            assert.equal(last.length, rowSize);
            // evened out extra 1 col
            results.splice(results.length - 1, 1, last);
            if (row.length >= 1) {
              return results.push(row);
            }
          } else {
            // last row good, simply append (start of) next row
            return results.push(row);
          }
        } else {
          // first row
          return results.push(row);
          // throw new Error(`Last is null or unknown length `);
        }
      }
    });
    // if (last && last.length < rowSize) {
    //   // top off the last row - see if we need to concat 2 arrays - or joing last fields between them
    //   if (between(last.length, rowSize - 1, rowSize + 1)) {
    //     // lastReallyClose
    //   }

    // } else if (!last) {
    //   results.push(row); // starting with first row
    // }
    return results;
  }, []);
}
