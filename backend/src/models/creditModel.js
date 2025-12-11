let creditRecords = [];

function saveCreditRecord(record) {
  creditRecords.push(record);
  return record;
}

function getAllCreditRecords() {
  return creditRecords;
}

module.exports = { saveCreditRecord, getAllCreditRecords };
