import Airtable from 'airtable';

// Initialize Airtable with your API key
const airtable = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
});

// Reference your base
const base = airtable.base(process.env.REACT_APP_AIRTABLE_BASE_ID);

/**
 * Fetch all records from a specific table
 * @param {string} tableName - The name of the table to fetch from
 * @returns {Promise<Array>} - Promise resolving to an array of records
 */
export const fetchRecords = async (tableName) => {
  try {
    const records = await base(tableName)
      .select({
        // You can add view, filter, sort, etc. options here
        // For example: view: "Grid view"
      })
      .all();
      
    // Transform the records to a more usable format
    return records.map(record => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    throw error;
  }
};

/**
 * Fetch a single record by ID
 * @param {string} tableName - The name of the table
 * @param {string} recordId - The ID of the record to fetch
 * @returns {Promise<Object>} - Promise resolving to a record object
 */
export const fetchRecordById = async (tableName, recordId) => {
  try {
    const record = await base(tableName).find(recordId);
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error(`Error fetching record ${recordId}:`, error);
    throw error;
  }
};

/**
 * Create a new record
 * @param {string} tableName - The name of the table
 * @param {Object} fields - The fields and values to create
 * @returns {Promise<Object>} - Promise resolving to the created record
 */
export const createRecord = async (tableName, fields) => {
  try {
    const createdRecords = await base(tableName).create([{ fields }]);
    const record = createdRecords[0];
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
};

/**
 * Update an existing record
 * @param {string} tableName - The name of the table
 * @param {string} recordId - The ID of the record to update
 * @param {Object} fields - The fields to update
 * @returns {Promise<Object>} - Promise resolving to the updated record
 */
export const updateRecord = async (tableName, recordId, fields) => {
  try {
    const updatedRecords = await base(tableName).update([
      {
        id: recordId,
        fields,
      },
    ]);
    const record = updatedRecords[0];
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error(`Error updating record ${recordId}:`, error);
    throw error;
  }
};

/**
 * Delete a record
 * @param {string} tableName - The name of the table
 * @param {string} recordId - The ID of the record to delete
 * @returns {Promise<string>} - Promise resolving to the deleted record ID
 */
export const deleteRecord = async (tableName, recordId) => {
  try {
    const deletedRecords = await base(tableName).destroy([recordId]);
    return deletedRecords[0].id;
  } catch (error) {
    console.error(`Error deleting record ${recordId}:`, error);
    throw error;
  }
};