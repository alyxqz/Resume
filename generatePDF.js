const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a new PDF document
const doc = new PDFDocument({ margin: 40 });

// Save the PDF to a file
doc.pipe(fs.createWriteStream('Modern_Resume_Alex_Quinonez.pdf'));

// Colors
const primaryColor = '#10A37F'; // Green for headers
const textColor = '#333333'; // Standard text color

// Header: Name and Job Title
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(20).text('Alex Quiñonez', { align: 'left' });
doc.fillColor(textColor).font('Helvetica').fontSize(12).text('Software Engineer', { align: 'left' });
doc.moveDown(0.5);

// Contact Information
doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(12).text(
  'Phone: 909-994-7590   |   Email: aquinonez24@gmail.com   |   Location: Pomona, CA',
  { align: 'left' }
);
doc.moveDown(1);

// Section Header Helper Function
const addSectionHeader = (title) => {
  doc.moveDown(0.5);
  doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(14).text(title);
  doc.moveDown(0.5);
};

// Helper to add bullets with hanging indent
const addListStyle = (text) => {
  const bulletIndent = 20; // Indent for the bullet
  const textIndent = 40;  // Additional hanging indent for wrapped lines

  const sentences = text.split('. ').filter((sentence) => sentence.trim());
  sentences.forEach((sentence) => {
    doc.fillColor(textColor).font('Helvetica').fontSize(10).text(`• ${sentence.trim()}.`, {
      align: 'left',
      indent: bulletIndent,
      continued: false,
      width: doc.page.width - textIndent - doc.page.margins.left - doc.page.margins.right,
    });
  });
  doc.moveDown(0.5);
};

// Professional Experience
addSectionHeader('Professional Experience');

const jobs = [
  {
    title: 'NetSuite Engineer',
    company: 'Porch.com',
    location: 'Seattle, WA',
    dates: 'Oct 2022 – Nov 2024',
    details:
      'Developed scripted reports consolidated into PDF, Excel, or CSV formats and scheduled for automated email distribution. Built a custom payment portal, allowing invoiced NetSuite customers to access open invoices, download PDFs, update credit card details, and make payments. Integrated Authorize.net for scheduled batch processing and reconciliations. Designed tools for NetSuite Electronic Payments using ISO 20022 XML files. Created a financial bank parser module for reconciliation using Boomi and REST APIs. Integrated NetSuite API with JWT and OAuth 2.0/1.0 for analytics solutions.',
  },
  {
    title: 'NetSuite Engineer',
    company: 'Bird',
    location: 'Santa Monica, CA',
    dates: 'May 2020 – Present',
    details:
      'Streamlined inventory tracking between physical locations and automated reconciliation of quantity discrepancies using RESTlets and Celigo. Automated intercompany transactions and designed interfaces between NetSuite and internal reporting applications. Enhanced Advanced Approvals and validated item costs by location for intercompany transfers.',
  },
  {
    title: 'Sr. NetSuite Developer',
    company: 'Grove Collaborative',
    location: 'San Francisco, CA',
    dates: 'Jun 2019 – Apr 2020',
    details:
      'Built custom tools for reconciling inventory across internal and third-party systems. Automated receipt generation and inventory transfers using SuiteScript and Dell Boomi. Created data pipelines for operational metrics such as inventory counts, revenue recognition, and banking data analysis.',
  },
  {
    title: 'NetSuite Developer',
    company: 'CarGurus',
    location: 'Cambridge, MA',
    dates: 'Sep 2017 – Jun 2019',
    details:
      'Implemented Advanced Revenue Recognition and synchronized revenue data with third-party applications. Automated integrations between NetSuite, Concur, and Zuora using Dell Boomi APIs. Developed a custom ACH module for electronic payments and enhanced SOX compliance by implementing approval processes.',
  },
  {
    title: 'NetSuite Admin',
    company: 'Harvest Power',
    location: 'Waltham, MA',
    dates: 'Jul 2015 – Sep 2017',
    details:
      'Designed custom NetSuite business processes to synchronize data, validate user input, and enforce rules for data integrity. Developed a "Tax Automation" module for compliance with the Canadian Ministry of Finance. Built a vendor portal to provide real-time inventory visibility.',
  },
];

jobs.forEach((job) => {
  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(12).text(`${job.title} - ${job.company}, ${job.location}`);
  doc.font('Helvetica').fontSize(10).text(job.dates);
  doc.moveDown(0.5);
  addListStyle(job.details);
});

// Education
addSectionHeader('Education');
doc.fillColor(textColor).font('Helvetica').text('Pace University – New York, NY - May 2013');
doc.text('B.B.A in Quantitative Business Analysis (Cum Laude)');
doc.moveDown(1);

// Technical Skills
addSectionHeader('Technical Skills');
addListStyle(
  'Programming & Tools: JavaScript, SuiteScript, Python, SQL, Dell Boomi, RESTlets, SOAP, HTML, CSS, Freemarker, Eclipse, R, Pandas, TensorFlow, Keras, AWS, jQuery. Platforms & APIs: NetSuite, Salesforce, Workday, OAuth 2.0/1.0, JWT. Certifications: SuiteScript 1.0/2.0 Server-Side & UI, SuiteTalk for Web Services.'
);

// Finalize the PDF
doc.end();