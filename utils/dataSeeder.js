const Specialty = require("../models/specialty.model");
const ScientificDegree = require('../models/scientificDegree.model');
const { isSpecialtyTableHasRecords } = require("../repositories/specialty.repository");
const { isScientificDegreeTableHasRecords } = require("../repositories/scientificDegree.repository");


module.exports = async () => {
  if (! await isSpecialtyTableHasRecords()) {
    console.log('Seeding specialty data');
    await Specialty.bulkCreate([
      { name: "Allergy and immunology" },
      { name: "Anesthesiology" },
      { name: "Dermatology" },
      { name: "Diagnostic radiology" },
      { name: "Emergency medicine" },
      { name: "Family medicine" },
      { name: "Internal medicine" },
      { name: "Medical genetics" },
      { name: "Neurology" },
      { name: "Nuclear medicine" },
      { name: "Obstetrics and gynecology" },
      { name: "Ophthalmology" },
      { name: "Pathology" },
      { name: "Pediatrics" },
      { name: "Physical medicine and rehabilitation" },
      { name: "Preventive medicine" },
      { name: "Psychiatry" },
      { name: "Radiation oncology" },
      { name: "Surgery" },
      { name: "Urology" }
    ]);
  }

  if (! await isScientificDegreeTableHasRecords()) {
    console.log('Seeding scientific degrees data');
    await ScientificDegree.bulkCreate([
      { name: "Professor" },
      { name: "Assistant professor" },
      { name: "Lecturer" },
      { name: "Assistant Lecturer" },
      { name: "Specialist" },
      { name: "Resident" },
      { name: "General Practitioner" },
    ]);
  }
}
